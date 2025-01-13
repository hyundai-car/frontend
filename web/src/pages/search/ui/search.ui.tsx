import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function SearchPage() {
  return (
    <div>
      <h1>SearchPage</h1>
      <Input 
  placeholder="이름을 입력하세요"
/>

      <Button color="navy" onClick={function (): void {
        console.log("clicked");
      }} disabled={false}>차알못을 위한 간편 진단</Button>
    </div>
  );
}