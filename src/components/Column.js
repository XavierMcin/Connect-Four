import React from 'react';
import Pieces from './Pieces';


function Column(props) {

    return (
        <div className={"column col-" + props.number.toString()} onMouseEnter={props.elem}>

            <Pieces />
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