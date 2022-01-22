import "./App.css";
import Home from "./pages/publicPages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Account from "./pages/user/Account";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Products from "./pages/publicPages/Products";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductDetails from "./pages/publicPages/ProductDetails";
import UserOption from "./components/layout/userOptions/UserOption";
import { useSelector } from "react-redux";
import Cart from "./pages/publicPages/Cart";
import Shipping from "./pages/checkout/Shipping";
import ConfirmOrderPage from "./pages/checkout/ConfirmOrderPage";
import Payment from "./pages/checkout/Payment";
import OrderSuccess from "./pages/checkout/orderPlaced/OrderSuccess";
import Orders from "./pages/user/Orders";
import OrderDetails from "./components/user/orders/orderDetails/OrderDetails";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ProductList from "./pages/admin/productList/ProductList";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import OrderList from "./pages/admin/orderRelated/OrderList";
import ProcessOrder from "./pages/admin/orderRelated/ProcessOrder";
import UsersList from "./pages/admin/userRelated/UserList";
import UpdateUser from "./pages/admin/userRelated/UpdateUser";
import ProductReviews from "./pages/admin/reviewsRelated/ProductReviews";
import UpdateProfile from "./pages/user/UpdateProfile";
import UpdatePassword from "./pages/user/UpdatePassword";
import UpdateProduct from "./pages/admin/newProduct/UpdateProduct";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        {userInfo && <UserOption user={userInfo} />}
        <Switch>
          {/* open routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:keyword" component={Products} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />

          {/* protected routes (user) */}
          <ProtectedRoute
            exact
            path="/account"
            component={Account}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/me/update"
            component={UpdateProfile}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/shipping"
            component={Shipping}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrderPage}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/process/payment"
            component={Payment}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/order/success"
            component={OrderSuccess}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/orders"
            component={Orders}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/order/:id"
            component={OrderDetails}></ProtectedRoute>

          {/* protected admin routes (role: admin while login is required) */}
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product"
            component={NewProduct}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={OrderList}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={ProcessOrder}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UsersList}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}></ProtectedRoute>
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={ProductReviews}></ProtectedRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
