import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { RoutesView, router } from "./routes/router";
import { RouterProvider } from "atomic-router-react";
import { Container } from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <NavBar />
      <Container style={{ marginTop: "18px", marginBottom: "100px" }}>
        <RoutesView />
      </Container>
    </RouterProvider>
  </React.StrictMode>
);
