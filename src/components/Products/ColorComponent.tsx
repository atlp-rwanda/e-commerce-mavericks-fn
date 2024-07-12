interface Props {
  name: string;
}
export const ColorComponent = ({ name }: Props) => {
  return (
    <div className='border  hover:border-greenColor hover:border active:border-greenColor rounded-full py-1 px-4 hover:cursor-pointer'>
      {name}
    </div>
  );
};
