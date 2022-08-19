import axios from "axios";
import moment from "moment";
import { useRef } from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { API } from "../../configs/api";

export default function BetChart({
  assetInfo,
  chartOpt,
  openedData,
  dragX,
  setDragX,
}) {
  const chartRef = useRef();

  const [chartWidth, setChartWidth] = useState(window.innerWidth * 2);
  const [chartWidthPer, setChartWidthPer] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [reload, setReload] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [yAxisWidth, setYaxisWidth] = useState(40);

  function onWheelChart(e) {
    e.stopPropagation();

    if (e.deltaY < 0 && chartWidthPer > 0.28)
      setChartWidthPer(chartWidthPer - 0.04);
    else if (e.deltaY > 0 && chartWidthPer < 4)
      setChartWidthPer(chartWidthPer + 0.04);
  }

  function onDragChartBox(e) {
    if (!dragX) return;

    let diffX = e.clientX - dragX;

    if (
      chartRef.current.scrollLeft - diffX > 0 &&
      chartRef.current.scrollLeft - diffX < chartWidth * chartWidthPer
    ) {
      chartRef.current.scrollTo({
        left: chartRef.current.scrollLeft - diffX,
        behavior: "smooth",
      });
    }
  }

  function indexCondition(lastTime) {
    switch (chartOpt.barSize) {
      case 10000:
      case 30000:
      case 60000:
        return new Date(lastTime).getMinutes() === new Date().getMinutes();
      case 300000:
        return new Date(lastTime).getMinutes() + 4 >= new Date().getMinutes();
      case 900000:
        return new Date(lastTime).getMinutes() + 14 >= new Date().getMinutes();
      case 1800000:
        return new Date(lastTime).getMinutes() + 29 >= new Date().getMinutes();
      case 3600000:
        return new Date(lastTime).getHours() === new Date().getHours();
      case 14400000:
        return new Date(lastTime).getHours() + 3 >= new Date().getHours();
      case 84400000:
        return new Date(lastTime).getDate() === new Date().getDate();

      default:
        break;
    }
  }

  function getPreData() {
    axios
      .get(`${API.GET_ASSETS_TICKER_PRICE}/${assetInfo.socketAPISymbol}`)
      .then(({ data }) => {
        const { resp } = data;

        let _data = [];

        console.log(resp);

        resp.slice(-1000).map((e, i) => {
          if (new Date(e.createdat) % chartOpt.barSize) {
            let _chartIndex = _data.length - 1;

            if (!_data[_chartIndex]?.y) return;

            switch (chartOpt.typeStr) {
              case "Line":
                _data[_chartIndex].y = Number(e.price);
                break;

              case "Candles":
                if (Number(e.price) > _data[_chartIndex].y[1])
                  _data[_chartIndex].y[1] = Number(e.price);
                else if (Number(e.price) < _data[_chartIndex].y[2])
                  _data[_chartIndex].y[2] = Number(e.price);

                _data[_chartIndex].y[3] = Number(e.price);
                break;

              case "Heiken Ashi":
                if (Number(e.price) > _data[_chartIndex].y[1])
                  _data[_chartIndex].y[1] = Number(e.price);
                else if (Number(e.price) < _data[_chartIndex].y[2])
                  _data[_chartIndex].y[2] = Number(e.price);

                _data[_chartIndex].y[3] =
                  (_data[_chartIndex].y[0] +
                    _data[_chartIndex].y[1] +
                    _data[_chartIndex].y[2] +
                    Number(e.price)) /
                  4;

                break;

              default:
                break;
            }
          } else {
            let _yData;
            let _chartIndex = _data.length - 1;

            switch (chartOpt.typeStr) {
              case "Line":
                _yData = Number(e.price);
                break;
              case "Candles":
                _yData = new Array(4).fill(Number(e.price));
                break;
              case "Heiken Ashi":
                _yData = _chartIndex >= 0 && [
                  (_data[_chartIndex][0] + _data[_chartIndex][3]) / 2 || 0,
                  Number(e.price),
                  Number(e.price),
                  Number(e.price),
                ];
                break;
              default:
                break;
            }

            _data.push({
              x: new Date(e.createdat),
              y: _yData,
            });
          }
        });

        console.log(_data);
        if (chartOpt.typeStr === "Heiken Ashi") _data.shift();

        setApiData([..._data]);
      })
      .catch(console.error);
  }

  function getData() {
    axios
      .get(`https://api.twelvedata.com/price`, {
        params: {
          symbol: assetInfo.APISymbol,
          apikey: process.env.REACT_APP_TWELVEDATA_KEY,
        },
      })
      .then(({ data }) => {
        let pushData;
        let _apiData = apiData;
        let _lastIndex = _apiData[_apiData.length - 1];
        let _now = new Date().setMilliseconds(0);

        switch (chartOpt.typeStr) {
          case "Line":
            break;
          case "Candles":
            if (_now % chartOpt.barSize) {
              if (Number(data.price) > _lastIndex.y[1])
                _lastIndex.y[1] = Number(data.price);
              else if (Number(data.price) < _lastIndex.y[2])
                _lastIndex.y[2] = Number(data.price);

              _lastIndex.y[3] = Number(data.price);

              _apiData[_apiData.length - 1] = _lastIndex;
            } else {
              console.log(_now);
              pushData = {
                x: _now,
                y: [
                  Number(data.price),
                  Number(data.price),
                  Number(data.price),
                  Number(data.price),
                ],
              };

              _apiData.push(pushData);
            }
            break;
          case "Heiken Ashi":
            break;
          default:
            break;
        }

        if (chartOpt.typeStr === "Line") {
          if (_apiData[0].y[3]) return;

          if (indexCondition(_lastIndex.x)) {
            _lastIndex.y = Number(data.price);
          } else {
            pushData = {
              x: new Date(new Date().setSeconds(0)).setMilliseconds(0),
              y: Number(data.price),
            };

            _apiData.push(pushData);
          }
        } else if (chartOpt.typeStr === "Candles") {
        } else if (chartOpt.typeStr === "Heiken Ashi") {
          if (indexCondition(_lastIndex.x)) {
            if (Number(data.price) > _lastIndex.y[1])
              _lastIndex.y[1] = Number(data.price);
            else if (Number(data.price) < _lastIndex.y[2])
              _lastIndex.y[2] = Number(data.price);

            _lastIndex.y[3] =
              (_lastIndex.y[0] +
                _lastIndex.y[1] +
                _lastIndex.y[2] +
                Number(data.price)) /
              4;

            _apiData[_apiData.length - 1] = _lastIndex;
          } else {
            pushData = {
              x: new Date(new Date().setSeconds(0)).setMilliseconds(0),
              y: [
                (_apiData[_apiData.length - 2].y[0] +
                  _apiData[_apiData.length - 2].y[3]) /
                  2,
                Number(data.price),
                Number(data.price),
                Number(data.price),
              ],
            };

            console.log("pushData", pushData);

            _apiData.push(pushData);
          }
        }

        console.log(_apiData);
        setChartWidth(_apiData.length * 20);
        setApiData([..._apiData]);
        setTimeout(() => setReload(false), 1);
        setUpdateFlag(!updateFlag);
      })
      .catch(console.error);
  }

  function getYaxisWidth() {
    if (document.getElementsByClassName("apexcharts-yaxis-label")[0]) {
      setYaxisWidth(
        Math.floor(
          document
            .getElementsByClassName("apexcharts-yaxis-label")[0]
            .firstChild.getBoundingClientRect().width
        ) + 32
      );
    }
  }

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.scrollTo({
      left: 99999,
      behavior: "smooth",
    });
  }, [chartRef.current]);

  useLayoutEffect(() => {
    setReload(true);
    getPreData();
  }, [assetInfo.APISymbol, chartOpt]);

  useEffect(() => {
    if (!apiData[0]) return;
    setTimeout(() => setReload(false), 1);
    let _dataInterval = setTimeout(() => {
      // getData();
      getYaxisWidth();
    }, 1000);
    return () => {
      clearTimeout(_dataInterval);
    };
  }, [apiData, chartOpt, chartWidth]);

  const areaOpt = {
    chart: {
      zoom: {
        autoScaleYaxis: true,
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      events: {
        dataPointMouseEnter: (e, cont, config) => {
          console.log(cont, config);
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },

    annotations: {
      points: openedData.map((e) => {
        let color;

        if (e.side === "HIGH") color = "#3fb68b";
        else if (e.side === "LOW") color = "#FF5353";

        return {
          x: Number(moment.unix(e.starting).seconds(0).format("x")),
          y: Number(e.startingPrice).toFixed(2),
          marker: {
            size: 10,
            strokeColor: color,
            fillColor: "#181c25",
          },
          label: {
            borderColor: color,
            borderRadius: 4,
            style: {
              fontSize: 12,
              color: "#fff",
              background: color,
            },
            text: `${
              (e.side === "HIGH" && "▲") || (e.side === "LOW" && "▼")
            } $${e.amount / 10 ** 6}`,
          },
        };
      }),
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      show: false,
      labels: {
        style: {
          colors: "#aaa",
          cssClass: "apexcharts-yaxis-label",
        },
        formatter: (val, timeStamp) => {
          return moment(new Date(timeStamp)).format("HH:mm");
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0)",
    },
  };

  const candleOpt = {
    chart: {
      zoom: {
        autoScaleYaxis: true,
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      events: {
        dataPointMouseEnter: (e, cont, config) => {
          console.log(cont, config);
        },
      },
    },

    plotOptions: {
      candlestick: {
        colors: {
          upward: "#51B58B",
          downward: "#F55B57",
        },
      },
    },
    annotations: {
      points: openedData.map((e) => {
        let color;

        if (e.side === "HIGH") color = "#3fb68b";
        else if (e.side === "LOW") color = "#FF5353";

        return {
          x: Number(moment.unix(e.starting).seconds(0).format("x")),
          y: Number(e.startingPrice).toFixed(2),
          marker: {
            size: 10,
            strokeColor: color,
            fillColor: "#181c25",
          },
          label: {
            borderColor: color,
            borderRadius: 4,
            style: {
              fontSize: 12,
              color: "#fff",
              background: color,
            },
            text: `${
              (e.side === "HIGH" && "▲") || (e.side === "LOW" && "▼")
            } $${e.amount / 10 ** 6}`,
          },
        };
      }),
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        align: "right",
        style: {
          colors: "#aaa",
          cssClass: "apexcharts-yaxis-label",
        },
        formatter: (val, timeStamp) => {
          return moment(new Date(timeStamp)).format("HH:mm");
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: "#b6b6b6",
          width: 1,
          dashArray: 3,
        },
      },
      labels: {
        show: false,
        align: "right",
        style: {
          colors: "#aaa",
          cssClass: "apexcharts-yaxis-label",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      // enabled: false,
      custom: () => {
        return <div className="tooltip" style={{ background: "#f00" }}></div>;
      },
      style: {
        fontSize: 0,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0)",
    },
  };

  const yaxisOpt = {
    chart: {
      zoom: {
        autoScaleYaxis: true,
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      events: {
        dataPointMouseEnter: (e, cont, config) => {
          console.log(cont, config);
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },

    annotations: {},
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        style: {
          colors: "#aaa",
          cssClass: "apexcharts-yaxis-label",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0)",
    },
  };

  return (
    <BetChartCont>
      {reload ? (
        <></>
      ) : (
        <>
          <div
            className="chartBox"
            ref={chartRef}
            onMouseDown={(e) => setDragX(e.clientX)}
            onMouseMove={onDragChartBox}
            onWheel={onWheelChart}
          >
            <div
              id="Chart"
              className="chart"
              style={{
                width: chartWidth * chartWidthPer - yAxisWidth,
              }}
            >
              <ReactApexChart
                options={
                  (chartOpt.type === "area" && areaOpt) ||
                  (chartOpt.type === "candlestick" && candleOpt)
                }
                series={[
                  { data: reload ? "" : [...apiData], flag: updateFlag },
                ]}
                type={chartOpt.type}
                width={chartWidth * chartWidthPer - yAxisWidth}
                height={"100%"}
              />
            </div>
          </div>
          <div className="yaxisBox">
            <ReactApexChart
              options={yaxisOpt}
              series={[{ data: reload ? "" : [...apiData], flag: updateFlag }]}
              type={"area"}
              width={yAxisWidth}
              height={"100%"}
            />
          </div>
        </>
      )}
    </BetChartCont>
  );
}

const BetChartCont = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;

  .chartBox {
    width: 100%;
    height: 100%;
    padding: 0 ${window.innerWidth * 0.2}px 0 0;
    overflow-x: scroll;
    position: relative;
    cursor: pointer;

    .chart {
      height: 100%;
      overflow: hidden;
    }
  }

  .yaxisBox {
  }

  .apexcharts-tooltip,
  .apexcharts-xaxistooltip.apexcharts-xaxistooltip-bottom,
  .apexcharts-yaxistooltip {
    display: none;
  }
`;
