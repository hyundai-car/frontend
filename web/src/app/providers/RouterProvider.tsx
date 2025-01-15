import { CandidatesRoute, RecommendationRoute } from "@/pages/recommendation";
import { RecommendationRoute } from "@/pages/recommendation";
import { SearchRoute } from "@/pages/search";
import { withSuspense } from "@/shared/lib/hocs";
import { createElement, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
/**
 * @description lazy
 */
const BaseLayout = withSuspense(
  lazy(() =>
    import("@/shared/ui/layout").then((module) => ({
      default: module.BaseLayout,
    }))
  )
);
const BackHeaderLayout = withSuspense(
  lazy(() =>
    import("@/shared/ui/layout").then((module) => ({
      default: module.BackHeaderLayout,
    }))
  )
);

/**
 * @description 라우터에 맞는 layout 정의
 */
const root = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        // TODO: 삭제 예정 (임시)
        path: "/",
        element: createElement(BaseLayout),
        children: [CandidatesRoute],
      },
      {
        element: createElement(BaseLayout),
        children: [CandidatesRoute],
      },
      {
        element: createElement(BackHeaderLayout),
        children: [RecommendationRoute],
        children: [RecommendationRoute, SearchRoute],
      },

      // {
      //   loader: async () => redirect(pathKeys.page404()),
      //   path: "*",
      // },
    ],
  },
]);

/**
 * @description ErrorBoundary가 처리하도록 상위로 전파
 * https://github.com/remix-run/react-router/discussions/10166
 */
function BubbleError() {
  const error = useRouteError();

  if (error) throw error;

  return null;
}

const AppRouters = () => {
  return <RouterProvider router={root} />;
};

export default AppRouters;