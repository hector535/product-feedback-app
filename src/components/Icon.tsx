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

type Props = {
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
};

export const Icon = ({ name }: Props) => {
  if (name === "arrow-down") return <ArrowDown />;
  if (name === "arrow-left") return <ArrowLeft />;
  if (name === "arrow-up") return <ArrowUp />;
  if (name === "check") return <Check />;
  if (name === "comments") return <Comments />;
  if (name === "edit-feedback") return <EditFeedback />;
  if (name === "new-feedback") return <NewFeedback />;
  if (name === "plus") return <Plus />;
  if (name === "close") return <Close />;
  if (name === "hamburger") return <Hamburger />;
  if (name === "suggestions") return <Suggestions />;

  return null;
};
