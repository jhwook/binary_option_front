import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { socketIo } from "../../util/socket";

export default function BetChart({ symbol, chartWidth, openedData }) {
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
        // console.log(data.values);
        let _data = data.values.reverse().map((e) => {
          return {
            x: new Date(
              new Date(e.datetime).getTime() -
                new Date().getTimezoneOffset() * 60 * 1000
            ),
            y: [Number(e.close), Number(e.high), Number(e.low), Number(e.open)],
          };
        });

        setApiData(_data);
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

        if (
          _lastIndex &&
          _lastIndex.x.getMinutes() === new Date().getMinutes()
        ) {
          if (Number(data.price) > _lastIndex.y[1])
            _lastIndex.y[1] = Number(data.price);
          else if (Number(data.price) < _lastIndex.y[2])
            _lastIndex.y[2] = Number(data.price);

          _lastIndex.y[3] = Number(data.price);

          _apiData[_apiData.length - 1] = _lastIndex;
        } else {
          pushData = {
            x: new Date().setSeconds(0),
            y: [
              Number(data.price),
              Number(data.price),
              Number(data.price),
              Number(data.price),
            ],
          };

          _apiData.push(pushData);
        }

        _apiData.slice(-100);
        console.log(_apiData);
        setApiData([..._apiData]);
        setTimeout(() => setReload(false), 1);
      })
      .catch(console.error);
  }

  useLayoutEffect(() => {
    setReload(true);
    getPreData();
  }, [symbol]);

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

    let _dataInterval = setTimeout(getData, 1000);
    return () => {
      clearInterval(_dataInterval);
    };
  }, [apiData]);

  const options = {
    chart: {
      id: "candlestick",
      type: "candlestick",
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
      xaxis: [
        {
          x: 1660023780000,
          borderColor: "#FEB019",
          label: {
            borderColor: "#FEB019",
            style: {
              color: "#fff",
              background: "#FEB019",
            },
            orientation: "horizontal",
            text: "X Axis Anno Horizonal",
          },
        },
      ],

      points: openedData.map((e) => {
        console.log(e);

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
      options={options}
      series={[{ data: reload ? "" : apiData }]}
      type="candlestick"
      // type="candlestick"
      width={chartWidth}
      height={"100%"}
    />
  );
}
