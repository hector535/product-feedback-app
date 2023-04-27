type Props = {
  color: "in-progress" | "planned" | "live";
};

export const Disc = ({ color }: Props) => {
  const colors = {
    "in-progress": "bg-primary",
    planned: "bg-accent-orange",
    live: "bg-accent-sky",
  };

  const classnames = `w-2 h-2 rounded-full ${colors[color]}`;

  return (
    <>
      <div className={classnames}></div>
    </>
  );
};
