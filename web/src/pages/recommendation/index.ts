import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
/**
 * @description
 */

const RecommendationPage = withSuspense(
  lazy(() =>
    import("./ui/RecommendationPage.ui").then((module) => ({
      default: module.RecommendationPage,
    }))
  )
);

export const RecommendationRoute: RouteObject = {
  path: pathKeys.recommendation(),
  element: createElement(RecommendationPage),
};
