import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import ReactDOM from 'react-dom/client';
// import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import axios_api from "./config/Axios";

axios_api.defaults.withCredentials = true;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <RecoilRoot>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </RecoilRoot>

  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
