import React from 'react';
import Pieces from './Pieces';


function Column(props) {

    return (
        <div className={"column col-" + props.number.toString()} onClick={props.clicks} data-column={props.number}>

            <Pieces />
            <div className="slots empty" data-key={1}></div>
            <div className="slots empty" data-key={2}></div>
            <div className="slots empty" data-key={3}></div>
            <div className="slots empty" data-key={4}></div>
            <div className="slots empty" data-key={5}></div>
            <div className="slots empty" data-key={6}></div>

        </div>
    )
}


export default Column;