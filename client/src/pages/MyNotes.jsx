import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

export default function MyNotes() {

    const [notes,setNotes] = useState([]);

    useEffect(()=>{

        const fetchNotes = async()=>{

            try{

                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:3000/api/v1/notes",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                setNotes(res.data.notes);

            }

            catch(err){

                console.log(err);

            }

        }

        fetchNotes();

    },[])

    return(

        <div>

            <h1 className="text-3xl font-bold mb-6">
                My Notes
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {
                    notes.map(note=>(
                        <NoteCard
                            key={note._id}
                            note={note}
                        />
                    ))
                }

            </div>

        </div>

    )

}