// features/search/ui/SearchFilter.tsx
import { SearchBox } from "./SearchBox";
import { FilterDrawer } from "./FilterDrawer";
import { useSearchStore } from "../model/store";

export const SearchFilter = () => {
  const { isFilterOpen, filters, setFilterOpen, setFilters } = useSearchStore();

  return (
    <>
      <SearchBox onFilterClick={() => setFilterOpen(true)} />
      <div style={{ height: 15 }} />
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </>
  );
};
