import { useNavigate } from "react-router-dom";
import { Button, Icon, Paper } from "@/components";

type Props = {
  title: string;
  mode: "new" | "edit";
  children: React.ReactNode;
};

export const FeedbackLayout = ({ title, mode, children }: Props) => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto grid w-[87%] max-w-[33.75rem] gap-16 py-8">
      <Button.Link
        icon={<Icon name="arrow-left" />}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button.Link>
      <Paper
        className="relative grid gap-6 px-6 pb-6 pt-11 md:gap-10 md:px-10 md:pb-10 md:pt-[3.25rem]"
        component="article"
      >
        <Icon
          name={`${mode}-feedback`}
          viewBox={mode === "new" ? "0 0 58 58" : "0 0 40 40"}
          className="absolute top-0 left-6 h-10 w-10 -translate-y-[50%] md:h-14 md:w-14"
        />
        <h1 className="text-lg font-bold md:text-2xl">{title}</h1>
        {children}
      </Paper>
    </main>
  );
};
