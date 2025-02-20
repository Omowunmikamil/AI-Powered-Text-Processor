import { useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { TextContext } from "../context/TextContext";

const Nav = () => {
  const { startNewChat } = useContext(TextContext);

  return (
    <div className="bg-gray-800 h-[100px] md:h-screen w-full md:w-1/4 rounded-b-xl md:rounded-r-xl px-6  py-6">
      <button
        className="flex flex-row justify-center items-center text-white bg-transparent border border-gray-600 w-2/3 md:w-full mx-auto shadow-lg rounded-md py-2 gap-4 cursor-pointer"
        onClick={startNewChat}
      >
        <FaPlus className="text-white text-xl" /> New Message
      </button>
    </div>
  );
};

export default Nav;
