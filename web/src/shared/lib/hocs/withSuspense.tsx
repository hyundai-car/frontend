/**
 * @description Suspense를 사용하여 로딩 상태 동안 대체 UI를 표시합니다.
 * @param WrappedComponent : Suspense로 감쌀 컴포넌트
 * @param FallbackComponent : 로딩 중에 보여줄 대체 컴포넌트 ex) 스켈레톤
 * @return Suspense로 감싼 WrappedComponent
 *
 * @example
 * const MyComponentWithSuspense = withSuspense(MyComponent);
 */

import React, {
  ComponentType,
  ForwardedRef,
  forwardRef,
  Suspense,
} from "react";

const DefaultFallback: React.FC = () => <div>Loading...</div>;

export function withSuspense<P extends object>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent: ComponentType = DefaultFallback
) {
  const ComponentWithSuspense = forwardRef<HTMLElement, P>((props, ref) => (
    <Suspense fallback={<FallbackComponent />}>
      <WrappedComponent {...(props as P)} ref={ref} />
    </Suspense>
  ));

  ComponentWithSuspense.displayName = `WithSuspense(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithSuspense;
}