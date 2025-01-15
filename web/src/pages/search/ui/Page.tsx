
import { FilterState } from "@/features/search/model/types";
import { FilterDrawer, INITIAL_FILTERS } from "@/features/search/ui/FilterDrawer";
import { SearchBox } from "@/features/search/ui/SearchBox";
import { BasicButton } from "@/shared/ui/button";
import { SearchCarList } from "@/widgets/search/searchCarList";
import { useState } from "react";

export function SearchPage() {
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  return (
    <div>
      <SearchBox onFilterClick={() => setFilterOpen(true)} />
      <FilterDrawer 
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
      <br/>
      <BasicButton color="navy" onClick={function (): void {
        console.log("clicked");
      }} disabled={false}>차알못을 위한 간편 진단</BasicButton>

      <SearchCarList/>
    </div>
  );
}