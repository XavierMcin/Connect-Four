import React from 'react';


function Pieces() {
    return (
        <div className="pieces" onMouseOver={(e) => e.stopPropagation()}>

            <div className="playerOne">
                <span className="red"></span>
                <span className="red"></span>
                <span className="red"></span>
                <span className="red"></span>
                <span className="red"></span>
                <span className="red"></span>
            </div>

            <div className="playerTwo">
                <span className="blue"></span>
                <span className="blue"></span>
                <span className="blue"></span>
                <span className="blue"></span>
                <span className="blue"></span>
                <span className="blue"></span>
            </div>

        </div>
    )
}


export default Pieces;