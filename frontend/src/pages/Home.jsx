import { useState } from "react";
import Navbar from "../components/Navbar";
function Home() {
    const [isModalOpen, setModelOpen ]= useState(false)
  return (
    <div className=" bg-gray-200 min-h-screen">
      <Navbar />
        <button onClick={ ()=> setModelOpen(true)} className="fixed right-4 bottom-4 bg-teal-500 text-2xl text-white font-bold p-4 rounded-full">+</button>
    </div>
  );
}

export default Home;
