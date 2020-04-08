import React from 'react';
import Column from './Column';


class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            columnClass: "",
            vertical: 0
        }
        this.findClass = this.findClass.bind(this);
        this.clicker = this.clicker.bind(this);
        this.findVertical = this.findVertical.bind(this);
    }

    findClass(elem) {
        this.setState({
            columnClass: elem.target
        });
        console.log(this.state.columnClass)
    }

    findEmpty() {
        if (this.state.columnClass !== undefined) {
            let i = this.state.columnClass.length - 1;
            let j = 0;
            while (i >= j) {
                if (this.state.columnClass[i].className.includes('empty')) {
                    this.state.columnClass[i].classList.remove('empty');
                    this.state.columnClass[i].classList.add('taken');
                    this.findVertical(this.state.columnClass[i]);
                    break;
                }
                i--;
            }
        }
    }

    findVertical(elem) {
        let position = elem.getBoundingClientRect();
        this.setState({
            vertical: position.top
        });
    }

    clicker(elem) {
        if (this === undefined) {
            console.log('nothing');
        } else {
            this.findClass(elem);
            this.findEmpty();
            console.log(this.state.vertical);
        }
    }


    render() {

        let slots = new Array(7).fill(1).map((curr, index) => <Column key={index} number={index + 1} elem={this.findClass}/>);



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