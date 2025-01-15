import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
/**
 * @description
 */

const SearchPage = withSuspense(
  lazy(() =>
    import("./ui/search.ui").then((module) => ({
      default: module.SearchPage,
    }))
  )
);

export const SearchRoute: RouteObject = {
  path: pathKeys.search(),
  element: createElement(SearchPage),
};