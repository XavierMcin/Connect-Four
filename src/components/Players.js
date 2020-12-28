import React from 'react';


class Players extends React.Component {
    constructor() {
        super();
        this.state = {
            playerOne: "Player One",
            playerTwo: "Player Two",
            oneRecord: "0 - 0",
            twoRecord: "0 - 0"
        }
    }

    playerNames() {
        setTimeout(() => {
            let name1 = prompt('Enter Player One Name');
            let name2 = prompt('Enter Player Two Name');

            this.setState({
                playerOne: name1,
                playerTwo: name2
            })
        },1000);
    }


    render() {


        // if (this.state.playerOne === 'Player One') {
        //     this.playerNames();
        // }


        return (
            
            <section id="player-info">

                <div className="player player1">
                    <div><h2 name="playerOne">{this.state.playerOne}</h2></div>
                    <span>{this.state.oneRecord}</span>
                </div>

                <div className="banner"></div>

                <div className="player player2">
                    <div><h2 name="playerTwo">{this.state.playerTwo}</h2></div>
                    <span>{this.state.twoRecord}</span>
                </div>

            </section>
        )
    }
}


export default Players;