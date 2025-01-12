import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>, // 기본 페이지 설정
  },
]);

const AppRouters = () => {
  return <RouterProvider router={root} />;
};

export default AppRouters;
