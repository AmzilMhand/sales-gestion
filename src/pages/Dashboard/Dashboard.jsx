import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDollarSign,
  faMoneyBillWave,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getSales } from "../../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const formatNumber = (num) =>
  num >= 1e9
    ? (num / 1e9).toFixed(2) + "B"
    : num >= 1e6
    ? (num / 1e6).toFixed(2) + "M"
    : num >= 1e3
    ? (num / 1e3).toFixed(2) + "K"
    : num.toString();

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSales();
      setSalesData(
        data.filter((sale) => {
          const saleDate = new Date(sale.sale_date);
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();
          const getStartOfWeek = (date) =>
            new Date(
              date.setDate(
                date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
              )
            );
          const getEndOfWeek = (date) =>
            new Date(date.setDate(date.getDate() + 6));
          switch (filter) {
            case "thisMonth":
              return (
                saleDate.getMonth() === currentMonth &&
                saleDate.getFullYear() === currentYear
              );
            case "lastMonth":
              return (
                saleDate.getMonth() ===
                  (currentMonth === 0 ? 11 : currentMonth - 1) &&
                saleDate.getFullYear() ===
                  (currentMonth === 0 ? currentYear - 1 : currentYear)
              );
            case "thisYear":
              return saleDate.getFullYear() === currentYear;
            case "lastYear":
              return saleDate.getFullYear() === currentYear - 1;
            case "thisWeek":
              return (
                saleDate >= getStartOfWeek(now) && saleDate <= getEndOfWeek(now)
              );
            default:
              return true;
          }
        })
      );
    };
    fetchData();
  }, [filter]);

  const calculateTotals = () =>
    salesData.reduce(
      (acc, sale) => {
        acc.totalSales += Number(sale.quantity);
        acc.totalRevenue += Number(sale.price * sale.quantity);
        acc.totalProfit += Number(sale.price * sale.quantity * 0.1);
        return acc;
      },
      { totalSales: 0, totalRevenue: 0, totalProfit: 0 }
    );

  const prepareChartData = () => {
    const monthlySales = {},
      productSales = {},
      categorySales = {};
    salesData.forEach((sale) => {
      const date = new Date(sale.sale_date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      monthlySales[monthYear] =
        (monthlySales[monthYear] || 0) + Number(sale.quantity);
      productSales[sale.product] =
        (productSales[sale.product] || 0) + Number(sale.quantity);
      categorySales[sale.category] =
        (categorySales[sale.category] || 0) + sale.price * sale.quantity;
    });

    return {
      monthlySalesData: {
        labels: Object.keys(monthlySales),
        datasets: [
          {
            label: "Monthly Sales",
            data: Object.values(monthlySales),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      topProductsData: {
        labels: Object.entries(productSales)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([product]) => product),
        datasets: [
          {
            data: Object.entries(productSales)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([, sales]) => sales),
            backgroundColor: "#36A2EB",
          },
        ],
      },
      categoryRevenueData: {
        labels: Object.keys(categorySales),
        datasets: [
          {
            label: "Total Revenue",
            data: Object.values(categorySales),
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      },
    };
  };

  const chartData = prepareChartData();
  const { totalSales, totalRevenue, totalProfit } = calculateTotals();

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: false } },
    scales: {
      y: { ticks: { color: "white" } },
      x: { ticks: { color: "white" } },
    },
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Date,Product,Category,Price,Quantity,Seller\n" +
      salesData
        .map(
          (sale) =>
            `${sale.id},${sale.sale_date},${sale.product},${sale.category},${sale.price},${sale.quantity},${sale.seller}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (salesData.length === 0)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Sales Dashboard</h1>
        <div className="dashboard-controls">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="thisWeek">This Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </select>
          <button onClick={exportToCSV} className="export-button">
            <FontAwesomeIcon icon={faFileExport} /> Export to CSV
          </button>
        </div>
      </div>

      <div className="monthly-reports">
        <div className="sales-revenue-profit">
          <div className="sales">
            <FontAwesomeIcon icon={faChartLine} />
            <div className="report-content">
              <span>Total Sales</span>
              <h2>{formatNumber(totalSales)}</h2>
            </div>
          </div>
          <div className="revenue">
            <FontAwesomeIcon icon={faDollarSign} />
            <div className="report-content">
              <span>Total Revenue</span>
              <h2>${formatNumber(totalRevenue.toFixed(2))}</h2>
            </div>
          </div>
          <div className="profit">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <div className="report-content">
              <span>Estimated Profit</span>
              <h2>${formatNumber(totalProfit.toFixed(2))}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper months-chart">
          <h3>Monthly Sales Trend</h3>
          <Line data={chartData.monthlySalesData} options={options} />
        </div>
        <div className="test">
          <div className="chart-wrapper months-chart">
            <h3>Top Sales Products</h3>
            <Bar
              data={chartData.topProductsData}
              options={{ ...options, indexAxis: "y" }}
            />
          </div>
          <div className="chart-wrapper months-chart">
            <h3>Revenue by Category</h3>
            <Bar
              data={chartData.categoryRevenueData}
              options={{
                ...options,
                indexAxis: "y",
                plugins: {
                  legend: { display: false }, 
                  title: { display: false } ,
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label || ""}: $${formatNumber(
                          context.raw
                        )}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
