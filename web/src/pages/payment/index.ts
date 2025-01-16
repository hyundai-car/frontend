import { withSuspense } from "@/shared/lib/hocs";
import { pathKeys } from "@/shared/lib/react-router";
import { createElement, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const PaymentLayout = withSuspense(
  lazy(() =>
    import("@/widgets/payment/layout/ui/PaymentLayout").then((module) => ({
      default: module.PaymentLayout,
    }))
  )
);
export const PaymentContractInfoPage = withSuspense(
  lazy(() =>
    import("./contractInfo/ui/Page").then((module) => ({
      default: module.ContractInfoPage,
    }))
  )
);
export const PaymentDetailsPage = withSuspense(
  lazy(() =>
    import("./details/ui/Page").then((module) => ({
      default: module.PaymentDetailsPage,
    }))
  )
);

export const PaymentCompletePage = withSuspense(
  lazy(() =>
    import("./complete/ui/Page").then((module) => ({
      default: module.PaymentCompletePage,
    }))
  )
);

export const PaymentsRoute: RouteObject = {
  path: pathKeys.payments.root(),
  element: createElement(PaymentLayout),
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
