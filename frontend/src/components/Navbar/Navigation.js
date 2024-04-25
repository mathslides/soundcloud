import { useHistory } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"; // Importing icons from react-icons

function Navigation() {
    const history = useHistory();

    return (
        <nav className="flex items-center gap-x-4 pl-60 pt-2.5">
            <button onClick={() => history.goBack()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-70">
                <AiOutlineArrowLeft size={22} /> {/* Using the AiOutlineArrowLeft icon */}
            </button>
            <button onClick={() => history.goForward()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-70">
                <AiOutlineArrowRight size={22} /> {/* Using the AiOutlineArrowRight icon */}
            </button>
        </nav>
    );
}

export default Navigation;
