//@ts-nocheck

import ChatAgricole from "@/components/ChatAgricole";
import React from "react";

const HomePage: React.FC = () => {
  return (
      <ChatAgricole />
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#333",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  text: {
    color: "#666",
    fontSize: "1.2rem",
  },
};

export default HomePage;