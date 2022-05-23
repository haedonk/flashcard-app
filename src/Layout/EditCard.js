import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createCard, readCard, updateCard } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";


function EditCard({setDeck, deck}){
    const history = useHistory();
    const params = useParams();
    const {deckId, cardId} = params;
    const [card, setCard] = useState();
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
        async function loadCard() {
            const response = await readCard(cardId, abortController.signal);

            setCard(response);
        }
        loadDeck();
        loadCard();


        return () => abortController.abort();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formNewDeck = {
            front : front,
            back : back,
            id: cardId,
            deckId: Number(deckId)

        }
        console.log(formNewDeck);
        updateCard(formNewDeck).then((result)=>history.push(`/decks/${deckId}`));
      };


        if(card){
            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/" >Home</Link></li>
                            <li class="breadcrumb-item"><Link >Deck {deck.name}</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                        </ol>
                    </nav>
                    <h2>Edit Card</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="frontTextArea">Front</label>
                            <textarea type="text" class="form-control" id="front" 
                            placeholder={card.front} rows="2" onChange={handleFrontChange} value={card.front}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="back">Back</label>
                            <textarea type="backTextArea" class="form-control" id="back" 
                            placeholder={card.back} rows="2" onChange={handleBackChange} value={card.back}></textarea>
                        </div>
        
                        <Link to={`/decks/${deck.id}`}><button type="button" class="btn btn-secondary mr-2">Cancel</button></Link>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form>
                </div>
            )
        }
        return "loading";
}

export default EditCard;