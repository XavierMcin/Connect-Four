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

                <div className="left">

                    <div>

                        <button>New Game</button>
                        <h2>About</h2>
                        <h2>GitHub</h2>

                    </div>

                </div>

                <Board />

                <div className="right">

                    <div>

                        <div className="rematch">
                            <h2>Rematch ?</h2>
                            <div>
                                <button>Yes</button>
                                <button>No</button>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        )
    }
}



export default Game;