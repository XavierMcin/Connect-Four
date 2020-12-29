import React from 'react';
import Column from './Column';

let twoBoard = [[0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0]];
let tie = 0;

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            currentColumn: "",
            vertical: 0,
            playerTurn: true,
            currentSpot: "",
            piecePosition: "",
        }
        this.findColumn = this.findColumn.bind(this);
        this.clicker = this.clicker.bind(this);
        this.findSpot = this.findSpot.bind(this);
        this.findVertical = this.findVertical.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.switchPlayer = this.switchPlayer.bind(this);
    }
    

    findColumn(elem) {
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
        let columnKey = elem.parentElement.dataset.column;
        let slotKey = elem.dataset.key;

        return [elem,columnKey,slotKey];
    }

    findVertical(elem) {
        let position = elem.offsetTop;
        return position;
    }

    switchPlayer(elem) {
        let holder = this.findColumn(elem),
            holderSpot = holder[1][0],
            holderPosition = holder[1][1];
            // console.log(holderPosition);

        if (holderSpot === false && holderPosition === false) {
            return null;
        } else {
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
        }
        // console.log(tester);
    }

    checkVertical(arr) {

        let vertCheck = arr.map((curr,index) => {

            let red = 0,
                blue = 0;

            for (let i = 0; i < curr.length; i++) {
                if (red === 4 || blue === 4) {break}

                if (curr[i] === 1 && blue === 0) {
                    red++;
                } else if (curr[i] === 2 && red === 0) {
                    blue++;
                } else if (curr[i] === 1 && blue > 0) {
                    blue = 0;
                    red++;
                } else if (curr[i] === 2 && red > 0) {
                    red = 0;
                    blue++;
                }
            }

            if (red === 4) {return 'redWin';}
            else if (blue === 4) {return 'blueWin';}
            else {return null;}

        });
        if (vertCheck.includes('redWin')) {
            let x = vertCheck.indexOf('redWin');
            return vertCheck[x];
        } else if (vertCheck.includes('blueWin')) {
            let x = vertCheck.indexOf('blueWin');
            return vertCheck[x];
        } else {
            return vertCheck;
        }
    }

    checkHorizontal(arr) {

        let horiArr = [];

        for (let i = 0; i < arr[0].length; i++) {
            let horiRed = 0,
                horiBlue = 0;
            for (let x = 0; x < arr.length; x++) {

                if (horiRed === 4 || horiBlue === 4) {break}
                if (arr[x][i] === 0) {horiRed = 0; horiBlue = 0}

                if (arr[x][i] === 1 && horiBlue === 0) {
                    horiRed++;
                } else if (arr[x][i] === 2 && horiRed === 0) {
                    horiBlue++;
                } else if (arr[x][i] === 1 && horiBlue > 0) {
                    horiBlue = 0;
                    horiRed++;
                } else if (arr[x][i] === 2 && horiRed > 0) {
                    horiRed = 0;
                    horiBlue++;
                }

            }
            if (horiRed === 4) {horiArr.push('redWin'); break;}
            else if (horiBlue === 4) {horiArr.push('blueWin'); break;}
        }
        return horiArr[0];
    }

    checkLeftDiagonal(arr) {

        let diaArr = [],
            bottom = 5;

        for (let i = 0; i < 4; i++) {

            if (i === 0) {
                for (let x = 3; x < arr[i].length; x++) {
                    let diaHold = x,
                        diaInc = x,
                        diaRed = 0,
                        diaBlue = 0;
                    for (let y = 0; y <= diaHold; y++) {

                        if (diaRed === 4 || diaBlue === 4) {break}
                        if (arr[y][diaInc] === 0) {diaRed = 0; diaBlue = 0}

                        if (arr[y][diaInc] === 1 && diaBlue === 0) {
                            diaRed++;
                        } else if (arr[y][diaInc] === 2 && diaRed === 0) {
                            diaBlue++;
                        } else if (arr[y][diaInc] === 1 && diaBlue > 0) {
                            diaBlue = 0;
                            diaRed++;
                        } else if (arr[y][diaInc] === 2 && diaRed > 0) {
                            diaRed = 0;
                            diaBlue++;
                        }

                        diaInc--;
                    }
                    if (diaRed === 4) {diaArr.push('redWin'); break;}
                    else if (diaBlue === 4) {diaArr.push('blueWin'); break;}
                }
            } else {
                let diaInc = bottom,
                diaRed = 0,
                diaBlue = 0;
                for (let y = i; y < arr.length; y++) {

                    if (diaRed === 4 || diaBlue === 4) {break}
                    if (arr[y][diaInc] === 0) {diaRed = 0; diaBlue = 0}

                    if (arr[y][diaInc] === 1 && diaBlue === 0) {
                        diaRed++;
                    } else if (arr[y][diaInc] === 2 && diaRed === 0) {
                        diaBlue++;
                    } else if (arr[y][diaInc] === 1 && diaBlue > 0) {
                        diaBlue = 0;
                        diaRed++;
                    } else if (arr[y][diaInc] === 2 && diaRed > 0) {
                        diaRed = 0;
                        diaBlue++;
                    }

                    diaInc--;
                }
                if (diaRed === 4) {diaArr.push('redWin'); break;}
                else if (diaBlue === 4) {diaArr.push('blueWin'); break;}
            }

            
        }
        return diaArr[0];
    }

    checkRightDiagonal(arr) {

        let diaArr = [],
            bottom = 5,
            rightBlock = 3;

        for (let i = 6; i > 2; i--) {

            if (i === 6) {
                for (let x = 3; x < arr[i].length; x++) {
                    let diaInc = x,
                        diaRed = 0,
                        diaBlue = 0;
                    for (let y = 6; y >= rightBlock; y--) {

                        if (diaRed === 4 || diaBlue === 4) {break}
                        if (arr[y][diaInc] === 0) {diaRed = 0; diaBlue = 0}

                        if (arr[y][diaInc] === 1 && diaBlue === 0) {
                            diaRed++;
                        } else if (arr[y][diaInc] === 2 && diaRed === 0) {
                            diaBlue++;
                        } else if (arr[y][diaInc] === 1 && diaBlue > 0) {
                            diaBlue = 0;
                            diaRed++;
                        } else if (arr[y][diaInc] === 2 && diaRed > 0) {
                            diaRed = 0;
                            diaBlue++;
                        }

                        diaInc--;
                    }
                    rightBlock--;
                    if (diaRed === 4) {diaArr.push('redWin'); break;}
                    else if (diaBlue === 4) {diaArr.push('blueWin'); break;}
                }
            } else {

                let diaInc = bottom,
                diaRed = 0,
                diaBlue = 0;
                for (let y = i; y >= 0; y--) {

                    if (diaRed === 4 || diaBlue === 4) {break}
                    if (arr[y][diaInc] === 0) {diaRed = 0; diaBlue = 0}

                    if (arr[y][diaInc] === 1 && diaBlue === 0) {
                        diaRed++;
                    } else if (arr[y][diaInc] === 2 && diaRed === 0) {
                        diaBlue++;
                    } else if (arr[y][diaInc] === 1 && diaBlue > 0) {
                        diaBlue = 0;
                        diaRed++;
                    } else if (arr[y][diaInc] === 2 && diaRed > 0) {
                        diaRed = 0;
                        diaBlue++;
                    }

                    diaInc--;
                }
                if (diaRed === 4) {diaArr.push('redWin'); break;}
                else if (diaBlue === 4) {diaArr.push('blueWin'); break;}
            }
            
        }
        return diaArr[0];
    }

    checkWinner(arr) {
        let vertWin = this.checkVertical(arr);
        let horiWin = this.checkHorizontal(arr);
        let lWin = this.checkLeftDiagonal(arr);
        let rWin = this.checkRightDiagonal(arr);
        if (vertWin === 'blueWin' || vertWin === 'redWin') {return vertWin}
        else if (horiWin === 'blueWin' || horiWin === 'redWin') {return horiWin}
        else if (lWin === 'blueWin' || lWin === 'redWin') {return lWin}
        else if (rWin === 'blueWin' || rWin === 'redWin') {return rWin}
        else if (tie === 42) {return "Tie"}
        else {return null}
    }

    movePiece(elem) {

        let holder = this.findColumn(elem),
            holderSpot = holder[1][0][0],
            holderPosition = holder[1][1],
            holderColumn = parseInt(holder[1][0][1]) - 1,
            holderTaken = parseInt(holder[1][0][2]) - 1;
            

        if (holderPosition === false) {
            return null;
        } else {
            if (this.state.playerTurn === true) {
                twoBoard[holderColumn][holderTaken] = 1;
                let onePiece = elem.currentTarget.firstChild.firstChild.childNodes;
                let pieceLength = onePiece.length - 1;
                let i = 0;
    
                while (i <= pieceLength) {
                    if (onePiece[pieceLength].className.includes('up')) {
                        onePiece[pieceLength].classList.remove('up');
                        onePiece[pieceLength].classList.add('down');
                        onePiece[pieceLength].style.top = (holderPosition) + 'px';
                        onePiece[pieceLength].style.opacity = 1;
                        break;
                    }
                    pieceLength--;
                }
                if (holder[0].indexOf(holderSpot) === 1) {this.disableBoard(elem)}
            } else {
                twoBoard[holderColumn][holderTaken] = 2;
                let twoPiece = elem.currentTarget.firstChild.lastChild.childNodes;
                let pieceLengthTwo = twoPiece.length - 1;
                let i = 0;
                while (i <= pieceLengthTwo) {
                    if (twoPiece[pieceLengthTwo].className.includes('up')) {
                        twoPiece[pieceLengthTwo].classList.remove('up');
                        twoPiece[pieceLengthTwo].classList.add('down');
                        twoPiece[pieceLengthTwo].style.top = (holderPosition) + 'px';
                        twoPiece[pieceLengthTwo].style.opacity = 1;
                        break;
                    }
                    pieceLengthTwo--;
                }
                if (holder[0].indexOf(holderSpot) === 1) {this.disableBoard(elem)}
            }
            holderSpot.classList.remove('empty');
            holderSpot.classList.add('taken');
            tie++;
        }

    }

    disableBoard(elem) {
        let redPieces = Array.from(elem.currentTarget.firstChild.firstChild.children);
        let bluePieces = Array.from(elem.currentTarget.firstChild.lastChild.children);
        let hide = [];

        redPieces.forEach((curr) => {if (curr.className.includes('up')) {hide.push(curr)}});
        bluePieces.forEach((curr) => {if (curr.className.includes('up')) {hide.push(curr)}});

        hide.forEach((curr) => {curr.style.visibility = 'hidden'});
    }

    resetBoard() {
        twoBoard = [[0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0]];
        
    }

    clicker(elem) {
        this.switchPlayer(elem);
        this.movePiece(elem);
        let final = this.checkWinner(twoBoard);
        if (final === 'redWin') {setTimeout(() => {alert('Red Wins The Game!')},300)}
        else if (final === 'blueWin') {setTimeout(() => {alert('Blue Wins The Game!')},300)}
        else if (final === 'Tie') {
            setTimeout(() => {alert('Tie Game!')},300);
        }
        
    }


    render() {

        let slots = new Array(7).fill(1).map((curr, index) => <Column key={index} number={index + 1} clicks={this.clicker} topper={this.state.vertical}/>);

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