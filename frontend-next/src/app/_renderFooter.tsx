"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer/Footer";
import { useAppContext } from "@/context/AppContext";

const RenderFooter: React.FC = () => {
  const { state } = useAppContext();

  return <footer className="App-footer">{state.user && <Footer />}</footer>;
};

export default RenderFooter;
