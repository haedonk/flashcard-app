import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { deleteCard } from "../utils/api";


function DisplayCards({cards, setCards}){
    const history = useHistory();

    function deleteCardHandler(id) {
        if(window.confirm("Delete this Card?\n\nYou will not be able to recover it.")){
            deleteCard(id);
            history.go(0);
        }
    }
    
    const displayCards = cards.map(card=>{
        return(
            <div class="border border-dark my-3 p-3">
                <div class="row">
                    <p class="col">{card.front}</p>
                    <p class="col">{card.back}</p>
                </div>
                <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}><button type="button" class="btn btn-secondary mr-2">Edit</button></Link>
                <button type="button" class="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>Delete</button>
            </div>
        )
    })





    if(cards.length > 0){
        return (
            <div class="mt-4">
                <h3>Cards</h3>
                {displayCards}
            </div>
        )
    }
    return null;
}

export default DisplayCards;
