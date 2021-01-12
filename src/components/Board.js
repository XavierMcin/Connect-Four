import React from 'react';
import Column from './Column';

let twoBoard = [[0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0]];
let tie = 0,
    stopGame = false,
    gameHolder,
    playerTurn = true,
    redWin = 1,
    blueWin = 0;


class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            pTurn: true
        }
        this.clicker = this.clicker.bind(this);
        this.switchPlayer = this.switchPlayer.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
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
            // console.log(elem.currentTarget);

        if (holderSpot === false && holderPosition === false) {
            return null;
        } else {
            if (playerTurn) {
                for(let i = 1; i < 8; i++) {
                    let oneTurn = elem.currentTarget.parentElement.children[i].firstChild.firstChild;
                    let twoTurn = elem.currentTarget.parentElement.children[i].firstChild.lastChild;
                    oneTurn.style.zIndex = 0;
                    twoTurn.style.zIndex = 1;
                }
    
                playerTurn = false;
            } else {
                for(let i = 1; i < 8; i++) {
                    let oneTurn = elem.currentTarget.parentElement.children[i].firstChild.firstChild;
                    let twoTurn = elem.currentTarget.parentElement.children[i].firstChild.lastChild;
                    oneTurn.style.zIndex = 1;
                    twoTurn.style.zIndex = 0;
                }
    
                playerTurn = true;
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
            if (playerTurn) {
                twoBoard[holderColumn][holderTaken] = 1;
                let onePiece = elem.currentTarget.firstChild.firstChild.childNodes;
                let pieceLength = onePiece.length - 1;
                let i = 0;
    
                while (i <= pieceLength) {
                    if (onePiece[pieceLength].className.includes('up')) {
                        onePiece[pieceLength].classList.remove('up');
                        onePiece[pieceLength].classList.add('down');
                        onePiece[pieceLength].style.top = (holderPosition) + 'px';
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

        hide.forEach((curr) => {
            curr.classList.remove('up');
            curr.classList.add('hide');
        });
        // console.log(hide[1]);
    }

    resetBoard() {

        if (this.props.newgame) {
            twoBoard = [[0,0,0,0,0,0],
                        [0,0,0,0,0,0],
                        [0,0,0,0,0,0],
                        [0,0,0,0,0,0],
                        [0,0,0,0,0,0],
                        [0,0,0,0,0,0],
                        [0,0,0,0,0,0]];

            let rWinner = document.getElementsByClassName('rWins')[0],
                bWinner = document.getElementsByClassName('bWins')[0],
                sButton = (this.props.buttonHold).parentElement,
                resetPlayer = Array.from(document.getElementsByClassName('pieces'));

            sButton.classList.remove('block');
            stopGame = true;

            if (rWinner.className.includes('win')) {
                rWinner.classList.remove('win');
            } else if (bWinner.className.includes('win')) {
                bWinner.classList.remove('win');
            } else if (rWinner.className.includes('tie')) {
                rWinner.classList.remove('tie');
            }
            
            if (redWin === 1) {
                resetPlayer.forEach((curr) => {
                    curr.firstChild.style.zIndex = 1;
                    curr.lastChild.style.zIndex = 0;
                    console.log(curr);
                });
                playerTurn = true;
            } else if (blueWin === 1) {
                resetPlayer.forEach((curr) => {
                    curr.lastChild.style.zIndex = 1;
                    curr.firstChild.style.zIndex = 0;
                });
                playerTurn = false;
            }

            resetPlayer.forEach((curr) => {
                curr.firstChild.style.zIndex = 1
            });


            gameHolder.forEach((curr) => {
                if (curr.id === 'blocker') {
                    return ''
                } else {
                    let firstPieces = Array.from(curr.firstChild.firstChild.children),
                        secondPieces = Array.from(curr.firstChild.lastChild.children),
                        finalPieces = firstPieces.concat(secondPieces),
                        slots = Array.from(curr.children);

                    slots.forEach((curr) => {
                        if (curr.className.includes('slots')) {
                            finalPieces.push(curr);
                        }
                    });

                    finalPieces.forEach((curr) => {
                        if (curr.className.includes('down')) {
                            curr.classList.remove('down');
                            curr.classList.add('up');
                            curr.style.top = 0 + 'px';
                        } else if (curr.className.includes('hide')) {
                            curr.classList.remove('hide');
                            curr.classList.add('up');
                        } else if (curr.className.includes('taken')) {
                            curr.classList.remove('taken');
                            curr.classList.add('empty');
                        }
                    });

                    

                    // console.log(finalPieces);
                    // console.log(twoBoard);
                }
            });
        };
        
    }

    starter() {
        if (this.props.starter) {
            stopGame = false;
            gameHolder = Array.from((this.props.buttonHold).parentElement.parentElement.parentElement.previousSibling.firstChild.children);
            let sButton = (this.props.buttonHold).parentElement;
            sButton.classList.add('block');
        } else if (!this.props.starter) {
            stopGame = true;
        }
    }
    

    clicker(elem) {

        if (!stopGame) {
            // console.log(this.props.buttonHold);
            this.movePiece(elem);
            this.switchPlayer(elem);
            let final = this.checkWinner(twoBoard);
            let rWinner = document.getElementsByClassName('rWins')[0];
            let bWinner = document.getElementsByClassName('bWins')[0];

            if (final === 'redWin') {
                stopGame = true;
                setTimeout(() => {alert('Red Wins The Game!')},300);
                let rButton = (this.props.buttonHold).parentElement.previousSibling;
                rButton.classList.remove('block');
                redWin = 1;
                blueWin = 0;
                rWinner.classList.add('win');
            } else if (final === 'blueWin') {
                stopGame = true;
                setTimeout(() => {alert('Blue Wins The Game!')},300);
                let rButton = (this.props.buttonHold).parentElement.previousSibling;
                rButton.classList.remove('block');
                redWin = 0;
                blueWin = 1;
                bWinner.classList.add('win');
            } else if (final === 'Tie') {
                stopGame = true;
                setTimeout(() => {alert('Tie Game!')},300);
                let rButton = (this.props.buttonHold).parentElement.previousSibling;
                rButton.classList.remove('block');
                rWinner.classList.add('tie');
            }
        }
        console.log(stopGame);
    }


    render() {

        let slots = new Array(7).fill(1).map((curr, index) => <Column key={index} number={index + 1} clicks={this.clicker} topper={this.state.vertical} />);
        this.resetBoard();
        this.starter();
        


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