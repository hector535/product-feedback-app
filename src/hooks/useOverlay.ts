import { useEffect, useState } from "react";

export const useOverlay = (isOpen: boolean | undefined) => {
  const [containerRef, setContainerRef] = useState<HTMLElement>();

  useEffect(() => {
    setContainerRef(document.getElementById("overlays")!);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return { containerRef };
};
