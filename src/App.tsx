import './App.scss';
import { Header } from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';
import UnderConstructionPage from './pages/NotFoundPage.tsx/NotFoundPage';
import { ErrorPage } from './pages/404/404';
import { ProductCardPage } from './pages/ProductCardPage/ProductCardPage';
import { CategoriesPage } from './pages/CatalogPage/CategoriesPage';
import { BrandList } from './components/testComp/testComp';
import { Cart } from './components/Cart/Cart';

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
          <Route path='product/:id' element={<ProductCardPage />} />
          <Route path='categories' element={<CategoriesPage />} />
          <Route path='test' element={<BrandList />} />
          <Route path='cart' element={<Cart />} />

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
