import { LoadingSpinner } from "./LoadingSpinner";

type BaseButtonProps = React.ComponentPropsWithoutRef<"button">;
type BaseIcon = { icon?: JSX.Element };

type DefaultButtonProps = BaseButtonProps &
  BaseIcon & {
    color?: "default" | "purple" | "blue" | "dark-blue" | "red";
    loading?: boolean;
  };

type LinkButtonProps = BaseButtonProps & BaseIcon;
type CategoryButtonProps = BaseButtonProps & { active?: boolean };

const colors = {
  default: "",
  purple: "bg-primary",
  blue: "bg-secondary-400",
  "dark-blue": "bg-secondary-500",
  red: "bg-accent-red",
};

const Button = ({
  color = "default",
  loading,
  icon,
  className,
  children,
  ...props
}: DefaultButtonProps) => {
  const iconClassnames = icon ? "icon-btn" : "";

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg-2  px-4 py-2.5 text-xs-2 font-bold text-white transition-opacity duration-300 hover:opacity-75 disabled:opacity-50 md:px-6 md:py-3 md:text-sm ${colors[color]} ${iconClassnames} ${className}`}
      {...props}
    >
      {loading ? <LoadingSpinner /> : icon}
      {children}
    </button>
  );
};

const Category = ({
  className,
  children,
  active,
  ...props
}: CategoryButtonProps) => {
  return (
    <button
      className={`rounded-[0.625rem] bg-secondary-300 px-4 py-1.5 text-xs-2 font-semibold text-secondary-400 ${className} ${
        active
          ? "bg-secondary-400 text-white"
          : "transition-colors duration-300 hover:bg-secondary-350"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

const Link = ({ icon, className, children, ...props }: LinkButtonProps) => {
  const iconClassnames = icon ? "icon-btn" : "";

  return (
    <button
      className={`h-max bg-transparent px-0 font-bold text-neutral-900 ${iconClassnames} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

Button.Category = Category;
Button.Link = Link;

export default Button;
