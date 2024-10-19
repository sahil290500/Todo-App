import { useState } from "react";
import axios from "axios";
import { base_url } from "../../public/api.js";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  console.log(base_url);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}auth/register`, {
        name,
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        navigate("/login");
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
          <h2 className="text-[25px] font-bold text-center">SignUp</h2>
          <div className="p-3">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border  shadow-2xl p-2 ml-3"
              placeholder="Enter Name"
              required
            />
          </div>
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
              Sign Up
            </button>
            <p>
              Already have account <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
