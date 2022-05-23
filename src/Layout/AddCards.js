import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createCard } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";

function AddCards({setDeck, deck}){
    const history = useHistory();
    const params = useParams();
    const {deckId} = params;
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

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
            front : front,
            back : back,
        }
        createCard(deckId, formNewDeck).then((result)=>history.push(`/decks/${deckId}`));
      };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li class="breadcrumb-item"><Link >{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="front">Front</label>
                    <textarea type="text" class="form-control" id="front" 
                    placeholder="Front side of card" rows="2" onChange={handleFrontChange} value={front}></textarea>
                </div>
                <div class="form-group">
                    <label for="back">Back</label>
                    <textarea type="text" class="form-control" id="back" 
                    placeholder="Back side of card" rows="2" onChange={handleBackChange} value={back}></textarea>
                </div>

                <Link to={`/decks/${deck.id}`}><button type="button" class="btn btn-secondary mr-2">Cancel</button></Link>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default AddCards;