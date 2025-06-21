import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewItems } from "./pages/ViewItems";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { JSX } from "react";
import { AddItem } from "./pages/AddItem";
import Home from "./pages/Home";
import { TopBar } from "./components/TopBar";

// Define the Item type

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Router>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/view" element={<ViewItems />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
};

export default App;
