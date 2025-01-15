import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { SimpleSearchPage } from "./simpleSearch/ui/Page";
import { SimpleSearchStep } from "../../widgets/search/simpleSearchStep/ui/SimpleSearchStep";
import { SimpleSearchResult } from "./simpleSearch/ui/ResultPage";
/**
 * @description
 */

const SearchPage = withSuspense(
  lazy(() =>
    import("./ui/Page").then((module) => ({
      default: module.SearchPage,
    }))
  )
);

export const SearchRoute: RouteObject = {
  path: pathKeys.search(),
  children: [
    {
      index: true, // search 경로일 때 (부모 경로와 일치할 때)
      element: createElement(SearchPage),
    },
    {
      path: "simple-search",
      children: [
        {
          index: true,
          element: createElement(Navigate, { to: "step/1", replace: true }), // search/simple-search면 step/1로 이동
        },
        {
          path: "step",
          element: createElement(SimpleSearchPage),
          children: [
            {
              path: ":step",
              element: createElement(SimpleSearchStep),
            },
          ],
        },
        {
          path: "result/:resultId",
          element: createElement(SimpleSearchResult),
        },
      ],
    },
  ],
};
