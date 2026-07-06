import { useLocation } from "react-router-dom";

import "../../styles/Notes.css";

function Notes(){

    const {state}=useLocation();

    const notes=state?.notes;

    return(

        <div className="notes-container">

            <div className="notes-card">

                <h1>Generated Notes</h1>

                <pre>

                    {JSON.stringify(notes,null,2)}

                </pre>

            </div>

        </div>

    )

}

export default Notes;