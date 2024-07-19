import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { ApolloProvider } from "@apollo/client";

import client from "./apolloClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <PayPalScriptProvider
        options={{
          "client-id": "ATXeOFLEHJTzyC8ZNpV6bcFXOjfOQZDr6N3BNC8fzsUPNqts6_ZmWxbzIwgYn7P_4PYoqBx4bq2KQJ0z",
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </React.StrictMode>
  </ApolloProvider>
);
