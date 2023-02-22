import React from "react";
import SignUp from "./components/SignUp/SignUp";
import Stripe from "./components/stripe/Stripe";
import Login from "./components/Login/Login";
import GameBoard from "./components/GameBoard/GameBoard";

const App = () => {
  return (
    <>
      <div className="nav">
        <Stripe />
        <SignUp />
        <Login />
      </div>
      <GameBoard />
    </>
  );
};
export default App;