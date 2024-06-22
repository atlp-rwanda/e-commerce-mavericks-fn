import clothes from '../../assets/clothes.png';
import watches from '../../assets/watches.png';
import education from '../../assets/education.png';
import suppliment from '../../assets/supplement.png';
import shoes from '../../assets/shoes.png';
import electronics from '../../assets/electronics.png';
import { useNavigate, NavLink } from 'react-router-dom';


export function PopularCategory({ title }: { title: string }) {  
  return (
    <>
      <div className='p-3'>
        <h2 className='capitalize font-bold text-2xl'>{title}</h2>
      </div>
      <SidebarLink icon={clothes} to='/' name='women clothes' />
      <SidebarLink icon={watches} to='/' name='watches' />
      <SidebarLink icon={education} to='/' name='education' />
      <SidebarLink icon={suppliment} to='/' name='suppliment' />
      <SidebarLink icon={shoes} to='/' name='shoes' />
      <SidebarLink icon={electronics} to='/' name='electronics' />
    </>
  );
}
export function SidebarLink({ icon, name, to }: { icon: string; name: string; to: string }) {
  return (
    <NavLink
      to={to}
      className='flex items-center justify-start gap-3 px-3 cursor-pointer active:bg-grayColor transition-all ease-in py-1 hover:bg-grayColor'
    >
      <div className='rounded-md h-[50px] w-[50px] flex justify-center items-center'>
        <img src={icon} alt='' className='w-full rounded-md' />
      </div>
      <p className='leading-none font-medium text-base capitalize'>{name}</p>
    </NavLink>
  );
}
export function DesktopNav() {

  const navigate = useNavigate();

  const handleClick = (name: string) => {
    navigate(`/categories/${name}`);
  };
  
  return (
    <div className='bg-blackColor text-whiteColor hidden md:block w-full'>
      <div className='flex justify-center items-center border-whiteColor'>
        <DeskNavLink name='Plus' onClick={() => handleClick('Plus')} />
        <DeskNavLink name='Flash Sales' onClick={() => handleClick('Flash Sales')} />
        <DeskNavLink name='Babies' onClick={() => handleClick('Babies')} />
        <DeskNavLink name='Fathers' onClick={() => handleClick('Fathers')} />
        <DeskNavLink name='Electronics' onClick={() => handleClick('Electronics')} />
        <DeskNavLink name='Beauty' onClick={() => handleClick('Beauty')} />
        <DeskNavLink name='Sports' onClick={() => handleClick('Sports')} />
      </div>
    </div>
  );
}

function DeskNavLink({ onClick, name }: { onClick: () => void, name: string }) {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-2 cursor-pointer hover:bg-whiteColor hover:text-blackColor transition-all delay-100 ease-linear`}
    >
      {name}
    </div>
  );
}
