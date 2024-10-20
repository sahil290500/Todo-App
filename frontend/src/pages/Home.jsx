import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import { base_url } from "../../public/api.js";
import NoteCard from "../components/NoteCard.jsx";
import {toast} from 'react-toastify'
// import { useNavigate } from "react-router-dom";

function Home() {
  // const navigate = useNavigate();
  const [isModalOpen, setModelOpen] = useState(false);
  const [filteredNote, setFilteredNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    console.log("query: " + query);
    
    setFilteredNote(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);
  useEffect(() => {
    fetchNotes();
  }, [currentNote]);
  const fetchNotes = () => {
    axios
      .get(`${base_url}note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response: " + response.data || []);

        const fetchedNotes = response.data.notes || []; // Fallback to empty array if undefined
        setNotes(fetchedNotes);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeModal = () => {
    setModelOpen(false);
  };
  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
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
        toast.success('Note Added successfully');
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${base_url}note/${id}`,
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
        toast.success('Note Updated successfully');

        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${base_url}note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response is :".response);
      if (response.data.success) {
        // navigate("/");
        
        toast.success('Note deleted successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
         fetchNotes();

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-gray-200 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className=" m-4 px-8 gap-5 pt-5 grid grid-cols-1 md:grid-cols-3  ">
        {filteredNote.length > 0 ? filteredNote.map((note, i) => {
          return (
            <NoteCard
              key={i}
              deleteNote={deleteNote}
              onEdit={onEdit}
              note={note}
            />
          );
        }) : <p> No Notes </p> }
      </div>
      <button
        onClick={() =>{ setCurrentNote(); setModelOpen(true)}}
        className="fixed right-4 bottom-4 bg-teal-500 text-2xl text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
}

export default Home;
