import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import Submit from "./pages/Submit";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
