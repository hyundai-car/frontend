import { SearchFilter } from "@/entities/search/ui/SearchFilter";
import { BasicButton } from "@/shared/ui/button";

import { SearchCarList } from "@/widgets/search/searchCarList";
import { Button } from "@mui/material";
import { useState } from "react";

export function SearchPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <BasicButton color="navy" onClick={function (): void {
        console.log("clicked");
      }} disabled={false}>차알못을 위한 간편 진단</BasicButton>
      <Button onClick={() => setIsOpen(true)}>장바구니</Button>

      <SearchFilter
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="필터ㅎ"
    >
      <div>필터</div>
      </SearchFilter>
      <SearchCarList/>
    </div>
  );
}