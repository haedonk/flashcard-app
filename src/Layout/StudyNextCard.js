import React from "react";
import { useHistory} from "react-router-dom";

function StudyNextCard({setCardNum, side, cardNum, flip, cards}){
    const history = useHistory();


    function next(){
        if((cardNum+1) < (cards.length)){
            setCardNum(cardNum+1);
            flip();
        }
        else{
            flip();
            console.log(cardNum, cards)
            if(window.confirm("Restart cards?\n\nClick `cancel` to return to the home page.")){
                setCardNum(0);
            }
            else{
                history.push("/");
            }
        }
        }



    if(!side){
        return <button onClick={next}>Next</button>
    }
    return null;
}

export default StudyNextCard;