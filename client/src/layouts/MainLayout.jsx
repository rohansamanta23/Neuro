import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}