import { Link } from "react-router-dom";
import maverick from "../assets/maverick.jpg";

const SampleComponent = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={maverick}
        alt="Mavericks logo"
        className="w-fit h-fit rounded-3xl hover:scale-105 transition-all hover:rotate-1 hover:shadow-lg"
      />
      <p className="text-5xl text-slate-50 font-bold ">
        Welcome to Mavericks e-commerce
      </p>
      <p className="block text-gray-600">
        Happy Coding, my fefllow devs! Let's work together to achieve more 💪
      </p>
      <Link to="/login">Login</Link>
    </div>
  );
};
export default SampleComponent;

