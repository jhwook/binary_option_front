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
  const [series, setSeries] = useState();
  const [root, setRoot] = useState();
  const [apiData, setApiData] = useState([]);
  const [xyChart, setXyChart] = useState();
  const [currentPrice, setCurrentPrice] = useState(0);

  function getPreData() {
    setApiData([]);
    axios
      .get(`${API.GET_ASSETS_TICKER_PRICE}`, {
        params: {
          symbol: assetInfo.APISymbol,
          limit: 900,
        },
      })
      .then(({ data }) => {
        let _data = [];

        console.log("data", data);

        data.resp.slice(-1000).map((e, i) => {
          // if (new Date(e.createdat) % chartOpt.barSize) {
          //   let _chartIndex = _data.length - 1;

          //   if (!_data[_chartIndex]?.value) return;

          //   let _valueCount = (new Date(e.createdat) % chartOpt.barSize) / 1000;

          //   let _average =
          //     (_data[_chartIndex]?.value * _valueCount + Number(e.price)) /
          //     (_valueCount + 1);

          //   _data[_chartIndex].value = _average;
          // } else {
          _data.push({
            Date: new Date(e.createdat).getTime(),
            value: Number(e.price),
          });
          // }
        });

        setApiData([..._data]);
      });
  }

  function getData(price) {
    let pushData;
    let _apiData = apiData;
    let _lastIndex = _apiData[_apiData.length - 1];
    let _now = new Date().setMilliseconds(0);

    // if (
    //   Math.floor(_now / chartOpt.barSize) ===
    //   Math.floor(_lastIndex.Date / chartOpt.barSize)
    // ) {
    //   console.log(_now % chartOpt.barSize);
    //   if (price > _lastIndex.High) _lastIndex.High = price;
    //   else if (price < _lastIndex.Low) _lastIndex.Low = price;

    //   _lastIndex.Close = price;

    //   _apiData[_apiData.length - 1] = _lastIndex;

    //   series.data.setIndex(series.data.length - 1, _lastIndex);
    // } else {
    pushData = {
      Date: _now,
      value: price,
    };

    series.data.push(pushData);
    // }

    setApiData([...series.data]);
  }

  useLayoutEffect(() => {
    var root = am5.Root.new("ChartBox");
    setRoot(root);
    root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

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

    var xAxis = xyChart.xAxes.push(
      am5xy.DateAxis.new(root, {
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

    var yAxis = xyChart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom",
          opposite: true,
        }),
        extraMin: 0.1, // adds some space for for main series
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.####",
        extraTooltipPrecision: 2,
      })
    );

    var series = xyChart.series.push(
      am5xy.LineSeries.new(root, {
        name: assetInfo.APISymbol,
        minBulletDistance: 10,
        valueYField: "value",
        valueXField: "Date",
        xAxis: xAxis,
        yAxis: yAxis,
      })
    );

    setSeries(series);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: undefined,
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill"),
        }),
      });
    });

    var cursor = xyChart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
      })
    );

    let _cursor = xyChart.get("cursor");

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
      console.log(res);
      setCurrentPrice(Number(res));
    });
  }, []);

  useEffect(() => {
    if (!apiData[0]) return;
    series.data.setAll([...apiData]);

    let _dataInterval = setTimeout(() => {
      socket.emit("get_ticker_price", assetInfo.APISymbol);
      if (currentPrice) getData(currentPrice);
    }, 1000);

    return () => {
      clearTimeout(_dataInterval);
    };
  }, [apiData, currentPrice, series, xyChart]);

  return <AmChartBox id="ChartBox"></AmChartBox>;
}

const AmChartBox = styled.div`
  flex: 1;
  overflow: hidden;
`;
