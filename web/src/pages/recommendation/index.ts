import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
/**
 * @description
 */

const CandidatesPage = withSuspense(
  lazy(() =>
    import("./ui/CandidatesPage.ui").then((module) => ({
      default: module.RecommendationPage,
    }))
  )
);
const RecommendationPage = withSuspense(
  lazy(() =>
    import("./ui/RecommendationPage.ui").then((module) => ({
      default: module.RecommendationPage,
    }))
  )
);

export const CandidatesRoute: RouteObject = {
  path: pathKeys.recommendation.candidates(),
  element: createElement(CandidatesPage),
};

export const RecommendationRoute: RouteObject = {
  path: pathKeys.recommendation.result(),
  element: createElement(RecommendationPage),
};
