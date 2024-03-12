import React from "react";
import Room from "./components/Room";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRegistration from "./components/NewRegistration";
import NotFound from "./NotFound";
import Edit from "./Edit";
import View from "./View";
import Deletedd from "./Delete";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/registration" element={<NewRegistration />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/view" element={<View />} />
        <Route path="/delete" element={<Deletedd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
