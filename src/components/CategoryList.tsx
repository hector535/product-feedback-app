import { Button } from "@/components";
import { useGetCategories } from "@/hooks";

type Props = {
  className?: string;
  value: number | string;
  onChange: (selectedValue: number | string) => void;
};

export const CategoryList = ({ className, value, onChange }: Props) => {
  const categories = useGetCategories();
  const options = [{ id: 0, name: "All" }, ...categories];

  return (
    <ul className={`${className} flex flex-wrap gap-x-2 gap-y-3.5`}>
      {options.map((c) => (
        <Button.Category
          key={c.id}
          active={c.id === value}
          onClick={() => onChange(c.id)}
        >
          {c.name}
        </Button.Category>
      ))}
    </ul>
  );
};
