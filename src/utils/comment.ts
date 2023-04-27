import { getViewportWidth } from "./viewport";

export const getMaxDepthBasedOnViewport = () => {
  const vw = getViewportWidth();

  if (vw >= 0 && vw <= 375) {
    return 2;
  }

  if (vw >= 375 && vw <= 768) {
    return 5;
  }

  return 10;
};
