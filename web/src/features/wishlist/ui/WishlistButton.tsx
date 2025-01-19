import { Icon } from "@/shared/ui/Icon/Icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleCarWishlist } from "../api/wishlist.api";

type Props = {
  carId: number;
  isLike: boolean; // 추가
};

export const WishlistButton = ({ carId, isLike }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: toggleWishlist, isPending } = useMutation({
    mutationFn: () => toggleCarWishlist(carId),
    onSuccess: () => {
      // 검색 결과 쿼리 무효화하여 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error) => {
      console.error("찜하기 처리 중 에러 발생:", error);
    },
  });

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isPending) {
      toggleWishlist();
    }
  };

  return (
    <Icon
      type="heart-empty"
      color={isLike ? "blue" : "grayBlue"}
      onClick={handleToggle}
    />
  );
};
