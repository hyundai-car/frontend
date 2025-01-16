import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

export const PaymentContractInfoPage = withSuspense(
  lazy(() =>
    import("./ui/ContractInfo").then((module) => ({
      default: module.ContractInfoPage,
    }))
  )
);
export const PaymentDetailsPage = withSuspense(
  lazy(() =>
    import("./ui/Details").then((module) => ({
      default: module.PaymentDetailsPage,
    }))
  )
);

export const PaymentCompletePage = withSuspense(
  lazy(() =>
    import("./ui/Complete").then((module) => ({
      default: module.PaymentCompletePage,
    }))
  )
);

export const PaymentsRoute: RouteObject = {
  path: pathKeys.payments.root(),
  children: [
    {
      index: true,
      element: createElement(Navigate, { to: "contract-info", replace: true }),
    },
    {
      path: "contract-info",
      element: createElement(PaymentContractInfoPage),
    },
    {
      path: "details",
      element: createElement(PaymentDetailsPage),
    },
    {
      path: "complete",
      element: createElement(PaymentCompletePage),
    },
  ],
};
