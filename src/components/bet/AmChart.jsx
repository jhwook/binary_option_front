import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5stock from "@amcharts/amcharts5/stock";
import * as am5xy from "@amcharts/amcharts5/xy";
import axios from "axios";
import { API } from "../../configs/api";
import moment from "moment";

export default function AmChart({ assetInfo, chartOpt, openedData }) {
  const [valueSeries, setValueSeries] = useState();
  const [dateAxis, setDateAxis] = useState();
  const [root, setRoot] = useState();
  const [apiData, setApiData] = useState([]);
  const [tooltip, setTooltip] = useState();
  const [currentLabel, setCurrentLabel] = useState();
  const [stockChart, setStockChart] = useState();
  const [currentValueDataItem, setCurrentValueDataItem] = useState();

  function getPreData() {
    setApiData([]);
    axios
      .get(`${API.GET_ASSETS_TICKER_PRICE}`, {
        params: {
          symbol: assetInfo.socketAPISymbol,
        },
      })
      .then(({ data }) => {
        let _data = [];

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
        console.log("data", data);

        if (
          Math.floor(_now / chartOpt.barSize) ===
          Math.floor(_lastIndex.Date / chartOpt.barSize)
        ) {
          if (Number(data.price) > _lastIndex.High)
            _lastIndex.High = Number(data.price);
          else if (Number(data.price) < _lastIndex.Low)
            _lastIndex.Low = Number(data.price);

          _lastIndex.Close = Number(data.price);

          _apiData[_apiData.length - 1] = _lastIndex;

          valueSeries.data.setIndex(valueSeries.data.length - 1, _lastIndex);
        } else {
          console.log(_now);
          pushData = {
            Date: _now,
            Open: Number(data.price),
            High: Number(data.price),
            Low: Number(data.price),
            Close: Number(data.price),
          };

          valueSeries.data.push(pushData);
        }

        setApiData([...valueSeries.data]);

        if (currentLabel) {
          currentValueDataItem.animate({
            key: "value",
            to: Number(data.price),
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic),
          });
          currentLabel.set(
            "text",
            stockChart.getNumberFormatter().format(Number(data.price))
          );
          let bg = currentLabel.get("background");
          if (bg) {
            if (data.price < _lastIndex.Open) {
              bg.set("fill", root.interfaceColors.get("negative"));
            } else {
              bg.set("fill", root.interfaceColors.get("positive"));
            }
          }
        }
      })
      .catch(console.error);
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
        tooltipText: description,
        tooltip: tooltip,
        tooltipY: 0,
      })
    );

    var label = bullet.children.push(
      am5.Label.new(root, {
        text: letter,
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
    root.setThemes([am5themes_Animated.new(root)]);
    root.interfaceColors.set("text", am5.color(0xffffff));

    var stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {
        background: am5.Rectangle.new(root, {
          fill: am5.color(0x181c25),
        }),
      })
    );

    setStockChart(stockChart);

    root.numberFormatter.set("numberFormat", "#,###.00");

    var mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
      })
    );

    var valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom",
        }),
        extraMin: 0.1, // adds some space for for main series
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2,
      })
    );

    var dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "second",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    setDateAxis(dateAxis);

    let currentValueDataItem = valueAxis.createAxisRange(
      valueAxis.makeDataItem({ value: 0 })
    );
    setCurrentValueDataItem(currentValueDataItem);

    let currentLabel = currentValueDataItem.get("label");
    setCurrentLabel(currentLabel);

    if (currentLabel) {
      currentLabel.setAll({
        fill: am5.color(0xffffff),
        background: am5.Rectangle.new(root, { fill: am5.color(0x000000) }),
      });
    }

    let currentGrid = currentValueDataItem.get("grid");
    if (currentGrid) {
      currentGrid.setAll({
        strokeOpacity: 0.5,
        strokeDasharray: [2, 5],
        stroke: am5.color(0xffffff),
      });
    }

    var valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: assetInfo.APISymbol,
        clustered: false,
        valueXField: "Date",
        valueYField: "Close",
        highValueYField: "High",
        lowValueYField: "Low",
        openValueYField: "Open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText:
          "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
        legendRangeValueText: "",
      })
    );

    setValueSeries(valueSeries);

    stockChart.set("stockSeries", valueSeries);

    var valueLegend = mainPanel.plotContainer.children.push(
      am5stock.StockLegend.new(root, {
        stockChart: stockChart,
      })
    );

    valueLegend.set(
      "background",
      am5.Rectangle.new(root, {
        fill: am5.color(0x181c25),
      })
    );

    // valueLegend.data.setAll([valueSeries]);

    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!",
      })
    );

    let cursor = mainPanel.get("cursor");

    cursor.lineX.setAll({
      strokeDasharray: [2, 5],
      stroke: am5.color(0xffffff),
    });

    cursor.lineY.setAll({
      strokeDasharray: [2, 5],
      stroke: am5.color(0xffffff),
    });

    var tooltip = am5.Tooltip.new(root, {
      getStrokeFromSprite: false,
      getFillFromSprite: false,
    });

    setTooltip(tooltip);

    tooltip.get("background").setAll({
      strokeOpacity: 1,
      stroke: am5.color(0xffffff),
    });
  }, []);

  useEffect(() => {
    if (!root) return;

    getPreData();
  }, [root, chartOpt]);

  useEffect(() => {
    if (!apiData[0]) return;
    valueSeries.data.setAll([...apiData]);

    let _dataInterval = setTimeout(() => {
      getData();
    }, 1000);

    return () => {
      clearTimeout(_dataInterval);
    };
  }, [apiData, valueSeries, currentLabel, currentValueDataItem, stockChart]);

  useEffect(() => {
    if (!openedData) return;

    openedData.map((e) => {
      // if (new Date() >= new Date(moment.unix(e.starting).seconds(0)))
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

  return <AmChartBox id="ChartBox"></AmChartBox>;
}

const AmChartBox = styled.div`
  flex: 1;
`;