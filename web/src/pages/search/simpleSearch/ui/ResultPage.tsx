import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon/Icon";
import { SimpleSearchResult } from "@/widgets/search/simpleSearchResult/ui/SimpleSearchResult";

export function SimpleSearchResultPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Header>
        <Icon
          type="close"
          size={17}
          onClick={() => {
            navigate("/search");
          }}
        />
      </Header>
      <SimpleSearchResult />
    </div>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;
