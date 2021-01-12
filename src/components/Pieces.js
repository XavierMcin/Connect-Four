import React from 'react';


function Pieces(props) {

    return (
        <div className="pieces">

            <div className="playerOne">
                <span className="red up" top={0}></span>
                <span className="red up" top={0}></span>
                <span className="red up" top={0}></span>
                <span className="red up" top={0}></span>
                <span className="red up" top={0}></span>
                <span className="red up" top={0}></span>
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