import React, {useEffect} from "react";
import { useParams, Link , useRouteMatch, useHistory} from "react-router-dom";
import { readDeck } from "../utils/api";
import DisplayCards from "./DisplayCards";
import { deleteDeck } from "../utils/api";


function Deck({setDeck, deck, cards, setCards}){
    const params = useParams();
    const {deckId} = params;
    const {url} = useRouteMatch();
    const history = useHistory();

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

    function deleteHandler(id) {
        if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            deleteDeck(id);
            history.push("/");
        }
    }


    if(deck){
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
                </nav>
                <h4>{deck.name}</h4>
                <p>{deck.description}</p>
                <Link to={`${url}/edit`}><buton type="button" class="btn btn-secondary mr-2">Edit</buton></Link>
                <Link to={`${url}/study`}><button type="button" class="btn btn-primary mr-2">Study</button></Link>
                <Link to={`${url}/cards/new`}><button type="button" class="btn btn-primary mr-2"><span>&#43;</span>Add Cards</button></Link>
                <buton type="button" class="btn btn-danger" onClick={() => deleteHandler(deck.id)}>Delete</buton>
                <DisplayCards cards={cards} setCards={setCards} deck={deck}/>
            </div>
        )
    }
    return "loading";
}

export default Deck;