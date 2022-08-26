import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import * as am5xy from "@amcharts/amcharts5/xy";
import axios from "axios";
import { API } from "../../../configs/api";
import moment from "moment";

export default function LineChart({ assetInfo, chartOpt, openedData, socket }) {
  const [valueSeries, setValueSeries] = useState();
  const [dateAxis, setDateAxis] = useState();
  const [root, setRoot] = useState();
  const [apiData, setApiData] = useState([]);
  const [tooltip, setTooltip] = useState();
  const [currentLabel, setCurrentLabel] = useState();
  const [xyChart, setXyChart] = useState();
  const [currentValueDataItem, setCurrentValueDataItem] = useState();
  const [currentPrice, setCurrentPrice] = useState(0);

  function getPreData() {
    setApiData([]);
    axios
      .get(`${API.GET_ASSETS_TICKER_PRICE}`, {
        params: {
          symbol: assetInfo.APISymbol,
        },
      })
      .then(({ data }) => {
        let _data = [];

        console.log("data", data);

        data.resp.map((e, i) => {
          if (new Date(e.createdat) % chartOpt.barSize) {
            let _chartIndex = _data.length - 1;

            if (!_data[_chartIndex]?.Open) return;

            if (Number(e.price) > _data[_chartIndex].High)
              _data[_chartIndex].High = Number(e.price);
            else if (Number(e.price) < _data[_chartIndex].Low)
              _data[_chartIndex].Low = Number(e.price);

            _data[_chartIndex].Close = Number(e.price);
          } else {
            _data.push({
              Date: new Date(e.createdat).getTime(),
              Open: Number(e.price),
              High: Number(e.price),
              Low: Number(e.price),
              Close: Number(e.price),
            });
          }
        });

        setApiData([..._data]);
      });
  }

  function getData(price) {
    let pushData;
    let _apiData = apiData;
    let _lastIndex = _apiData[_apiData.length - 1];
    let _now = new Date().setMilliseconds(0);

    if (
      Math.floor(_now / chartOpt.barSize) ===
      Math.floor(_lastIndex.Date / chartOpt.barSize)
    ) {
      if (price > _lastIndex.High) _lastIndex.High = price;
      else if (price < _lastIndex.Low) _lastIndex.Low = price;

      _lastIndex.Close = price;

      _apiData[_apiData.length - 1] = _lastIndex;

      valueSeries.data.setIndex(valueSeries.data.length - 1, _lastIndex);
    } else {
      pushData = {
        Date: _now,
        Open: price,
        High: price,
        Low: price,
        Close: price,
      };

      valueSeries.data.push(pushData);
    }

    setApiData([...valueSeries.data]);

    if (currentLabel) {
      currentValueDataItem.animate({
        key: "value",
        to: price,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });
      currentLabel.set("text", xyChart.getNumberFormatter().format(price));
      let bg = currentLabel.get("background");
      if (bg) {
        if (price < _lastIndex.Open) {
          bg.set("fill", root.interfaceColors.get("negative"));
        } else {
          bg.set("fill", root.interfaceColors.get("positive"));
        }
      }
    }
  }

  function makeEvent(
    dateAxis,
    root,
    tooltip,
    date,
    letter,
    color,
    description
  ) {
    var dataItem = dateAxis.createAxisRange(
      dateAxis.makeDataItem({ value: date })
    );

    var grid = dataItem.get("grid");
    if (grid) {
      grid.setAll({
        visible: true,
        strokeOpacity: 0.2,
        strokeDasharray: [3, 3],
        stroke: color,
      });
    }

    var bullet = am5.Container.new(root, {
      y: -100,
    });

    var circle = bullet.children.push(
      am5.Circle.new(root, {
        radius: 10,
        stroke: color,
        fill: am5.color(0x181c25),
        tooltipText: description,
        tooltip: tooltip,
        tooltipY: 0,
      })
    );

    var label = bullet.children.push(
      am5.Label.new(root, {
        text: letter,
        stroke: color,
        strokeOpacity: 0.6,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    dataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        location: 0,
        sprite: bullet,
      })
    );
  }

  useLayoutEffect(() => {
    var root = am5.Root.new("ChartBox");
    setRoot(root);
    root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

    // var stockChart = root.container.children.push(
    //   am5xy.XYChart.new(root, {
    //     background: am5.Rectangle.new(root, {
    //       fill: am5.color(0x181c25),
    //     }),
    //   })
    // );

    var xyChart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        background: am5.Rectangle.new(root, {
          fill: am5.color(0x181c25),
        }),
      })
    );
    setXyChart(xyChart);

    var easing = am5.ease.linear;

    root.interfaceColors.setAll({
      grid: "rgba(255, 255, 255, 0.1)",
    });

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        extraMin: -0.1,
        extraMax: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "second",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );
    series.data.setAll(data);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: undefined,
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill"),
        }),
      });
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    let _cursor = chart.get("cursor");

    _cursor.lineX.setAll({
      strokeDasharray: [2, 5],
      stroke: am5.color(0xffffff),
    });

    _cursor.lineY.setAll({
      strokeDasharray: [2, 5],
      stroke: am5.color(0xffffff),
    });
  }, []);

  useEffect(() => {
    if (!root) return;

    getPreData();
  }, [root, chartOpt]);

  useEffect(() => {
    socket.on("get_ticker_price", (res) => {
      if (!res) return;

      setCurrentPrice(Number(res));
    });
  }, []);

  useEffect(() => {
    if (!apiData[0]) return;
    valueSeries.data.setAll([...apiData]);

    let _dataInterval = setTimeout(() => {
      socket.emit("get_ticker_price", assetInfo.APISymbol);
      if (currentPrice) getData(currentPrice);
    }, 1000);

    return () => {
      clearTimeout(_dataInterval);
    };
  }, [
    apiData,
    currentPrice,
    valueSeries,
    currentLabel,
    currentValueDataItem,
    xyChart,
  ]);

  useEffect(() => {
    if (!openedData) return;

    openedData.map((e) => {
      makeEvent(
        dateAxis,
        root,
        tooltip,
        Number(moment(e.createdat).format("x")),
        e.side === "HIGH" ? "H" : "L",
        am5.color(e.side === "HIGH" ? 0x3fb68b : 0xff5353),
        Number(e.startingPrice).toFixed(2)
      );
    });
  }, [dateAxis, root, tooltip, openedData]);

  // console.log(chartOpt.type);

  return <AmChartBox id="ChartBox"></AmChartBox>;
}

const AmChartBox = styled.div`
  flex: 1;
  overflow: hidden;
`;
