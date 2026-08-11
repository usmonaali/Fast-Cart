import React from "react";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },

    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#2f6fed"],
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6C737F",
        },
      },
    },

    yaxis: {
      labels: {
        formatter: (val) => `${val}`,
        style: {
          colors: "#6C737F",
        },
      },
    },

    grid: {
      borderColor: "#F1F5F9",
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} Orders`,
      },
    },
  };

  const series = [
    {
      name: "Orders",
      data: [10, 22, 18, 30, 26, 42, 38, 45, 32, 28, 35, 40],
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111927] rounded-lg p-5 mt-[30px]">
      <h3 className="font-[600] text-[16px] text-[#111927] dark:text-white mb-4">
        Sales Revenue
      </h3>

      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
};

export default SalesChart;
