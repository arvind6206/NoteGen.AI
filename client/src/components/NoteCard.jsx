import { Link } from "react-router-dom";

export default function NoteCard({note}){

    return(

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-bold text-xl">

                {note.pdf.originalName}

            </h2>

            <p className="text-gray-500 mt-2">

                {new Date(note.createdAt).toLocaleDateString()}

            </p>

            <Link

                to={`/dashboard/note/${note._id}`}

                className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded"

            >

                View

            </Link>

        </div>

    )

}