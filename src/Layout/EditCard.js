import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";


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
            setFront(response.front);
            setBack(response.back);
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
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                            <li className="breadcrumb-item"><a >Deck {deck.name}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                        </ol>
                    </nav>
                    <h2>Edit Card</h2>
                    <CardForm handleSubmit={handleSubmit} front={front} back={back} handleBackChange={handleBackChange} handleFrontChange={handleFrontChange} deck={deck}/>
                </div>
            )
        }
        return "loading";
}

export default EditCard;