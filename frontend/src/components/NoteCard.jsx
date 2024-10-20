import { FaTrash, FaEdit } from "react-icons/fa";
const NoteCard = ({ note, onEdit }) => {
  return (
    <div className=" bg-white mb-4 p-4  items-center rounded shadow">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p> {note.description}</p>
      <div className="flex justify-end items-center mt-2">
        <button className="mr-2 text-blue-500 hover:text-blue-600" onClick={()=> {onEdit(note)}}>
          <FaEdit />
        </button>
        <button className="mr-2  text-red-500 hover:text-red-600">
          <FaTrash />{" "}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
