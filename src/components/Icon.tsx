import { ReactComponent as ArrowDown } from "@/assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowLeft } from "@/assets/shared/icon-arrow-left.svg";
import { ReactComponent as ArrowUp } from "@/assets/shared/icon-arrow-up.svg";
import { ReactComponent as Check } from "@/assets/shared/icon-check.svg";
import { ReactComponent as Comments } from "@/assets/shared/icon-comments.svg";
import { ReactComponent as EditFeedback } from "@/assets/shared/icon-edit-feedback.svg";
import { ReactComponent as NewFeedback } from "@/assets/shared/icon-new-feedback.svg";
import { ReactComponent as Plus } from "@/assets/shared/icon-plus.svg";
import { ReactComponent as Close } from "@/assets/shared/mobile/icon-close.svg";
import { ReactComponent as Hamburger } from "@/assets/shared/mobile/icon-hamburger.svg";
import { ReactComponent as Suggestions } from "@/assets/suggestions/icon-suggestions.svg";

interface Props extends React.ComponentPropsWithoutRef<"svg"> {
  name:
    | "arrow-down"
    | "arrow-left"
    | "arrow-up"
    | "check"
    | "comments"
    | "edit-feedback"
    | "new-feedback"
    | "plus"
    | "close"
    | "hamburger"
    | "suggestions";
}

export const Icon = ({ className, name, ...props }: Props) => {
  const arrowClassnames = `stroke-secondary-400 ${className}`;

  if (name === "arrow-down")
    return <ArrowDown className={arrowClassnames} {...props} />;
  if (name === "arrow-left")
    return <ArrowLeft className={arrowClassnames} {...props} />;
  if (name === "arrow-up")
    return <ArrowUp className={arrowClassnames} {...props} />;
  if (name === "check") return <Check className={className} {...props} />;
  if (name === "comments") return <Comments className={className} {...props} />;
  if (name === "edit-feedback")
    return <EditFeedback className={className} {...props} />;
  if (name === "new-feedback")
    return <NewFeedback className={className} {...props} />;
  if (name === "plus") return <Plus className={className} {...props} />;
  if (name === "close") return <Close className={className} {...props} />;
  if (name === "hamburger")
    return <Hamburger className={className} {...props} />;
  if (name === "suggestions")
    return <Suggestions className={className} {...props} />;

  return null;
};
