import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  positionClass: string;
  size?: string;
  handleClick?: (e: any) => void;
}

export const ImageToggle = ({ icon: Icon, positionClass, size, handleClick }: Props) => {
  return (
    <div
      onClick={handleClick}
      className={`max-w-fit absolute p-2 shadow-sm rounded-full bg-whiteColor hover:cursor-pointer border ${positionClass}`}
    >
      <Icon size={size} />
    </div>
  );
};
