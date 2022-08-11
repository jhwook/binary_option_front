import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function BetChart({
  symbol,
  chartWidth,
  setChartWidth,
  chartOpt,
  openedData,
}) {
  const [apiData, setApiData] = useState([]);
  const [reload, setReload] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  function getPreOpt() {
    switch (chartOpt.duration) {
      case 5000:
      case 10000:
      case 15000:
      case 30000:
      case 60000:
        return "1min";
      case 300000:
        return "5min";
      case 900000:
        return "30m";
      case 2700000:
        return "45m";
      case 3600000:
        return "1h";
      case 14400000:
        return "4h";
      case 84400000:
        return "1d";

      default:
        break;
    }
  }

  function indexCondition(lastTime) {
    switch (chartOpt.duration) {
      case 5000:
      case 10000:
      case 15000:
      case 30000:
      case 60000:
        return new Date(lastTime).getMinutes() === new Date().getMinutes();
      case 300000:
        return new Date(lastTime).getMinutes() + 4 >= new Date().getMinutes();
      case 900000:
        return new Date(lastTime).getMinutes() + 29 >= new Date().getMinutes();
      case 2700000:
        return new Date(lastTime).getMinutes() + 44 >= new Date().getMinutes();
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
      .get(`https://api.twelvedata.com/time_series`, {
        params: {
          symbol,
          interval: getPreOpt(),
          apikey: process.env.REACT_APP_TWELVEDATA_KEY,
          outputsize: 100,
        },
      })
      .then(({ data }) => {
        let _data = data.values.reverse();
        _data = _data.map((e, i) => {
          if (chartOpt.typeStr === "Line") {
            return {
              x: new Date(e.datetime).setHours(
                new Date(e.datetime).getHours() + 9
              ),
              y: Number(e.close),
            };
          } else if (chartOpt.typeStr === "Candles") {
            return {
              x: new Date(e.datetime).setHours(
                new Date(e.datetime).getHours() + 9
              ),
              y: [
                Number(e.open),
                Number(e.high),
                Number(e.low),
                Number(e.close),
              ],
            };
          } else if (chartOpt.typeStr === "Heiken Ashi") {
            if (i === 0) return;

            return {
              x: new Date(e.datetime).setHours(
                new Date(e.datetime).getHours() + 9
              ),
              y: [
                Number(e.high),
                Number(e.low),
                Number(e.close),
                Number(e.open),
              ],
            };
            // return {
            //   x: new Date(e.datetime).setHours(
            //     new Date(e.datetime).getHours() + 9
            //   ),
            //   y: [
            //     // Number((_data[i - 1].open + _data[i - 1].close) / 2),
            //     Number(e.high),
            //     Number(e.high),
            //     Number(e.low),
            //     Number((e.close + e.high + e.low + e.open) / 4),
            //   ],
            // };
          }
        });

        if (chartOpt.typeStr === "Heiken Ashi") _data.shift();

        console.log("_data", _data);
        setApiData([..._data]);
      })
      .catch(console.error);
  }

  function getData() {
    axios
      .get(`https://api.twelvedata.com/price`, {
        params: {
          symbol,
          apikey: process.env.REACT_APP_TWELVEDATA_KEY,
        },
      })
      .then(({ data }) => {
        let pushData;
        let _apiData = apiData;
        let _lastIndex = _apiData[_apiData.length - 1];

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
          if (indexCondition(_lastIndex.x)) {
            if (Number(data.price) > _lastIndex.y[1])
              _lastIndex.y[1] = Number(data.price);
            else if (Number(data.price) < _lastIndex.y[2])
              _lastIndex.y[2] = Number(data.price);

            _lastIndex.y[3] = Number(data.price);

            _apiData[_apiData.length - 1] = _lastIndex;
          } else {
            pushData = {
              x: new Date(new Date().setSeconds(0)).setMilliseconds(0),
              y: [
                Number(data.price),
                Number(data.price),
                Number(data.price),
                Number(data.price),
              ],
            };

            _apiData.push(pushData);
          }
        }
        //  else if (chartOpt.typeStr === "Heiken Ashi") {
        //   if (indexCondition(_lastIndex.x)) {
        //     if (Number(data.price) > _lastIndex.y[1])
        //       _lastIndex.y[1] = Number(data.price);
        //     else if (Number(data.price) < _lastIndex.y[2])
        //       _lastIndex.y[2] = Number(data.price);

        //     _lastIndex.y[3] = Number(data.price);

        //     _apiData[_apiData.length - 1] = _lastIndex;
        //   } else {
        //     pushData = {
        //       x: new Date(new Date().setSeconds(0)).setMilliseconds(0),
        //       y: [
        //         Number(data.price),
        //         Number(data.price),
        //         Number(data.price),
        //         Number(data.price),
        //       ],
        //     };

        //     _apiData.push(pushData);
        //   }
        // }
        // else if (chartOpt.typeStr === "Heiken Ashi") {
        //   if (indexCondition(_lastIndex.x)) {
        //     if (Number(data.price) > _lastIndex.y[1])
        //       _lastIndex.y[1] = Number(data.price);
        //     else if (Number(data.price) < _lastIndex.y[2])
        //       _lastIndex.y[2] = Number(data.price);

        //     _lastIndex.y[3] = Number(data.price);

        //     _apiData[_apiData.length - 1] = _lastIndex;
        //   } else {
        //     pushData = {
        //       x: new Date(new Date().setSeconds(0)).setMilliseconds(0),
        //       y: [
        //         Number((_lastIndex.open + _lastIndex.close) / 2),
        //         Number(data.price),
        //         Number(data.price),
        //         Number(data.price),
        //       ],
        //     };

        //     _apiData.push(pushData);
        //   }

        // }
        // console.log(_apiData);
        setChartWidth({ ...chartWidth, width: _apiData.length * 20 });
        setApiData([..._apiData]);
        setTimeout(() => setReload(false), 1);
        setUpdateFlag(!updateFlag);
      })
      .catch(console.error);
  }

  useLayoutEffect(() => {
    setReload(true);
    getPreData();
  }, [symbol, chartOpt]);

  useEffect(() => {
    if (!apiData[0]) return;

    let _dataInterval = setTimeout(() => {
      getData();
    }, 1000);
    return () => {
      setTimeout(_dataInterval);
    };
  }, [apiData, chartOpt]);

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
        opacityFrom: chartOpt.line.area ? 0.7 : 0,
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
      // xaxis: [
      //   {
      //     x: 1660023780000,
      //     borderColor: "#FEB019",
      //     label: {
      //       borderColor: "#FEB019",
      //       style: {
      //         color: "#fff",
      //         background: "#FEB019",
      //       },
      //       orientation: "horizontal",
      //       text: "X Axis Anno Horizonal",
      //     },
      //   },
      // ],

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

      // yaxis: yNoti.map((e) => {
      //   return {
      // yaxis: [
      //   {
      //     // y: Number(e),
      //     y: 23780.5,
      //     borderColor: "#00E396",
      //     label: {
      //       show: true,
      //       text: `$${(23780).toFixed(2)}`,
      //       // text: `$${Number(e).toFixed(2)}`,
      //       borderRadius: 10,
      //       offsetY: 0,
      //       borderWidth: 0,
      //       // textAnchor: "start",
      //       // textAnchor: "middle",
      //       // textAnchor: "",
      //       style: {
      //         borderColor: "#000",
      //         borderWidth: 0,
      //         color: "#fff",
      //         background: "#3fb68b66",
      //         fontSize: 10,
      //         cssClass: "apexcharts-yaxis-annotation-label",
      //         padding: {
      //           left: 8,
      //           right: 40,
      //           top: 4,
      //           bottom: 4,
      //         },
      //       },
      //     },
      //   },
      // ],
      // };
      // }),
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

  return reload ? (
    <></>
  ) : (
    <ReactApexChart
      options={
        (chartOpt.type === "area" && areaOpt) ||
        (chartOpt.type === "candlestick" && candleOpt)
      }
      series={[{ data: reload ? "" : [...apiData], flag: updateFlag }]}
      type={chartOpt.type}
      width={chartWidth.width * chartWidth.per}
      height={"100%"}
    />
  );
}
