import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import TVShowsSection from './Components/MySecondBar';
import TrendingCarousel from './Components/MyCarousel';
import TrendingCarousel2 from './Components/MyCarousel2';
import TrendingCarousel3 from './Components/MyCarousel3'
import Footer from './Components/Footer'


function App() {
  return (
    <div className="bg-dark">
      <header>
          <Header />
        </header>
        <main>
          <TVShowsSection />
          <TrendingCarousel />
          <TrendingCarousel2 />
          <TrendingCarousel3 />
        </main>
        <footer>
        <Footer />
        </footer>

</div>
  );
}

export default App;
