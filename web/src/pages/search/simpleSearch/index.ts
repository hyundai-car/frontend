import { withSuspense } from "@/shared/lib/hocs";
import { lazy } from "react";
export const SimpleSearchPage = withSuspense(
  lazy(() =>
    import("./ui/Page").then((module) => ({
      default: module.SimpleSearchPage,
    }))
  )
);

export const SimpleSearchResultPage = withSuspense(
  lazy(() =>
    import("./ui/ResultPage").then((module) => ({
      default: module.SimpleSearchResultPage,
    }))
  )
);
