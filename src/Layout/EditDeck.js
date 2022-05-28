import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { updateDeck } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";



function EditDeck({setDeck, deck}){
    const history = useHistory();
    const params = useParams();
    const {deckId} = params;




    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const response = await readDeck(deckId, abortController.signal);

            setDeck(response);
            setName(response.name);
            setDescription(response.description);
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
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li className="breadcrumb-item"><a >{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={deck.name} onChange={handleNameChange} value={name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea type="text" className="form-control" id="description" 
                    placeholder={deck.description} rows="4" onChange={handleDescriptionChange} value={description}></textarea>
                </div>

                <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary mr-2">Cancel</button></Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck;