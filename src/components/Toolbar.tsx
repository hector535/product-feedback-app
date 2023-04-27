type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Toolbar = ({ className, children }: Props) => {
  return (
    <div className={`bg-secondary-600 py-2 px-6 md:py-3.5 ${className}`}>
      {children}
    </div>
  );
};
