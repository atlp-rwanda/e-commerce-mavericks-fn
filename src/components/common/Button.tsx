import { cn } from '../../utils';

interface ButtonProps {
  text: string;
  buttonId?: string;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button = ({ text, type, className, disabled, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        'p-2 rounded-lg bg-greenColor hover:bg-darkGreen transition-all text-whiteColor font-semibold',
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
