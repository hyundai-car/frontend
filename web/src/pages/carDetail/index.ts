import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";

const CarDetailPage = withSuspense(
  lazy(() =>
    import("./ui/CarDetailPage.ui").then((module) => ({
      default: module.CarDetailPage,
    }))
  )
);

export const CarDetailRoute: RouteObject = {
  path: `${pathKeys.cars.root()}carsDetail`,
  loader: ({ request }) => {
    const url = new URL(request.url);
    const carNo = url.searchParams.get("carNo");

    if (!carNo) {
      throw new Response("Missing carNo", { status: 404 });
    }
    return null;
  },
  element: createElement(CarDetailPage),
};
