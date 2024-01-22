import { Suspense, lazy } from 'react'
import { Header } from "./components/HeaderComponents/Header/Header";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';
import { ErrorPage } from './pages/404/404';
import { useAppSelector } from './app/hooks';
import { UserPage } from './pages/UserPage/UserPage';
import { Footer } from './components/FooterComponents/Footer/Footer';
import { Loader } from './components/Loader/Loader';
import './App.scss';
import { SearchedPage } from './pages/SearchedPage/SearchedPage';
const ProductCardPage = lazy(() => import("./pages/ProductCardPage/ProductCardPage").then((module) => ({ default: module.ProductCardPage })));
const CategoriesPage = lazy(() => import('./pages/CatalogPage/CategoriesPage').then((module) => ({ default: module.CategoriesPage })));
const AdminPageProduct = lazy(() => import('./pages/AdminPageAdd/AdminPageAdd').then((module) => ({ default: module.AdminPageProduct })));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage').then((module) => ({ default: module.AdminPage })));
const CheckOutPage = lazy(() => import('./pages/CheckOutPage/CheckOutPage').then((module) => ({ default: module.CheckOutPage })));
const AdminPageChange = lazy(() => import('./pages/AdminPageChange/AdminPageChange').then((module) => ({ default: module.AdminPageChange })));
const AdminPageDeleteProduct = lazy(() => import('./pages/AdminPageDelete/AdminPageDelete').then((module) => ({ default: module.AdminPageDeleteProduct })));
const Cart = lazy(() => import('./pages/Cart/Cart').then((module) => ({ default: module.Cart })));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage').then((module) => ({ default: module.RegisterPage })));

function App() {
  const user = useAppSelector(state => state.user.user);

  return (
    <div className="App">
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/makeup/'>
            <Route index element={<HomePage />} />
            <Route path='product/:id' element={<ProductCardPage />} />
            <Route path='category/:id' element={<CategoriesPage />} />
            <Route path='search' element={<SearchedPage />} />
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
      </Suspense>
      <BackToTopButton />

      {window.location.pathname !== '/makeup/checkout' && <Footer />}
    </div>
  );
}

export default App;
