import React from 'react';
import Column from './Column';



class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            currentColumn: "",
            vertical: 0,
            playerTurn: true,
            currentSpot: "",
            piecePosition: ""
        }
        this.findColumn = this.findColumn.bind(this);
        this.clicker = this.clicker.bind(this);
        this.findSpot = this.findSpot.bind(this);
        this.findVertical = this.findVertical.bind(this);
        this.onHovers = this.onHovers.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.switchPlayer = this.switchPlayer.bind(this);
    }

    

    findColumn(elem) {
        // this.setState({
        //     currentColumn: elem.currentTarget
        // }, () => {
        //     this.vertical = this.state.currentColumn;
        // });
        let activeColumn;
        activeColumn = Array.from(elem.currentTarget.children);
        
        let emptyCell = this.findEmpty(activeColumn);
        // console.log(activeColumn);
        return [activeColumn,emptyCell];
    }

    findEmpty(column) {
        let activeElement,
            elementPosition;
        if (column !== undefined) {
            let i = column.length - 1;
            let j = 0;
            while (i >= j) {
                if (column[i].className.includes('empty')) {
                    activeElement = this.findSpot(column[i]);
                    elementPosition = this.findVertical(column[i]);
                    break;
                } else if (i < 1 && column[i].className.includes('empty') === false) {
                    activeElement = false;
                    elementPosition = false;
                    break;
                }
                i--;
            }
            return [activeElement,elementPosition];
        }
    }

    findSpot(elem) {
        // this.setState({
        //     currentSpot: elem
        // });
        return elem;
    }

    findVertical(elem) {
        let position = elem.getBoundingClientRect();

        return position.top;
        // this.setState({
        //     vertical: position.top - 77
        // }, () => {
        //     // console.log(this.state.vertical);
        // });
    }

    switchPlayer(elem) {
        // let tester = elem.currentTarget.parentElement.children[1].firstChild.firstChild;
        // let oneTurn = elem.currentTarget.firstChild.firstChild;
        // let twoTurn = elem.currentTarget.firstChild.lastChild;
        if (this.state.playerTurn === true) {
            for(let i = 1; i < 8; i++) {
                let oneTurn = elem.currentTarget.parentElement.children[i].firstChild.firstChild;
                let twoTurn = elem.currentTarget.parentElement.children[i].firstChild.lastChild;
                oneTurn.style.zIndex = 0;
                twoTurn.style.zIndex = 1;
            }

            this.setState({
                playerTurn: !this.state.playerTurn
            });
        } else {
            for(let i = 1; i < 8; i++) {
                let oneTurn = elem.currentTarget.parentElement.children[i].firstChild.firstChild;
                let twoTurn = elem.currentTarget.parentElement.children[i].firstChild.lastChild;
                oneTurn.style.zIndex = 1;
                twoTurn.style.zIndex = 0;
            }

            this.setState({
                playerTurn: !this.state.playerTurn
            });
        }
        // console.log(tester);
    }

    

    movePiece(elem) {
        let holder = this.findColumn(elem),
            holderSpot = holder[1][0],
            holderPosition = holder[1][1];
            console.log(holderPosition);
        if (this.state.playerTurn === true) {
            let onePiece = elem.currentTarget.firstChild.firstChild.childNodes;
            let pieceLength = onePiece.length - 1;
            let i = 0;

            while (i < pieceLength) {
                if (onePiece[pieceLength].className.includes('up')) {
                    onePiece[pieceLength].classList.remove('up');
                    onePiece[pieceLength].classList.add('down');
                    onePiece[pieceLength].style.top = (holderPosition - 77) + 'px';
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
                    twoPiece[pieceLengthTwo].style.top = (holderPosition - 77) + 'px';
                    twoPiece[pieceLengthTwo].style.opacity = 1;
                    break;
                }
                pieceLengthTwo--;
            }
        }
        holderSpot.classList.remove('empty');
        holderSpot.classList.add('taken');
    }

    onHovers(elem) {
        this.findColumn(elem);
        // console.log(this.state.vertical);
    }

    clicker(elem) {
        this.movePiece(elem);
        this.switchPlayer(elem);
    }


    render() {

        let slots = new Array(7).fill(1).map((curr, index) => <Column key={index} number={index + 1} hovers={this.onHovers} clicks={this.clicker} topper={this.state.vertical}/>);

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