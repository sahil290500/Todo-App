import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider.jsx";
const Navbar = ({ setQuery }) => {
  const { user,logout } = useAuth();
  

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>
      <input
        type="text"
        onChange={(e) => {
            setQuery(e.target.value);
        }}
        placeholder="Search Notes..."
        className="rounded bg-gray-600 px-4 py-2"
      />
      <div className="flex justify-between">
        {!user ? (
          <>
            <Link to={"/login"} className="bg-blue-500 px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-green-500 px-4 py-2 rounded mr-4"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4 uppercase font-bold text-[25px]">
              {user.name} 
            </span>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
