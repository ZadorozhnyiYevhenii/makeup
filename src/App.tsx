import './App.scss';
import { Header } from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';
import { ErrorPage } from './pages/404/404';
import { ProductCardPage } from './pages/ProductCardPage/ProductCardPage';
import { CategoriesPage } from './pages/CatalogPage/CategoriesPage';
import { Cart } from './pages/Cart/Cart';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { useAppSelector } from './app/hooks';
import { UserPage } from './pages/UserPage/UserPage';
import { AdminPageProduct } from './pages/AdminPageAdd/AdminPageAdd';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { CheckOutPage } from './pages/CheckOutPage/CheckOutPage';
import { AdminPageChange } from './pages/AdminPageChange/AdminPageChange';
import { AdminPageDeleteProduct } from './pages/AdminPageDelete/AdminPageDelete';

function App() {

  const user = useAppSelector(state => state.user.user);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/makeup/'>
          <Route index element={<HomePage />} />
          <Route path='product/:id' element={<ProductCardPage />} />
          <Route path='category/:id' element={<CategoriesPage />} />
          <Route path='cart' element={<Cart />} />
          <Route path='register' element={<RegisterPage />} />
          {!!user && (
            <Route path='user' element={<UserPage />} />
          )}
          <Route path='admin/'>
            <Route index element={<AdminPage />} />
            <Route path='addproduct' element={<AdminPageProduct />} />
            <Route path='changeproduct' element={<AdminPageChange />} />
            <Route path='deleteproduct' element={<AdminPageDeleteProduct />} />
           </Route>

          <Route path='checkout' element={<CheckOutPage />} />

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <BackToTopButton />

      {window.location.pathname !== '/makeup/checkout' && <Footer />}
    </div>
  );
}

export default App;
