import React from "react";
import { Link } from "react-router-dom";
import FrontBack from "./FrontBack";
import StudyNextCard from "./StudyNextCard";


function StudyCards({cards, cardNum, side, setSide, setCardNum, deck}){

    function flip() {
        if(!side){
            setSide(true)
        }
        else{
            setSide(false);
        }
    }

    if(cards[cardNum]){
        if((cards.length) > 2){
            return (
            <div className="studyCard">
                <h3>Card {cardNum+1} of {cards.length}</h3>
                <FrontBack side={side} card={cards[cardNum]}/>
                <button onClick={flip}>Flip</button>
                <StudyNextCard setCardNum={setCardNum} side={side} cardNum={cardNum} flip={flip} cards={cards}/>
            </div>
            )
        }
    }

    if(deck.id){
        return (
            <div className="atLeast3">
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There is/are {cards.length} card(s) in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary mr-2"><span>&#43;</span>Add Cards</button></Link>
            </div>
        )
    }
    return "Loading";

}

export default StudyCards;