import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { socketIo } from "../../util/socket";

export default function BetChart({ symbol, chartWidth }) {
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
          apikey: "c092ff5093bf4eef83897889e96b3ba7",
          outputsize: 50,
        },
      })
      .then(({ data }) => {
        // console.log(data.values);
        let _data = data.values.map((e) => {
          console.log(
            new Date(
              new Date(e.datetime).getTime() -
                new Date().getTimezoneOffset() * 60 * 1000
            ).getTime()
          );

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
          apikey: "c092ff5093bf4eef83897889e96b3ba7",
        },
      })
      .then(({ data }) => {
        let pushData;
        let _apiData = apiData;
        let _lastIndex = _apiData[_apiData.length - 1];
        console.log(data);

        console.log(new Date());

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

        _apiData.slice(-50);
        // console.log(_apiData);
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
      xaxis: [
        {
          x: new Date(1659941880000),
          strokeDashArray: 0,
          borderColor: "#775DD0",
          label: {
            borderColor: "#775DD0",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: "X Axis Anno Vertical",
          },
        },
      ],
      points: [
        {
          x: new Date(1659941880000),
          y: 23780.5,
          marker: {
            size: 6,
            fillColor: "#fff",
            strokeColor: "#2698FF",
            radius: 2,
          },
          label: {
            borderColor: "#FF4560",
            offsetY: 0,
            style: {
              color: "#fff",
              background: "#FF4560",
            },

            text: "Point Annotation (XY)",
          },
        },
      ],
      yaxis: [
        {
          // y: Number(e),
          y: 23780.5,
          borderColor: "#00E396",
          label: {
            show: true,
            text: `$${(23780).toFixed(2)}`,
            // text: `$${Number(e).toFixed(2)}`,
            borderRadius: 10,
            offsetY: 0,
            borderWidth: 0,
            // textAnchor: "start",
            // textAnchor: "middle",
            // textAnchor: "",
            style: {
              borderColor: "#000",
              borderWidth: 0,
              color: "#fff",
              background: "#3fb68b66",
              fontSize: 10,
              cssClass: "apexcharts-yaxis-annotation-label",
              padding: {
                left: 8,
                right: 40,
                top: 4,
                bottom: 4,
              },
            },
          },
        },
      ],
      // };
      // }),
      points: [
        {
          x: new Date().getTime(),
          y: 23780.5,
          yAxisIndex: 0,
          seriesIndex: 0,
          mouseEnter: undefined,
          mouseLeave: undefined,
          marker: {
            size: 8,
            fillColor: "#fff",
            strokeColor: "red",
            radius: 2,
            cssClass: "apexcharts-custom-class",
          },
          label: {
            borderColor: "#FF4560",
            offsetY: 0,
            style: {
              color: "#fff",
              background: "#FF4560",
            },

            text: "Point Annotation",
          },
        },
      ],
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
      series={[{ data: reload ? "" : apiData }]}
      type="candlestick"
      width={chartWidth}
      height={"100%"}
    />
  );
}
