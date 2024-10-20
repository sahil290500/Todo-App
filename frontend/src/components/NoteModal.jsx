import { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(()=>{
    if(currentNote){
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  },[currentNote])
  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(currentNote){
      editNote(currentNote._id, title, description);
      closeModal();
    }else{
      addNote(title, description);
    }
  }; 
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  ">
      <div className="bg-white p-8 rounded">
        <div>
          <h1 className="font-bold text-[25px] mb-4"> { currentNote ? "Edit Note" : "Add Note"}   </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            placeholder="Enter a new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-4"
            placeholder="Enter a Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {currentNote? "Update Note" : "Add Note"}
             
          </button>
          <button
            onClick={() => {
              console.log("closed clicked");
              closeModal();
            }}
            type="button"
            className="mt-4 ml-4 bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
