import React, {useEffect, useState} from "react";
import StudyBreadCrumbs from "./StudyBreadCrumb";
import { useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCards from "./StudyCards";

function Study({decks, deck, setDeck, cards, setCards}){
    const [cardNum, setCardNum] = useState(0);
    const [side, setSide] = useState(true);


    const params = useParams();
    const {deckId} = params;

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const response = await readDeck(deckId, abortController.signal);

            setDeck(response);
            setCards(response.cards);
        }
        loadDeck();

        return () => abortController.abort();
    }, []);
    


    if(cards){
        return (
        <div>
            <StudyBreadCrumbs deck={deck}/>
            <h1>Study: {deck.name}</h1>
            <StudyCards cards={cards} cardNum={cardNum} side={side} setSide={setSide} setCardNum={setCardNum} deck={deck}/>
        </div>
    )}
    return "Loading";
}

export default Study;