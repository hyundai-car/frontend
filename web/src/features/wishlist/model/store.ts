import { create }  from 'zustand'

type WishlistState = {
  likedCarIds: number[]
  toggleWishlist: (carId: number) => void
}

export const useWishlistStore = create<WishlistState>((set) => ({
  likedCarIds: [],
  toggleWishlist: (carId) =>
    set((state) => ({
      likedCarIds: state.likedCarIds.includes(carId)
        ? state.likedCarIds.filter((id) => id !== carId)
        : [...state.likedCarIds, carId],
    })),
}))