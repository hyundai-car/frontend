import styled from "styled-components";
import type { PropsWithChildren } from "react";
import { useDebugStore } from "@/shared/model/debug.store";

type DebugWrapperProps = PropsWithChildren<{
  layerName: string;
}>;

export const DebugWrapper = ({ children, layerName }: DebugWrapperProps) => {
  const isEnabled = useDebugStore((state) => state.isEnabled);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <StyledDebugWrapper $layerName={layerName}>{children}</StyledDebugWrapper>
  );
};

const StyledDebugWrapper = styled.div<{ $layerName: string }>`
  position: relative;
  border: 1px dashed ${({ $layerName }) => getLayerColor($layerName)}dd;
  background-color: ${({ $layerName }) => getLayerColor($layerName)}07;

  &::before {
    content: "${({ $layerName }) => $layerName}";
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10px;
    padding: 2px;
    background-color: ${({ $layerName }) => getLayerColor($layerName)}dd;
    color: white;
    z-index: 1000;
    pointer-events: none;
    opacity: 0.7;
  }
`;

const getLayerColor = (layerName: string): string => {
  const [layer] = layerName.split("/");
  const colorMap = {
    widget: "#fa0ee9",
    feature: "#14a200",
    entity: "#2573e5",
    page: "#ff0000",
  } as const;

  return colorMap[layer as keyof typeof colorMap] || "#999999";
};
