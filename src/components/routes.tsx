import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import BookDetail from "../pages/BookDetail";
import BookCart from "../pages/BookCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book/:ID", element: <BookDetail /> },
      { path: "bookcart", element: <BookCart /> },
    ],
  },
]);

export default router;
