import { Button, Disc, Paper } from "@/components";
import { useCountByStatus } from "@/hooks";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

export const Roadmap = ({ className }: Props) => {
  const numberFeedbackByStatus = useCountByStatus();
  const keys = Object.keys(numberFeedbackByStatus);
  const toggleElement = useStore((state) => state.toggleElement);
  const navigate = useNavigate();

  return (
    <Paper className={className}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold leading-[1.625rem]">Roadmap</h2>
        <Button.Link
          className="text-xs-2 font-semibold text-secondary-400 underline"
          onClick={() => {
            toggleElement("drawer", false);
            navigate("/roadmap");
          }}
        >
          View
        </Button.Link>
      </div>

      <div className="grid gap-2">
        {keys.map((key) => (
          <div key={key} className="flex items-center gap-4">
            <Disc color={key as "planned" | "in-progress" | "live"} />
            <span className="flex-grow">{key}</span>
            <span className="font-bold">
              {(numberFeedbackByStatus as Record<string, number>)[key]}
            </span>
          </div>
        ))}
      </div>
    </Paper>
  );
};
