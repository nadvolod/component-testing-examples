import React from "react";
import ReactDOM from "react-dom/client";
import LoginForm from "./components/LoginForm";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <LoginForm
      onLogin={function (credentials: {
        username: string;
        password: string;
      }): void {
        throw new Error("Function not implemented.");
      }}
    />
  </React.StrictMode>
);
