import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function NoteDetails(){

    const {id}=useParams();

    const [note,setNote]=useState(null);

    useEffect(()=>{

        const fetchNote=async()=>{

            const token=localStorage.getItem("token");

            const res=await axios.get(

                `http://localhost:3000/api/v1/notes/${id}`,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            setNote(res.data.note);

        }

        fetchNote();

    },[]);

    if(!note){

        return <h1>Loading...</h1>

    }

    return(

        <div className="bg-white rounded-xl shadow p-8">

            <pre className="whitespace-pre-wrap">

                {typeof note.content==="string"

                    ?note.content

                    :JSON.stringify(note.content,null,2)}

            </pre>

        </div>

    )

}