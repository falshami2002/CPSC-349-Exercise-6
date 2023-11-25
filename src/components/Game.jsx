import '../index.css';
import { useState } from 'react';

const Square = (props) => {
    const [value, setValue] = useState('');

    function handleClick() {
        setValue('X');
    }

    return <button className="square" onClick={props.onSquareClick}>{props.value}</button>;
}

const Board = ({ squares, xIsNext, onPlay }) => {

    function onSquareClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        if (xIsNext) {
            newSquares[i] = "X";
        } else {
            newSquares[i] = "O";
        }
        onPlay(newSquares);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="squares-container">
                <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
                <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
                <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
                <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
                <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
                <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
            </div>
        </>

    )
}

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;