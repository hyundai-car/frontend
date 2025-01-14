import { SearchFilter } from "@/entities/search/ui/SearchFilter";
import { StackedCard } from "@/entities/search/ui/StackedCard";
import { BasicButton } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Button } from "@mui/material";
import { useState } from "react";

export function SearchPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1>SearchPage</h1>
      <BasicButton color="navy" onClick={function (): void {
        console.log("clicked");
      }} disabled={false}>차알못을 위한 간편 진단</BasicButton>
      <StackedCard />
      <Icon type="heart" onClick={() => console.log('heart clicked')} />
      <Icon type="heart" color="navy" size={32} />
      <Icon type="heart-circle" color="blue" size={32} />

      <Button onClick={() => setIsOpen(true)}>장바구니</Button>

      <SearchFilter
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="필터ㅎ"
    >
      <div>필터</div>
    </SearchFilter>
    </div>
  );
}