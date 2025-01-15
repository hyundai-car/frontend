import { useEffect } from "react";
import styled from "styled-components";
import { DebugWrapper } from "./DebugWrapper";
import { useDebugStore } from "../model/store";

export const DebugToggle = () => {
  const { isEnabled, toggleDebug } = useDebugStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "d") {
        toggleDebug();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleDebug]);

  return (
    <DebugWrapper layerName="widget/debug-toggle">
      <Container>
        <Toggle type="button" onClick={toggleDebug} $isEnabled={isEnabled}>
          FSD Debug: {isEnabled ? "ON" : "OFF"}
        </Toggle>
        <HintText>Press Alt + D to toggle</HintText>
      </Container>
    </DebugWrapper>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Toggle = styled.button<{ $isEnabled: boolean }>`
  padding: 3px;
  background-color: ${({ $isEnabled }) => ($isEnabled ? "#2573e5" : "#64748b")};
  color: white;
  font-size: 12px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const HintText = styled.span`
  font-size: 8px;
  color: #64748b;
`;
