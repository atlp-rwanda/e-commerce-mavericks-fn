import { Link } from "react-router-dom"

function FooterLink({ name }: { name: string }) {
    return <Link to="/" className="leading-none capitalize hover:underline text-xs md:text-base">{name}</Link>

}

export default FooterLink