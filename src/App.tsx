import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Artists from './components/Artists';
import Releases from './components/Releases';
import Contact from './components/Contact';
import DemoSubmit from './components/DemoSubmit';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer'; // footer import

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Artists />
        <Releases />
        <Contact />
      </main>

      <DemoSubmit />
      <ScrollToTop />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
