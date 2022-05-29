import React, { useState } from "react";
import {Link} from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";



function CreateDeck({decks}){
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formNewDeck = {
            name : name,
            description : description,
        }
        createDeck(formNewDeck).then((result)=>history.push(`/decks/${result.id}`));
      };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">CreateDeck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Deck Name" onChange={handleNameChange} value={name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" id="description" 
                    placeholder="Brief description of the deck" rows="4" onChange={handleDescriptionChange} value={description}></textarea>
                </div>

                <Link to={"/"}><button type="button" className="btn btn-secondary mr-2">Cancel</button></Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;