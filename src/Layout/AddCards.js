import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createCard } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

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
    }, [deckId,setDeck]);

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
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li className="breadcrumb-item"><button className="btn btn-link">{deck.name}</button></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm handleSubmit={handleSubmit} front={front} back={back} handleBackChange={handleBackChange} handleFrontChange={handleFrontChange} deck={deck}/>
        </div>
    )
}

export default AddCards;