import React from 'react';


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

                <div id="board"></div>

                <div className="right"></div>

            </section>
        )
    }
}



export default Game;