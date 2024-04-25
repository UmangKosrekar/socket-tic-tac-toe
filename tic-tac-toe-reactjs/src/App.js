import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/game";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
