import type { CSSProperties, HTMLAttributes } from "react";
import { useDebugStore } from "@/shared/model/debug.store";

type CustomCSSProperties = {
  "--fsd-background-color": string;
  "--fsd-color": string;
} & CSSProperties;

type CustomHTMLAttributes<T> = {
  "data-fsd"?: string;
} & HTMLAttributes<T>;

type Layer = "widget" | "feature" | "entity" | "page";
type ModuleName = `${Layer}/${string}`;

const colorMap: Record<Layer, string> = {
  widget: "#fa0ee9",
  feature: "#14a200",
  entity: "#2573e5",
  page: "#ff0000",
} as const;

export function useFeatureSlicedDebug<T extends HTMLElement = HTMLDivElement>(
  name: ModuleName
) {
  const isDebugMode = useDebugStore((state) => state.isEnabled);
  const rootAttributes: CustomHTMLAttributes<T> = {};
  const [layer] = name.split("/") as [Layer];

  if (isDebugMode) {
    rootAttributes["data-fsd"] = name;
    rootAttributes.style = {
      "--fsd-color": `${colorMap[layer]}dd`,
      "--fsd-background-color": `${colorMap[layer]}07`,
    } as CustomCSSProperties;
  }

  return {
    rootAttributes,
  };
}
// 사용 예시:
// import { useFeatureSlicedDebug } from '@/shared/lib/useFeatureSlicedDebug'
//
// export const MyComponent = () => {
//   const { rootAttributes } = useFeatureSlicedDebug('feature/my-feature')
//   return <div {...rootAttributes}>Content</div>
// }
