import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { updateDeck } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import CreateDeckButton from "./CreateDeckButton";



function EditDeck({setDeck, deck}){
    const history = useHistory();
    const params = useParams();
    const {deckId} = params;


    const [name, setName] = useState(deck.name);
    const [description, setDescription] = useState(deck.description);
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const response = await readDeck(deckId, abortController.signal);

            setDeck(response);
        }
        loadDeck();

        return () => abortController.abort();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formNewDeck = {
            name : name,
            description : description,
            id: deckId
        }
        updateDeck(formNewDeck).then((result)=>history.push(`/decks/${result.id}`));
      };


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li class="breadcrumb-item"><Link >{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="nameInput">Name</label>
                    <input type="text" class="form-control" id="name" placeholder={deck.name} onChange={handleNameChange} value={deck.name}/>
                </div>
                <div class="form-group">
                    <label for="descriptionInput">Description</label>
                    <textarea type="text" class="form-control" id="description" 
                    placeholder={deck.description} rows="4" onChange={handleDescriptionChange} value={deck.description}></textarea>
                </div>

                <Link to={`/decks/${deck.id}`}><button type="button" class="btn btn-secondary mr-2">Cancel</button></Link>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck;