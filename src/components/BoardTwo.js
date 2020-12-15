import React from 'react';


class NewBoard extends React.Component {
    super();
    constructor() {
        this.state = {
            player1: 1,
            player2: 2,
            currentPlayer: null,
            gameBoard: [],
            gameStatus: true,
            gameMessage: ''
        }
    }

    emptyBoard() {
        let board = [];
        for (let i = 0; i < 6; i++) {
            let row = [];
            for (let x = 0; x < 7; x++) { row.push(null) }
            board.push(row);
        }

        this.setState({
            board,
            currentPlayer: this.state.player1
        });
    }



}




export default NewBoard;