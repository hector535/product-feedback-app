type props = {
  className?: string;
};

export const LoadingSpinner = ({ className }: props) => (
  <div className={`loading-spinner ${className}`}></div>
);
