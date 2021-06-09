import React, { useContext } from "react";
import "./App.css";

import AuthContext from "./store/auth-context";

import { Redirect, Route, Switch } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetails";
import Layout from "./containers/Layout/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const ctx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedIn && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}
        {!ctx.isLoggedIn && (
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
        )}

        <Route path="/profile">
          {ctx.isLoggedIn ? <ProfilePage /> : <Redirect to="/" />}
        </Route>

        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
