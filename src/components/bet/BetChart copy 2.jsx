import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { socketIo } from "../../util/socket";

export default function BetChart({ symbol, chartWidth, chartOpt, openedData }) {
  const [apiData, setApiData] = useState([]);
  const [reload, setReload] = useState(false);
  const [yNoti, setYnoti] = useState([]);

  function getNoti() {
    socketIo.on("bet", (res) => {
      console.log("bet", res);

      setYnoti([...res]);
    });
  }

  function getPreData() {
    axios
      .get(`https://api.twelvedata.com/time_series`, {
        params: {
          symbol,
          interval: "1min",
          apikey: process.env.REACT_APP_TWELVEDATA_KEY,
          outputsize: 100,
        },
      })
      .then(({ data }) => {
        console.log(data.values);
        let _data = data.values.reverse().map((e) => {
          if (chartOpt.type === "area") {
            return {
              x: new Date(e.datetime).setHours(
                new Date(e.datetime).getHours() + 9
              ),
              y: Number(e.close),
            };
          }

          if (chartOpt.type === "candlestick") {
            return {
              x: new Date(e.datetime).setHours(
                new Date(e.datetime).getHours() + 9
              ),
              y: [
                Number(e.close),
                Number(e.high),
                Number(e.low),
                Number(e.open),
              ],
            };
          }
        });

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
        console.log(data);
        console.log(chartOpt.type);

        if (chartOpt.type === "area") {
          if (new Date(_lastIndex.x).getMinutes() === new Date().getMinutes()) {
            _lastIndex.y = Number(data.price);
          } else {
            pushData = {
              x: new Date().setSeconds(0),
              y: Number(data.price),
            };

            _apiData.push(pushData);
          }
        }

        if (chartOpt.type === "candlestick") {
          if (new Date(_lastIndex.x).getMinutes() === new Date().getMinutes()) {
            if (Number(data.price) > _lastIndex.y[1])
              _lastIndex.y[1] = Number(data.price);
            else if (Number(data.price) < _lastIndex.y[2])
              _lastIndex.y[2] = Number(data.price);

            _lastIndex.y[3] = Number(data.price);

            _apiData[_apiData.length - 1] = _lastIndex;
            console.log(new Date(_lastIndex.x).toString());
          } else {
            pushData = {
              x: new Date(new Date().setSeconds(0)).setMilliseconds(0),
              y: [
                Number(data.price),
                Number(data.price) + 0.003,
                Number(data.price) - 0.003,
                Number(data.price),
              ],
            };

            _apiData.push(pushData);
          }
        }

        _apiData = _apiData.slice(-100);
        console.log(_apiData);
        setApiData([..._apiData]);
        setTimeout(() => setReload(false), 1);
      })
      .catch(console.error);
  }

  useLayoutEffect(() => {
    setReload(true);
    getPreData();
  }, [symbol, chartOpt]);

  useEffect(() => {
    let notiInterval = setInterval(() => {
      getNoti();
    }, 10000);

    return () => {
      clearInterval(notiInterval);
    };
  }, []);

  useEffect(() => {
    if (!apiData[0]) return;

    let _dataInterval = setTimeout(getData, chartOpt.duration);
    return () => {
      clearInterval(_dataInterval);
    };
  }, [apiData]);

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
      series={[{ data: reload ? "" : [...apiData] }]}
      type={chartOpt.type}
      width={chartWidth}
      height={"100%"}
    />
  );
}
