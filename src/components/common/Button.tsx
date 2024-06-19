import { cn } from '../../utils';

interface ButtonProps {
  text: string;
  buttonId?: string;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
}
const Button = ({ text, type, className, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'p-2 rounded-lg bg-greenColor hover:bg-darkGreen transition-all text-whiteColor font-bold',
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
