import {React} from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./CreateDeckButton";
import DisplayDecks from "./DisplayDecks";
import {useState} from "react";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck"
import AddOrEdit from "./AddOrEdit";


function Layout() {
  const [decks, setDecks] = useState([]);
  const [newDeck, setNewDeck] = useState({});
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);



  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <DisplayDecks decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck decks={decks} newDeck={newDeck}/>
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck setDeck={setDeck} deck={deck} cards={cards} setCards={setCards}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study decks={decks} deck={deck} setDeck={setDeck} cards={cards} setCards={setCards}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck setDeck={setDeck} deck={deck}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddOrEdit setDeck={setDeck} deck={deck}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <AddOrEdit setDeck={setDeck} deck={deck}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
