import React from 'react';
import './App.scss';
import { Header } from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';
import UnderConstructionPage from './pages/NotFoundPage.tsx/NotFoundPage';
import { ErrorPage } from './pages/404/404';

function App() {
  const underConstructionRoutes = [
    '/makeup/delivery',
  ];

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/makeup/'>
          <Route index element={<HomePage />} />

          {underConstructionRoutes.map((route, index) => (
            <Route key={index} path={route} element={<UnderConstructionPage />} />
          ))}

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;
