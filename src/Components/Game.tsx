import React from "react";
import Board from "./Board";
import Rules from "../Utils/Rules";
import {Squares} from "../Data/Squares";

interface GameProps {
}

interface GameStates {
    history: Squares[];
    stepNumber: number;
    xIsNext: Boolean;
}

class Game extends React.Component<GameProps, GameStates> {

    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    private handleClick(i: number): void {
        const boardHistory: Squares[] = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentBoard: Squares = boardHistory[boardHistory.length - 1];
        const squares = currentBoard.squares.slice();

        if (Rules.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";

        const history: Squares[] = boardHistory.concat([
            {squares}
        ]);
        const stepNumber: number = boardHistory.length;
        const xIsNext: Boolean =  !this.state.xIsNext;
        this.setState({history, stepNumber, xIsNext});
    }

    private jumpTo(stepNumber: number): void {
        const xIsNext: Boolean = (stepNumber % 2) === 0;
        this.setState({stepNumber, xIsNext});
    }

    public render(): JSX.Element {
        const boardHistory: Squares[] = this.state.history;
        const currentBoard: Squares = boardHistory[this.state.stepNumber];
        const winner: string | null = Rules.calculateWinner(currentBoard.squares);

        const moves: JSX.Element[] = boardHistory.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status: string;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={currentBoard.squares}
                        onClick={(i: number) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }


}

export default Game;