export const handleLoading = async (
  callback: () => Promise<void>,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await callback();
  setIsLoading(false);
};
