import React from "react";


function FrontBack({side, card}){

    if(!side){
        return <p>{card.back}</p>
    }
    return <p>{card.front}</p>
}

export default FrontBack;