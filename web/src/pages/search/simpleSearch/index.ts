import { withSuspense } from "@/shared/lib/hocs";
import { lazy } from "react";
export const SimpleSearchPage = withSuspense(
  lazy(() =>
    import("./ui/Page").then((module) => ({
      default: module.SimpleSearchPage,
    }))
  )
);

// export const SimpleSearchStep = withSuspense(
//   lazy(() =>
//     import("../../../widgets/search/simpleSearchStep/ui/SimpleSearchStep").then(
//       (module) => ({
//         default: module.SimpleSearchStep,
//       })
//     )
//   )
// );

export const SimpleSearchResult = withSuspense(
  lazy(() =>
    import("./ui/ResultPage").then((module) => ({
      default: module.SimpleSearchResult,
    }))
  )
);
