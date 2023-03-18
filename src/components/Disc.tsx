type Props = {
  color: "purple" | "orange" | "sky";
};

export const Disc = ({ color }: Props) => {
  const colors = {
    purple: "bg-primary",
    orange: "bg-accent-orange",
    sky: "bg-accent-sky",
  };

  const classnames = `w-2 h-2 rounded-full ${colors[color]}`;

  return (
    <>
      <div className={classnames}></div>
    </>
  );
};
