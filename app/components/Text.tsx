interface IProps {
  value?: string;
  size?: "XS" | "S" | "M" | "L" | "XL";
}

const decideSize = (size: "XS" | "S" | "M" | "L" | "XL"): string => {
  switch (size) {
    case "L":
      return "text-lg";
    case "S":
      return "text-sm";
    case "XS":
      return "text-xs";
    case "XL":
      return "text-4xl";
    default:
      return "text-md";
  }
};

const Text = ({ value, size = "M" }: IProps) => {
  return <div className={`dark:text-white ` + decideSize(size)}>{value}</div>;
};

export default Text;
