import { useOverlay } from "@/hooks";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean | undefined;
  className?: string;
  children: React.ReactNode;
  onOutsideClick?: () => void;
};

export const Modal = ({
  isOpen,
  className,
  children,
  onOutsideClick,
}: Props) => {
  const { containerRef } = useOverlay(isOpen);

  if (!containerRef) return null;

  return (
    <>
      {createPortal(
        <>
          <div className={`modal ${isOpen && "top-0"} ${className}`}>
            {children}
          </div>
          <div
            className={`backdrop-modal ${isOpen && "h-auto w-auto opacity-50"}`}
            onClick={onOutsideClick}
          ></div>
        </>,
        containerRef
      )}
    </>
  );
};
