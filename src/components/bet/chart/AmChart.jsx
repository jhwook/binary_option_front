import CandleChart from "./CandleChart";
// import LineChart from "./LineChart";

export default function AmChart({ assetInfo, chartOpt, openedData, socket }) {
  return (
    <CandleChart
      assetInfo={assetInfo}
      chartOpt={chartOpt}
      openedData={openedData}
      socket={socket}
    />
  );
  // return (
  //   <>
  //     {chartOpt.typeStr === "Line" ? (
  //       <LineChart
  //         assetInfo={assetInfo}
  //         chartOpt={chartOpt}
  //         openedData={openedData}
  //         socket={socket}
  //       />
  //     ) : (
  //       <></>
  //     )}
  //     {chartOpt.typeStr === "Candles" ? (
  //       <CandleChart
  //         assetInfo={assetInfo}
  //         chartOpt={chartOpt}
  //         openedData={openedData}
  //         socket={socket}
  //       />
  //     ) : (
  //       <></>
  //     )}
  //   </>
  // );
}
