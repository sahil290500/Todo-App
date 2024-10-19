import { useState } from "react";
import axios from "axios";
import { base_url } from "../../public/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider.jsx";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} =useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}auth/login`, {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user)
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="card   shadow-2xl border-black w-96 flex  m-auto  mt-20">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex items-center flex-col p-4"
        >
          <h2 className="text-[25px] font-bold text-center">Login</h2>

          <div className="p-3">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border shadow-2xl p-2 ml-3"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="p-3">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border shadow-2xl p-2 ml-3"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className=" flex flex-col">
            <button
              type="submit"
              className="border border-black p-2 mt-4 mb-3   text-slate-50 font-semibold bg-indigo-800"
            >
              Log In
            </button>
            <p>
              Don`t have account <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
