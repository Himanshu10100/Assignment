import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const ProductTransaction = () => {
  const [month, setMonth] = useState("03");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);
  const [sold, setShold] = useState(0);
  const [notShold, setNotShold] = useState(0);
  const [labels, setLabels] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const barData = {
    labels: labels,
    datasets: [
      {
        label: "price X Quantity",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: quantity,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
    },
  };

  async function getProductData() {
    setLoading(true);
    const link = `http://localhost:2034/api/v1/product?keyword=${keyword}&page=${page}`;
    const config = { withCredentials: true, credentials: true };
    const { data } = await axios.get(link);
    setData(data);
    setLoading(false);
  }

  async function getStatisticsData() {
    setLoading(true);
    const link = `http://localhost:2034/api/v1/statistics?month=${month}`;
    const config = { withCredentials: true, credentials: true };
    const { data } = await axios.get(link);
    setPrice(data.totalPrice);
    setShold(data.sholdItem);
    setNotShold(data.notShold);
    console.log(data);
    // setData(data);
    setLoading(false);
  }

  async function getBarData() {
    setLoading(true);
    const link = `http://localhost:2034/api/v1/barchart?month=${month}`;
    const config = { withCredentials: true, credentials: true };
    const { data } = await axios.get(link);
    setLabels(data.priceRange);
    setQuantity(data.quantity);
    console.log(data);
    // setData(data);
    setLoading(false);
  }

  useEffect(() => {
    getProductData();
  }, [keyword, page]);

  useEffect(() => {
    getStatisticsData();
    getBarData();
  }, [month]);

  return (
    <>
      <div className="transaction">
        <div className="cercle">
          <h2>Transaction Dashboard</h2>
        </div>
        <div className="getInput">
          <div className="upper">
            <input
              type="text"
              placeholder="Search Transaction"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">July</option>
              <option value="08">Augest</option>
              <option value="09">Saptember</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <table border={1}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data?.product?.map((item, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <img src={item.image} alt="product image" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="lower">
            <p>Page No : {page}</p>
            <button onClick={() => (page >= 2 ? setPage(page - 1) : "")}>
              Prev
            </button>
            <p>|</p>
            <button onClick={() => (page <= 5 ? setPage(page + 1) : "")}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="statistic">
        <h1>Statistical data for : {month}</h1>
        <p>total price : {price}</p>
        <p>total sold : {sold}</p>
        <p>total unsold : {notShold}</p>
      </div>
      <div className="barchart">
        <h1>Barchart</h1>
        {!loading && <Bar data={barData} options={options} width={400} />}
      </div>
    </>
  );
};

export default ProductTransaction;
