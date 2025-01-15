import { DiagnosticButton, SearchFilter } from "@/features/search";
import { DebugWrapper } from "@/widgets/DebugToggle";
import { SearchCarList } from "@/widgets/search/searchCarList";

export function SearchPage() {
  return (
    <DebugWrapper layerName="page/search">
      <DebugWrapper layerName="features/SearchFilter">
        <SearchFilter />
      </DebugWrapper>
      <DebugWrapper layerName="features/DiagnosticButton">
        <DiagnosticButton />
      </DebugWrapper>
      <DebugWrapper layerName="widgets/SearchCarList">
        <SearchCarList />
      </DebugWrapper>
    </DebugWrapper>
  );
}
// return (
//   <DebugWrapper layerName="page/search">
//     <SearchFilter />
//     <DiagnosticButton />
//     <SearchCarList />
//   </DebugWrapper>
// );
