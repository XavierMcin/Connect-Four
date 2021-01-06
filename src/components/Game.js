import React from 'react';
import Board from './Board';


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            newClick: false,
            nButton: true,
            start: false,
            bHolder: ""
        }
        this.clearBoard = this.clearBoard.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    clearBoard(elem) {
        let newButton = elem.currentTarget;
        let rematchButton = (document.getElementsByClassName('rematch'))[0];
        if (!(rematchButton.className.includes('block'))) {
            rematchButton.classList.add('block');
        } 

        console.log(typeof rematchButton);
        
        this.setState({
            start: false,
            newClick: true,
            nButton: newButton
        })

    } 

    startGame(elem) {
        this.setState({
            start: true,
            newClick: false,
            bHolder: elem.currentTarget
        })
    }

    

    render() {

        

        return (
            <section id="connect-game">

                <div className="left">

                    <div>

                        <button onClick={this.clearBoard}>New Game</button>
                        <h2>About</h2>
                        <h2>GitHub</h2>

                    </div>

                </div>

                <Board newgame={this.state.newClick} buttonBool={this.state.nButton} starter={this.state.start} buttonHold={this.state.bHolder}/>

                <div className="right">

                    <div>

                        <div className="rematch block">
                            <h2>Rematch ?</h2>
                            <div>
                                <button onClick={this.clearBoard}>Yes</button>
                                <button>No</button>
                            </div>
                        </div>

                        <div className="startGame">
                            <button onClick={this.startGame}>Start Game</button>
                        </div>

                    </div>

                </div>

            </section>
        )
    }
}



export default Game;