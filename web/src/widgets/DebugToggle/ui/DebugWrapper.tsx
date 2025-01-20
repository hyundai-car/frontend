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
  margin: 10px 3px; // 간격
  box-shadow: 0 0 0 3px ${({ $layerName }) => getLayerColor($layerName)}aa;

  &::before {
    content: "${({ $layerName }) => $layerName}";
    position: absolute;
    /* top: 0; */
    top: ${({ $layerName }) =>
      getLayerOffset($layerName)}px; // 레이어별로 다른 top 값
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

// 레이어별 위치 오프셋 설정
const getLayerOffset = (layerName: string): number => {
  const [layer] = layerName.split("/");
  const offsetMap = {
    pages: 0, // 맨 위
    widgets: 14, // 14px 아래
    features: 28, // 28px 아래
    entities: 42, // 42px 아래
  } as const;

  return offsetMap[layer as keyof typeof offsetMap] || 0;
};
