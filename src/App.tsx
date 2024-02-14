import { Suspense, } from 'react';
import { Header } from "./components/HeaderComponents/Header/Header";
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/FooterComponents/Footer/Footer';
import { Loader } from './components/Loader/Loader';
import { router } from './router';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';
import './App.scss'

function App() {
const allPaths = router.map(route => route.children?.map(r => r.children?.map(childRoute => childRoute))).flat();

const adminChildrenPathes = allPaths.filter(p => p).flat();

  return (
    <div className="App">
    <Header />
    <Suspense fallback={<Loader />}>
      <Routes>
        {router.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        {router.map(route => route.children && route.children.map((childRoute, childIndex) => (
          <Route
            key={childIndex}
            path={childRoute.path}
            element={childRoute.element}
          />
        )))}
        {adminChildrenPathes && adminChildrenPathes.map((childRoute, childIndex) => (
          <Route
            key={childIndex}
            path={childRoute?.path}
            element={childRoute?.element}
          />
        ))}
      </Routes>
    </Suspense>
    <BackToTopButton />
    {window.location.pathname !== '/makeup/checkout' && <Footer />}
  </div>
  );
}

export default App;
