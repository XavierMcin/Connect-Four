import React from 'react';


class Players extends React.Component {
    constructor() {
        super();
        this.state = {
            playerOne: "Player One",
            playerTwo: "Player Two",
            bWins: 0,
            bLosses: 0,
            rWins: 0,
            rLosses: 0,
            ties: 0
        }

        this.records = this.records.bind(this);
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

    records() {
        let redRecord = document.getElementsByClassName('rWins')[0],
            blueRecord = document.getElementsByClassName('bWins')[0];

        // if (redRecord.className.includes('win')) {
        //     let newRCount = this.state.rWins + 1,
        //         newBCount = this.state.bLosses + 1;
        //     this.setState({
        //         rWins: newRCount,
        //         bLosses: newBCount
        //     });
        // } else if (blueRecord.className.includes('win')) {

        // } else if (redRecord.className.includes('tie')) {

        // }
        console.log(redRecord);
    }


    render() {

        this.records();

        // if (this.state.playerOne === 'Player One') {
        //     this.playerNames();
        // }


        return (
            
            <section id="player-info">

                <div className="player player1">
                    <div className="name">
                        <h2 name="playerOne">{this.state.playerOne}</h2>
                    </div>
                    <div className="record">

                        <div>
                            <span className="rWins">Wins</span>
                            <span className="rLosses">Losses</span>
                            <span className="rTies">Ties</span>
                        </div>

                        <div>
                            <span>{this.state.rWins}</span>
                            <span>{this.state.rLosses}</span>
                            <span>{this.state.ties}</span>
                        </div>
                    </div>
                </div>

                <div className="banner"></div>

                <div className="player player2">
                    <div className="name">
                        <h2 name="playerTwo">{this.state.playerTwo}</h2>
                    </div>
                    <div className="record">

                        <div>
                            <span className="bWins">Wins</span>
                            <span className="bLosses">Losses</span>
                            <span className="bTies">Ties</span>
                        </div>

                        <div>
                            <span>{this.state.bWins}</span>
                            <span>{this.state.bLosses}</span>
                            <span>{this.state.ties}</span>
                        </div>
                    </div>
                    {/* <span>{this.state.twoRecord}</span> */}
                </div>

            </section>
        )
    }
}


export default Players;