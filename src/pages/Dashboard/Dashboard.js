import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDollarSign,
  faMoneyBillWave,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

import { Line, Bar, Pie } from "react-chartjs-2";
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

import { getData } from "../../data/dataService";

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

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setSalesData(data);
    };
    fetchData();
  }, []);

  const calculateTotals = () => {
    return salesData.reduce((acc, sale) => {
      acc.totalSales += 1;
      acc.totalRevenue += sale.price * sale.quantity;
  
      acc.totalProfit += (sale.price * sale.quantity) * 0.2;
      return acc;
    }, { totalSales: 0, totalRevenue: 0, totalProfit: 0 });
  };

  const prepareChartData = () => {
    const monthlySales = {};
    const productSales = {};
    const categorySales = {};

    salesData.forEach(sale => {
      const date = new Date(sale.sale_date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      monthlySales[monthYear] = (monthlySales[monthYear] || 0) + sale.quantity;


      productSales[sale.product] = (productSales[sale.product] || 0) + sale.quantity;


      categorySales[sale.category] = (categorySales[sale.category] || 0) + (sale.price * sale.quantity);
    });

    return {
      monthlySalesData: {
        labels: Object.keys(monthlySales),
        datasets: [{
          label: 'Monthly Sales',
          data: Object.values(monthlySales),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        }]
      },
      topProductsData: {
        labels: Object.keys(productSales).slice(0, 5),
        datasets: [{
          data: Object.values(productSales).slice(0, 5),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        }]
      },
      categoryRevenueData: {
        labels: Object.keys(categorySales),
        datasets: [{
          label: 'Revenue by Category',
          data: Object.values(categorySales),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        }]
      }
    };
  };

  const { totalSales, totalRevenue, totalProfit } = calculateTotals();
  const chartData = prepareChartData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Data",
        color: "white",
      },
    },
    scales: {
      y: {
        ticks: { color: "white" },
      },
      x: {
        ticks: { color: "white" },
      },
    },
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Date,Product,Category,Price,Quantity,Seller\n"
      + salesData.map(sale => 
          `${sale.id},${sale.sale_date},${sale.product},${sale.category},${sale.price},${sale.quantity},${sale.seller}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (salesData.length === 0) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Sales Dashboard</h1>
        <div className="dashboard-controls">
          <select value={filter} onChange={handleFilterChange} className="filter-select">
            <option value="all">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
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
              <h2>{totalSales}</h2>
            </div>
          </div>
          <div className="revenue">
            <FontAwesomeIcon icon={faDollarSign} />
            <div className="report-content">
              <span>Total Revenue</span>
              <h2>${totalRevenue.toFixed(2)}</h2>
            </div>
          </div>
          <div className="profit">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <div className="report-content">
              <span>Estimated Profit</span>
              <h2>${totalProfit.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-wrapper months-chart">
          <h3>Monthly Sales Trend</h3>
          <Line data={chartData.monthlySalesData} options={options} />
        </div>
        <div className="chart-wrapper months-chart">
          <h3>Top Products</h3>
          <Pie data={chartData.topProductsData} options={{...options, aspectRatio: 1}} />
        </div>
        <div className="chart-wrapper months-chart">
          <h3>Revenue by Category</h3>
          <Bar data={chartData.categoryRevenueData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

