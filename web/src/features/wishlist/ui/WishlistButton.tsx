import { Icon } from '@/shared/ui/Icon/Icon'
import { useWishlistStore } from '../model/store'

type Props = {
  carId: number
}

export const WishlistButton = ({ carId }: Props) => {
  const { likedCarIds, toggleWishlist } = useWishlistStore()
  const isLiked = likedCarIds.includes(carId)

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    toggleWishlist(carId)
  }

  return (
    <Icon
      type="heart"
      color={isLiked ? 'blue' : 'grayBlue'}
      onClick={handleToggle}
    />
  )
}