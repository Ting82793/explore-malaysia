import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app">
      {/* Navbar and Footer are outside <Routes>, so they show on every page */}
      <Navbar />

      <main>
        {/* <Routes> shows only the ONE <Route> that matches the URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          {/* :id is a dynamic part of the URL, e.g. /packages/3 */}
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* * matches any other URL -> 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
