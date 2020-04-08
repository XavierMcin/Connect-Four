import React from 'react';
import Board from './Board';


class Game extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <section id="connect-game">

                <div className="left"></div>

                <Board />

                <div className="right"></div>

            </section>
        )
    }
}



export default Game;