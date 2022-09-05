import { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function ClosedChart({ price, data }) {
  const [chartList, setChartList] = useState([]);

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: {
        autoScaleYaxis: true,
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#fff"],
    stroke: {
      width: 1,
    },
    annotations: {
      yaxis: [
        {
          y: price,
          borderColor: "#00E396",
          label: {
            show: true,
            text: `$${price}`,
            borderRadius: 10,
            offsetY: 0,
            borderWidth: 0,
            style: {
              borderColor: "#000",
              borderWidth: 0,
              color: "#fff",
              background: "#3fb68b66",
              fontSize: 10,
              cssClass: "apexcharts-yaxis-annotation-label",
              padding: {
                left: 8,
                right: 8,
                top: 4,
                bottom: 4,
              },
            },
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
    fill: {
      colors: ["#fff", "#000"],
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [-20, 100],
      },
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

  const series = [
    {
      data: [
        [1338501600000, price + 0],
        [1338760800000, price + 0.31],
        [1338847200000, price + 0.7],
        [1338933600000, price + 0.69],
        [1339020000000, price + 0.32],
        [1339106400000, price + 0.65],
        [1339365600000, price + 0.13],
        [1339452000000, price + 0.77],
        [1339538400000, price + 0.79],
        [1339624800000, price + 0.67],
        [1339711200000, price + 0.39],
        [1339970400000, price + 0.63],
        [1340056800000, price + 0.89],
        [1340143200000, price + 0.99],
        [1340229600000, price + 0.23],
        [1340316000000, price + 0.57],
        [1340575200000, price + 0.84],
        [1340661600000, price + 0.07],
        [1340748000000, price + 0.41],
        [1340834400000, price + 0.17],
        [1340920800000, price + 0.37],
        [1341180000000, price + 0.19],
        [1341266400000, price + 0.51],
        [1341439200000, price + 0.53],
        [1341525600000, price + 0.37],
        [1341784800000, price + 0.43],
        [1341871200000, price + 0.44],
        [1341957600000, price + 0.2],
        [1342044000000, price + 0.14],
      ],
    },
  ];

  useEffect(() => {
    let _chartList = [];
    console.log(data);

    // data.map((e, i) => {
    //   _chartList.push([new Date(new Date().getTime + i * 1000), e]);
    // });

    console.log(_chartList);
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={"100%"}
    />
  );
}
