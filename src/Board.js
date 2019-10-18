import React from "react"
import './index.css';
import Square from "./Square.js"

class Board extends React.Component {
renderSquare(i) {
   const className = this.props.squares[i] === 'X' ? "color-red" : "color-blue";	
   console.log({className});
	return <Square
		className= {className}
		value={this.props.squares[i]}
		onClick={()=> this.props.onClick(i)}
		raw={1}
		col={1}
	/>;

}

render() {
   return (
		<div>
			<div className="board-row">
				{this.renderSquare(0)}
				{this.renderSquare(1)}
				{this.renderSquare(2)}
			</div>
			<div className="board-row">
				{this.renderSquare(3)}
				{this.renderSquare(4)}
				{this.renderSquare(5)}
			</div>
			<div className="board-row">
				{this.renderSquare(6)}
				{this.renderSquare(7)}
				{this.renderSquare(8)}
			</div>
		</div>
    );
  }
}


export default Board