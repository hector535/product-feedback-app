import { useOverlay } from "@/hooks";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Drawer = ({ className, isOpen, children, onClose }: Props) => {
  const { containerRef } = useOverlay(isOpen);

  if (!containerRef) return null;

  const drawerClassnames = isOpen ? "right-0" : "";
  const backdropClassnames = isOpen ? "opacity-40 h-auto w-auto" : "";

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            className={`drawer md:-right-full ${className} ${drawerClassnames}`}
          >
            {children}
          </div>

          <div
            onClick={onClose}
            className={`backdrop md:h-0 md:w-0 md:opacity-0 ${backdropClassnames}`}
          ></div>
        </>,
        containerRef
      )}
    </>
  );
};
