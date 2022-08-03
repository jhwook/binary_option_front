import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { socketIo } from "../../util/socket";

export default function BetChart({ symbol }) {
  const [apiData, setApiData] = useState([]);
  const [reload, setReload] = useState(false);
  const [yNoti, setYnoti] = useState([]);

  function getNoti() {
    socketIo.emit("bet", {}, (res) => {
      // console.log("bet", res);
      let yNoti = res.map((e) => e.startingPrice);

      setYnoti([...yNoti]);
    });
  }

  function getPreData() {
    axios
      .get(`https://api.twelvedata.com/time_series`, {
        params: {
          symbol,
          interval: "1min",
          apikey: "c092ff5093bf4eef83897889e96b3ba7",
        },
      })
      .then(({ data }) => {
        console.log(data.values);
        let _data = data.values.map((e) => {
          return {
            x: new Date(e.datetime),
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
          apikey: "c092ff5093bf4eef83897889e96b3ba7",
        },
      })
      .then(({ data }) => {
        let pushData;
        let _apiData = apiData;
        let _lastIndex = _apiData[_apiData.length - 1];
        // console.log(data);

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
            x: new Date(),
            y: [
              Number(data.price),
              Number(data.price),
              Number(data.price),
              Number(data.price),
            ],
          };

          _apiData.push(pushData);
        }

        _apiData.slice(-30);

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
      // yaxis: yNoti.map((e) => {
      //   return {
      //     y: Number(e),
      //     borderColor: "#00E396",
      //     label: {
      //       show: true,
      //       text: `$${Number(e).toFixed(2)}`,
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
      //   };
      // }),
      // points: [
      //   {
      //     x: 0,
      //     y: 22809,
      //     yAxisIndex: 0,
      //     seriesIndex: 0,
      //     mouseEnter: undefined,
      //     mouseLeave: undefined,
      //     marker: {
      //       size: 0,
      //       fillColor: "#fff",
      //       strokeColor: "#333",
      //       strokeWidth: 3,
      //       shape: "circle",
      //       radius: 2,
      //       OffsetX: 0,
      //       OffsetY: 0,
      //       cssClass: "",
      //     },
      //     label: {
      //       borderColor: "#c2c2c2",
      //       borderWidth: 1,
      //       borderRadius: 2,
      //       text: undefined,
      //       textAnchor: "middle",
      //       offsetX: 0,
      //       offsetY: -15,
      //       mouseEnter: undefined,
      //       mouseLeave: undefined,
      //       style: {
      //         background: "#fff",
      //         color: "#777",
      //         fontSize: "12px",
      //         fontWeight: 400,
      //         fontFamily: undefined,
      //         cssClass: "apexcharts-point-annotation-label",
      //         padding: {
      //           left: 5,
      //           right: 5,
      //           top: 0,
      //           bottom: 2,
      //         },
      //       },
      //     },
      //     image: {
      //       path: undefined,
      //       width: 20,
      //       height: 20,
      //       offsetX: 0,
      //       offsetY: 0,
      //     },
      //   },
      // ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
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
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return reload ? (
    <></>
  ) : (
    <ReactApexChart
      options={options}
      series={[{ data: apiData }]}
      type="candlestick"
      // width={4000}
      height={"100%"}
    />
  );
}
