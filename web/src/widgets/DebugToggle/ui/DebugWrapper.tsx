import styled from "styled-components";
import type { PropsWithChildren } from "react";
import { useDebugStore } from "../model/store";

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
  margin: 0px 1px; // 간격
  box-shadow: 0 0 0 3px ${({ $layerName }) => getLayerColor($layerName)}aa;

  &::before {
    content: "${({ $layerName }) => $layerName}";
    position: absolute;
    top: 0;
    right: 0;
    font-size: 8px;
    padding: 2px;
    background-color: ${({ $layerName }) => getLayerColor($layerName)}dd;
    color: white;
    z-index: 1000;
    pointer-events: none;
  }
`;

const getLayerColor = (layerName: string): string => {
  const [layer] = layerName.split("/");
  const colorMap = {
    widgets: "#fa0ee9",
    features: "#14a200",
    entities: "#98b21a",
    pages: "#0eb8bb",
  } as const;

  return colorMap[layer as keyof typeof colorMap] || "#999999";
};
