import { DiagnosticButton, SearchFilter } from "@/features/search";
// import { DebugWrapper } from "@/widgets/DebugToggle";
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
