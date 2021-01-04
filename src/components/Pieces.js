import React from 'react';


function Pieces(props) {

    return (
        <div className="pieces hide">

            <div className="playerOne">
                <span className="red up" top={props.emptyCell}></span>
                <span className="red up" top={props.emptyCell}></span>
                <span className="red up" top={props.emptyCell}></span>
                <span className="red up" top={props.emptyCell}></span>
                <span className="red up" top={props.emptyCell}></span>
                <span className="red up" top={props.emptyCell}></span>
            </div>

            <div className="playerTwo">
                <span className="blue up"></span>
                <span className="blue up"></span>
                <span className="blue up"></span>
                <span className="blue up"></span>
                <span className="blue up"></span>
                <span className="blue up"></span>
            </div>

        </div>
    )
}


export default Pieces;