import { withSuspense } from "@/shared/lib/hocs";
import { createElement, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { TestPage } from "./TestPage";

export const PaymentsContractInfoPage = withSuspense(
  lazy(() =>
    import("./contractInfo/ui/Page").then((module) => ({
      default: module.ContractInfoPage,
    }))
  )
);
export const PaymentsProcessPage = withSuspense(
  lazy(() =>
    import("./process/ui/Page").then((module) => ({
      default: module.PaymentsProcessPage,
    }))
  )
);

export const PaymentsCompletePage = withSuspense(
  lazy(() =>
    import("./complete/ui/Page").then((module) => ({
      default: module.PaymentsCompletePage,
    }))
  )
);
export const PaymentsRoute: RouteObject = {
  path: "payments/:carId",
  children: [
    {
      index: true,
      element: createElement(Navigate, { to: "contract-info", replace: true }),
    },
    {
      path: "test",
      element: createElement(TestPage),
    },
    {
      path: "contract-info",
      element: createElement(PaymentsContractInfoPage),
    },
    {
      path: ":type/process",
      element: createElement(PaymentsProcessPage),
    },
    {
      path: ":type/process/complete",
      element: createElement(PaymentsCompletePage),
    },
  ],
};
