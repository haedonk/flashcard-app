import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createCard, readCard, updateCard } from "../utils/api";
import { useHistory , useParams} from "react-router-dom";
import { readDeck } from "../utils/api";


function AddOrEdit({setDeck, deck}) {
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
        if(cardId){
            loadCard();
        }

        return () => abortController.abort();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        if(cardId){
            const formNewDeck = {
                front : front,
                back : back,
                id: cardId,
                deckId: Number(deckId)
    
            }
            console.log(formNewDeck);
            updateCard(formNewDeck).then((result)=>history.push(`/decks/${deckId}`));
        }
        else{
            const formNewDeck = {
                front : front,
                back : back,
            }
            createCard(deckId, formNewDeck).then((result)=>history.push(`/decks/${deckId}`));
        }
      };


    if(cardId){
    if(card){
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/" >Home</Link></li>
                        <li class="breadcrumb-item"><a >Deck {deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                    </ol>
                </nav>
                <h2>Edit Card</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label htmlFor="frontTextArea">Front</label>
                        <textarea type="text" class="form-control" id="front" 
                        placeholder={card.front} rows="2" onChange={handleFrontChange} value={front}></textarea>
                    </div>
                    <div class="form-group">
                        <label htmlFor="back">Back</label>
                        <textarea type="backTextArea" class="form-control" id="back" 
                        placeholder={card.back} rows="2" onChange={handleBackChange} value={back}></textarea>
                    </div>
    
                    <Link to={`/decks/${deck.id}`}><button type="button" class="btn btn-secondary mr-2">Cancel</button></Link>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        )
    }
    return "loading";
    }
    else{
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

    }

export default AddOrEdit;