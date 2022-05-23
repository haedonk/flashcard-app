import React from "react";
import { Link} from "react-router-dom";


function CreateDeckButton(){
    return <Link to={"/decks/new"}><button type="button" class="btn btn-secondary"><span>&#43;</span>Create Deck</button></Link>
}

export default CreateDeckButton;