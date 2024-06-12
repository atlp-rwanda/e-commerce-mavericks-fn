import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const SocialIcon = ({ name }: { name: string }) => {

    switch (name) {
        case "facebook":
            return <FaFacebook />;
        case "instagram":
            return <FaInstagram />;
        case "twitter":
            return <FaXTwitter />;
        default:
            return null;
    }
};

export default SocialIcon