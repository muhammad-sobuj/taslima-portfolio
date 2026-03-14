import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import { Helmet } from "react-helmet";

function App() {
  useLenis();

  return (
    <Router>
      <Helmet>
        <title>Taslima Khatun | Portfolio</title>
        <meta name="description" content="MERN Stack Developer & Content Creator" />
        <meta name="keywords" content="Content Creator, Portfolio" />
      </Helmet>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
