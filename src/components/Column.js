import React from 'react';
import Pieces from './Pieces';


function Column(props) {

    return (
        <div className={"column col-" + props.number.toString()} onMouseEnter={props.hovers} onClick={props.clicks}>

            <Pieces emptyCell={props.toppers}/>
            <div className="slots empty"></div>
            <div className="slots empty"></div>
            <div className="slots empty"></div>
            <div className="slots empty"></div>
            <div className="slots empty"></div>
            <div className="slots empty"></div>

        </div>
    )
}


export default Column;