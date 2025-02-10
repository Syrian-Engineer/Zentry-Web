import { IconType } from "react-icons";

interface Props {
  id: string;
  title: string;
  leftIcon?: IconType;
  containerClass: string;
}

const Button = ({ id, title, leftIcon: LeftIcon, containerClass }: Props) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50  px-7 py-3 ${containerClass}`}
    >
      {LeftIcon && <LeftIcon />} {/* Use LeftIcon as a component */}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
            <div>
                {title}
            </div>
            
      </span>
    </button>
  );
};

export default Button;
