import React, {useEffect} from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { useHistory , Link} from "react-router-dom";


function DisplayDecks({decks, setDecks}){
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            const response = await listDecks(abortController.signal);

            setDecks(response);
        }
        loadDecks();

        return () => abortController.abort();
    }, [setDecks]);

    function deleteHandler(id) {
        if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            deleteDeck(id);
            history.go(0);
        }
    }


    const disDecks = decks.map(deck => {
        return (
            <div key={deck.id} className="mainDecks">
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} cards</p>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}`} ><button className="btn btn-secondary mr-2">View</button></Link>
                <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary mr-2">Study</button></Link>
                <button onClick={() => deleteHandler(deck.id)} className="btn btn-danger">Delete</button>
            </div>
        );
    })

    return (
        <div>
            {disDecks}
        </div>
    );
}

export default DisplayDecks;