import Button from "@/components/ui/Button";

interface SelectionGroupProps {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

export function SelectionGroup({
  title,
  options,
  selected,
  onSelect,
}: SelectionGroupProps) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-1">{title}</h2>
      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onSelect(option)}
            className={`rounded-full ${
              selected === option
                ? "bg-blue-500 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
