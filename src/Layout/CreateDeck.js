import React, { useState } from "react";
import {Link} from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";



function CreateDeck({decks, newDeck}){
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
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">CreateDeck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Deck Name" onChange={handleNameChange} value={name}/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea type="text" class="form-control" id="description" 
                    placeholder="Brief description of the deck" rows="4" onChange={handleDescriptionChange} value={description}></textarea>
                </div>

                <Link to={"/"}><button type="button" class="btn btn-secondary mr-2">Cancel</button></Link>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;