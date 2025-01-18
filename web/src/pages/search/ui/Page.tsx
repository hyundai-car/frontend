import { DiagnosticButton, SearchFilter } from "@/features/search";
import { DebugWrapper } from "@/widgets/DebugToggle";
import { SearchCarList } from "@/widgets/search/searchCarList";

export function SearchPage() {
  return (
    <>
      <SearchFilter />
      <DiagnosticButton />
      <SearchCarList />
    </>
  );
}
// 디버그 지운 tsx
// return (
//     <SearchFilter />
//     <DiagnosticButton />
//     <SearchCarList />
// );

// <DebugWrapper layerName="page/search">
//   <DebugWrapper layerName="features/SearchFilter">
//     <SearchFilter />
//   </DebugWrapper>
//   <DebugWrapper layerName="features/DiagnosticButton">
//     <DiagnosticButton />
//   </DebugWrapper>
//   <DebugWrapper layerName="widgets/SearchCarList">
//     <SearchCarList />
//   </DebugWrapper>
// </DebugWrapper>;
