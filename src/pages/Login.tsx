import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    };

    return (
        <div className="w-screen h-screen flex flex-row items-start justify-center bg-slate-900 text-white pt-20">
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl">Login page</h1>
                <button className="border rounded-md p-3 hover:text-gray-800 hover:bg-gray-200" onClick={handleNavigate}>Back home</button>
            </div>
        </div>
    );
}

export default Login;
