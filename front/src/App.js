import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connection from "./Page/Connection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connection />} />
      </Routes>
    </Router>
  );
}

export default App;
