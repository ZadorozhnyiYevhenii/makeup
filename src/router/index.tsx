import { lazy } from "react";

import { RouteObject } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { ErrorPage } from "../pages/404/404";

const HomePage = lazy(() => import('../pages/HomePage/HomePage').then((module) => ({ default: module.HomePage })));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage").then((module) => ({ default: module.RegisterPage })));
const ProductCardPage = lazy(() => import("../pages/ProductCardPage/ProductCardPage").then((module) => ({ default: module.ProductCardPage })));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage/CategoriesPage").then((module) => ({ default: module.CategoriesPage })));
const SearchedPage = lazy(() => import("../pages/SearchedPage/SearchedPage").then((module) => ({ default: module.SearchedPage })));
const Cart = lazy(() => import("../pages/Cart/Cart").then((module) => ({ default: module.Cart })));
const UserPage = lazy(() => import("../pages/UserPage/UserPage").then((module) => ({ default: module.UserPage })));
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage").then((module) => ({ default: module.AdminPage })));
const AdminPageAdd = lazy(() => import("../pages/AdminPageAdd/AdminPageAdd").then((module) => ({ default: module.AdminPageProduct })));
const AdminPageChange = lazy(() => import("../pages/AdminPageChange/AdminPageChange").then((module) => ({ default: module.AdminPageChange })));
const AdminPageDeleteProduct = lazy(() => import("../pages/AdminPageDelete/AdminPageDelete").then((module) => ({ default: module.AdminPageDeleteProduct })));
const CheckOutPage = lazy(() => import("../pages/CheckOutPage/CheckOutPage").then((module) => ({ default: module.CheckOutPage })));


export const router: RouteObject[] = [
  {
    path: '/makeup',
    element: <HomePage />,
    children: [
      {
        path: '/makeup/register',
        element: <RegisterPage />
      },
      {
        path: '/makeup/product/:id',
        element: <ProductCardPage />
      },
      {
        path: '/makeup/category/:id',
        element: <CategoriesPage />,
      },
      {
        path: '/makeup/search',
        element: <SearchedPage />,
      },
      {
        path: '/makeup/cart',
        element: <Cart />,
      },
      {
        path: '/makeup/user',
        element: <PrivateRoutes path='/makeup/user' element={<UserPage />} />,
      },
      {
        path: '/makeup/checkout',
        element: <CheckOutPage />
      },
      {
        path: '/makeup/admin',
        element: <AdminPage />,
        children: [
          {
            path: '/makeup/admin/addproduct',
            element: <AdminPageAdd />
          },
          {
            path: '/makeup/admin/changeproduct',
            element: <AdminPageChange />
          },
          {
            path: '/makeup/admin/deleteproduct',
            element: <AdminPageDeleteProduct />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  },
];
