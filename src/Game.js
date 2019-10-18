import React from 'react';
import './index.css';
import calculateWinner from "./calculateWinner.js";
import Board from "./Board.js"


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{squares: Array(9).fill(null),}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
				clickIndex: i,
				}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}
		
	jumpTo(step){
		this.setState({stepNumber: step, xIsNext: (step % 2) === 0,});
	}

    render() {
	const history = this.state.history;
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);
	const moves = history.map((step, move) => {
		const colPos = step.clickIndex % 3;
		const rawPos = Math.floor(step.clickIndex / 3);
		const position = 'Col ' + colPos +', ' + "Raw " + rawPos;
		const desc = move ? 'Перейти к ходу #' + move +' '+ position  : 'К началу игры';

		return (
		<li key={{move}}>
			<button onClick={() => this.jumpTo(move)}>
			{move === this.state.stepNumber ? <b>{desc}</b> : desc}</button>
		</li>
		);
	});

	let status;
	if(winner){
		status ='Победитель ' + winner;
	}else if(history.length -1 ===9 ){
		status = 'Ничья'
		} else {status ='Next player ' + (this.state.xIsNext ? 'X' : 'O');
		   }
   return (
	<div className="game">
         <div className="game-board">
			<Board 
		      squares={current.squares}
		      onClick={(i) => this.handleClick(i)}
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
 
export default Game