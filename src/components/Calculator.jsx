import '../index.css';
import { useState } from 'react';

const Calculator = () => {
    const [equation, setEquation] = useState("");
    const operators = ['+', '-', '/', 'x'];

    function handleClick(val) {
        if(val === 'C') {
            setEquation("");
            return;
        }
        if(val === '=') {
            evaluate();
            return;
        }
        if(operators.includes(val) && operators.includes(equation.at(equation.length - 1))) {
            return;
        }
        setEquation(equation + "" + val);
    } 

    function evaluate() {
        let newEquation = equation;
        for(let i = 0; i<newEquation.length; i++) {
            if(newEquation.at(i) === '/' || newEquation.at(i) === 'x') {
                let left = i-1;
                while(!(operators.includes(newEquation.at(left-1))) && left > 0) {
                    left--;
                }
                let right = i+1;
                while(!(operators.includes(newEquation.at(right+1))) && right < newEquation.length - 1) {
                    right++;
                }
                const firstOp = parseFloat(newEquation.slice(left,i));
                const secondOp = parseFloat(newEquation.slice(i+1,right+1));
                let result = "";
                if(newEquation.at(i) === '/') {
                    result = firstOp / secondOp;
                }
                if(newEquation.at(i) === 'x') {
                    result = firstOp * secondOp;
                }
                newEquation = newEquation.slice(0,left) + result + newEquation.slice(right+1);
                i = left;
            }
        }
        for(let i = 0; i<newEquation.length; i++) {
            if(newEquation.at(i) === '-' || newEquation.at(i) === '+') {
                let left = i-1;
                while(!(operators.includes(newEquation.at(left-1))) && left > 0) {
                    left--;
                }
                let right = i+1;
                while(!(operators.includes(newEquation.at(right+1))) && right < newEquation.length - 1) {
                    right++;
                }
                const firstOp = parseFloat(newEquation.slice(left,i));
                const secondOp = parseFloat(newEquation.slice(i+1,right+1));
                let result = "";
                if(newEquation.at(i) === '-') {
                    result = firstOp - secondOp;
                }
                if(newEquation.at(i) === '+') {
                    result = firstOp + secondOp;
                }
                newEquation = newEquation.slice(0,left) + result + newEquation.slice(right+1);
                i = left;
            }
        }
        setEquation(newEquation);
    }  

    return (
        <div className="calculator">
            <Display equation={equation}/>
            <div className="bottom-container">
                <CalculatorBody handleClick={handleClick}/>
            </div>
        </div>
    )
}

const Display = ({ equation }) => {
    return (
        <div className="display-container">
            <div className="display">
                <p id="equation">
                    {equation}
                </p>
            </div>
        </div>
    )
}

const CalculatorButton = ({ value, type, handleClick }) => {
    return (
        <div className={`btn ${type}`} onClick={handleClick}>
            <p>
                {value}
            </p>
        </div>
    )
}

const CalculatorBody = ({ handleClick }) => {
    return (
        <div className='btn-container'>
            <CalculatorButton value="7" type="" handleClick={() => handleClick('7')}/>
            <CalculatorButton value="8" type="" handleClick={() => handleClick('8')}/>
            <CalculatorButton value="9" type="" handleClick={() => handleClick('9')}/>
            <CalculatorButton value="+" type="func-btn" handleClick={() => handleClick('+')}/>
            <CalculatorButton value="4" type="" handleClick={() => handleClick('4')}/>
            <CalculatorButton value="5" type="" handleClick={() => handleClick('5')}/>
            <CalculatorButton value="6" type="" handleClick={() => handleClick('6')}/>
            <CalculatorButton value="-" type="func-btn" handleClick={() => handleClick('-')}/>
            <CalculatorButton value="1" type="" handleClick={() => handleClick('1')}/>
            <CalculatorButton value="2" type="" handleClick={() => handleClick('2')}/>
            <CalculatorButton value="3" type="" handleClick={() => handleClick('3')}/>
            <CalculatorButton value="x" type="func-btn" handleClick={() => handleClick('x')}/>
            <CalculatorButton value="C" type="c-btn" handleClick={() => handleClick('C')}/>
            <CalculatorButton value="0" type="" handleClick={() => handleClick('0')}/>
            <CalculatorButton value="=" type="func-btn" handleClick={() => handleClick('=')}/>
            <CalculatorButton value="/" type="func-btn" handleClick={() => handleClick('/')}/>
        </div>
    )
}

export default Calculator;