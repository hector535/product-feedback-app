import React, { ReactElement, useRef } from "react";

type Props = React.ComponentPropsWithoutRef<"form">;

const Form = ({ children, ...props }: Props) => {
  return <form {...props}>{children}</form>;
};

type ItemProps = {
  label: string;
  name: string;
  description?: string;
  errorMessage?: string;
  children: React.ReactNode;
};

const Item = ({
  label,
  name,
  description,
  errorMessage,
  children,
}: ItemProps) => {
  if (React.Children.count(children) !== 1)
    throw new Error("Only one child is acceptable");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const isCustomComponent =
    typeof (children as { type: string }).type === "function";

  const onClickLabel = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (!containerRef.current) return;

    const customComponentContainer = containerRef.current.querySelector("div");

    if (!customComponentContainer) return;

    customComponentContainer.focus();
    customComponentContainer.click();
  };

  return (
    <div ref={containerRef}>
      <label
        htmlFor={name}
        className="mb-1 block text-xs-2 font-bold md:text-sm"
        onClick={isCustomComponent ? onClickLabel : undefined}
      >
        {label}
      </label>
      {description && (
        <p className="mb-4 text-xs-2 font-normal text-neutral-900 md:text-sm">
          {description}
        </p>
      )}

      {React.cloneElement(children as ReactElement, { id: name })}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

Form.Item = Item;

export default Form;
