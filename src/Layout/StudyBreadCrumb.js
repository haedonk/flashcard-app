import React from "react";
import {Link} from "react-router-dom";


function StudyBreadCrumbs({deck}){
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li class="breadcrumb-item"><Link>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
        </div>
    )
}

export default StudyBreadCrumbs;