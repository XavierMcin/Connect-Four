import React from 'react';
import Column from './Column';



class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            currentColumn: "",
            vertical: "",
            playerTurn: true,
            currentPiece: "",
            piecePosition: ""
        }
        this.findColumn = this.findColumn.bind(this);
        this.clicker = this.clicker.bind(this);
        this.findPiece = this.findPiece.bind(this);
        this.findVertical = this.findVertical.bind(this);
        this.onHovers = this.onHovers.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.switchPlayer = this.switchPlayer.bind(this);
    }


    findColumn(elem) {
        this.setState({
            currentColumn: elem.currentTarget.childNodes
        });
    }

    findEmpty() {
        if (this.state.currentColumn !== undefined) {
            let i = this.state.currentColumn.length - 1;
            let j = 0;
            while (i >= j) {
                if (this.state.currentColumn[i].className.includes('empty')) {
                    this.findPiece(this.state.currentColumn[i]);
                    this.findVertical(this.state.currentColumn[i]);
                    break;
                }
                i--;
            }
        }
    }

    findPiece(elem) {
        this.setState({
            currentPiece: elem
        });
    }

    findVertical(elem) {
        let position = elem.getBoundingClientRect();
        this.setState({
            vertical: position.top
        });
    }

    switchPlayer(elem) {
        this.setState({
            playerTurn: !this.state.playerTurn
        });
        let oneTurn = elem.currentTarget.firstChild.firstChild;
        let twoTurn = elem.currentTarget.firstChild.lastChild;
        if (this.state.playerTurn === true) {
            oneTurn.style.zIndex = 1;
            twoTurn.style.zIndex = 0;
        } else {
            oneTurn.style.zIndex = 0;
            twoTurn.style.zIndex = 1;
        }
        console.log(elem);
    }

    movePiece(elem) {
        if (this.state.playerTurn === true) {
            let onePiece = elem.currentTarget.firstChild.firstChild.childNodes;
            let pieceLength = onePiece.length - 1;
            let i = 0;
            while (i < pieceLength) {
                if (onePiece[pieceLength].className.includes('up')) {
                    onePiece[pieceLength].classList.remove('up');
                    onePiece[pieceLength].classList.add('down');
                    onePiece[pieceLength].style.top = (this.state.position) + 'px';
                    onePiece[pieceLength].style.opacity = 1;
                    break;
                }
                pieceLength--;
            }
        } else {
            let twoPiece = elem.currentTarget.firstChild.lastChild.childNodes;
            let pieceLengthTwo = twoPiece.length - 1;
            let i = 0;
            while (i < pieceLengthTwo) {
                if (twoPiece[pieceLengthTwo].className.includes('up')) {
                    twoPiece[pieceLengthTwo].classList.remove('up');
                    twoPiece[pieceLengthTwo].classList.add('down');
                    twoPiece[pieceLengthTwo].style.top = (this.state.position) + 'px';
                    twoPiece[pieceLengthTwo].style.opacity = 1;
                    break;
                }
                pieceLengthTwo--;
            }
        }
        // this.state.currentPiece.classList.remove('empty');
        // this.state.currentPiece.classList.add('taken');
    }

    onHovers(elem) {
        this.findColumn(elem);
        this.findEmpty();
    }

    clicker(elem) {
        this.movePiece(elem);
        this.switchPlayer(elem);
    }


    render() {

        let slots = new Array(7).fill(1).map((curr, index) => <Column key={index} number={index + 1} hovers={this.onHovers} clicks={this.clicker}/>);



        return (
            <div className="game-wrapper">

                <div id="board">

                    <div id="blocker"></div>

                    {slots}

                </div>

            </div>
        )
    }
}



export default Board;