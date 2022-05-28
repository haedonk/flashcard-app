import React from "react";
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
            <div key={card.id} className="border border-dark my-3 p-3">
                <div className="row">
                    <p className="col">{card.front}</p>
                    <p className="col">{card.back}</p>
                </div>
                <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary mr-2">Edit</button></Link>
                <button type="button" className="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>Delete</button>
            </div>
        )
    })





    if(cards.length > 0){
        return (
            <div className="mt-4">
                <h3>Cards</h3>
                {displayCards}
            </div>
        )
    }
    return null;
}

export default DisplayCards;
