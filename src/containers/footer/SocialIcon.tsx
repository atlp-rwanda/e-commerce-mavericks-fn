import { Facebook, Instagram, Twitter } from "lucide-react"

const SocialIcon = ({ name }: { name: string }) => {

    switch (name) {
        case "facebook":
            return <Facebook size={24} />;
        case "instagram":
            return <Instagram size={24} />;
        case "twitter":
            return <Twitter size={24} />;
        default:
            return null;
    }
};

export default SocialIcon