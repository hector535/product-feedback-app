import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  component?: "div" | "article" | "li";
  onClick?: () => void;
};

export const Paper = ({
  className,
  component = "div",
  children,
  onClick,
}: Props) => {
  return React.createElement(
    component,
    { className: `rounded-lg-2 bg-white p-6 ${className}`, onClick },
    children
  );
};
