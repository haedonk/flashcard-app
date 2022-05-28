import React from "react";
import {Link} from "react-router-dom";


function CardForm({handleSubmit, front, handleFrontChange, back, handleBackChange, deck}){




    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="frontTextArea">Front</label>
                <textarea type="text" className="form-control" id="front" 
                placeholder="Front side of card" rows="2" onChange={handleFrontChange} value={front}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea type="backTextArea" className="form-control" id="back" 
                placeholder="Back side of card" rows="2" onChange={handleBackChange} value={back}></textarea>
            </div>

            <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary mr-2">Cancel</button></Link>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )
}

export default CardForm;