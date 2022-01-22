import React, { useEffect } from "react";
import "./Dashboard.css";
import {
  allOrders,
  getAdminProducts,
  getAllUsers,
} from "../../../redux/actions/adminAction";
import Navbar from "../../../components/layout/navbar/Navbar";
import { Helmet } from "react-helmet";
import Footer from "../../../components/layout/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement, CategoryScale, LinearScale } from "chart.js";
import Sidebar from "../sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/loader/Loading";
Chart.register(ArcElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.products);
  const { loading, products: adProducts } = useSelector(
    (state) => state.adProducts
  );
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  adProducts &&
    adProducts.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, adProducts?.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <Helmet title="Admin | Dashboard | Splash Store" />
      <Toaster />
      <Navbar />
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <h1>Dashboard</h1>

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br /> ₹{totalAmount}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{adProducts && adProducts?.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders?.length}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users?.length}</p>
                  </Link>
                </div>
              </div>

              <div className="lineChart">
                <Line data={lineState} />
              </div>

              <div className="doughnutChart">
                <Doughnut data={doughnutState} />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
