"use client";
import React from "react";
import NavigationBar from "./components/Navigation"



export default function Home() {
  return (
    <>
      <div id="wrapper">
        <NavigationBar />
        <div className="container">
        <h1 className="text-primary">Hello World</h1>
        </div>
      </div>
    </>
  );
}
