import React from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDollarSign,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [1, 80, 10, 1000, 300, 500],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Over Months",
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="monthly-reports">
        <div className="sales-revenue-profit">
          <div className="sales">
            <FontAwesomeIcon icon={faChartLine} />
            <div className="report-content">
              <span>Total Sales</span>
              <h2>542</h2>
            </div>
          </div>
          <div className="revenue">
            <FontAwesomeIcon icon={faDollarSign} />
            <div className="report-content">
              <span>Total Revenue</span>
              <h2>35,845$</h2>
            </div>
          </div>
          <div className="profit">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <div className="report-content">
              <span>Total Profit</span>
              <h2>35,845$</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="months-chart">
        <Line data={data} options={options} />
      </div>
      <div className="months-chart">
        <Line data={data} options={options} />
      </div>
      <div className="months-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
