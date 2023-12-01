import React from 'react';
import './App.scss';
import {Header} from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/makeup/'>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;
