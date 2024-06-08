import clothes from '../../assets/clothes.png'
import watches from '../../assets/watches.png'
import education from '../../assets/education.png'
import suppliment from '../../assets/supplement.png'
import shoes from '../../assets/shoes.png'
import electronics from '../../assets/electronics.png'
import { Link } from 'react-router-dom'

export function PopularCategory({ title }: { title: string }) {
    return (
        <>
            <div className='py-3'>
                <h2 className="capitalize font-bold text-2xl">{title}</h2>
            </div>
            <NavLink icon={clothes} name='women clothes' />
            <NavLink icon={watches} name='watches' />
            <NavLink icon={education} name='education' />
            <NavLink icon={suppliment} name='suppliment' />
            <NavLink icon={shoes} name='shoes' />
            <NavLink icon={electronics} name='electronics' />
        </>
    )
}
export function NavLink({ icon, name }: { icon: string, name: string }) {
    return (
        <div className="flex items-center justify-start gap-3 px-1 active:bg-grayColor">
            <div className="rounded-md h-[50px] w-[50px] flex justify-center items-center">
                <img src={icon} alt="" className="w-full rounded-md" />
            </div>
            <p className="leading-none font-medium text-base capitalize">{name}</p>
        </div>
    )
}
export function DesktopNav() {
    return (
        <div className="bg-blackColor text-whiteColor hidden md:block w-screen">
            <div className="flex justify-center items-center border-whiteColor">
                <Navlink to="/" name='Plus' />
                <Navlink to="/" name='Flash Sales' />
                <Navlink to="/" name='Babies' />
                <Navlink to="/" name='Fathers' />
                <Navlink to="/" name='Electronics' />
                <Navlink to="/" name='Beauty' />
                <Navlink to="/" name='Sports' />
            </div>
        </div>
    )
}

function Navlink({ to, name }: { to: string, name: string }) {
    return (
        <Link to={to} className={`px-5 py-2 hover:bg-whiteColor hover:text-blackColor transition-all delay-100 ease-linear`}>
            {name}
        </Link>
    );
}
