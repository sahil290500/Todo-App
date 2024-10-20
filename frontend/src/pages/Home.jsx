import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import { base_url } from "../../public/api.js";
import NoteCard from "../components/NoteCard.jsx";
// import { useNavigate } from "react-router-dom";

function Home() {
  // const navigate = useNavigate();
  const [isModalOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote , setCurrentNote] = useState(null);
  useEffect(() => {
    // fetch notes from the server
    axios
      .get(`${base_url}note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Response is:", response.data);
        const fetchedNotes = response.data.notes || []; // Fallback to empty array if undefined
        setNotes(fetchedNotes);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const closeModal = () => {
    setModelOpen(false);
  };
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${base_url}note/add`,
        { title: title, description: description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response is :".response);
      if (response.data.success) {
        // navigate("/");
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = (note)=>{
    setCurrentNote(note);
    setModelOpen(true);
  }
  return (
    <div className=" bg-gray-200 min-h-screen">
      <Navbar />
      <div className=" m-4 px-8 gap-5 pt-5 grid grid-cols-1 md:grid-cols-3  ">
        {notes.map((note, i) => {
          return (
            <NoteCard key={i} onEdit={onEdit} note={note}/>
             
          );
        })}
      </div>
      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 bg-teal-500 text-2xl text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote}  currentNote={currentNote} />}
    </div>
  );
}

export default Home;
