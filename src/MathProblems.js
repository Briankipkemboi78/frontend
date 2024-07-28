import React, { useState, UseState } from 'react';

const generateRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

const generateMathProblem = () => {
    const operations = ['+', '-', '*' , '/'];
    const num1 = generateRandomNumber(10);
    const num2 = generateRandomNumber(10);
    const operation = operations[Math.floor(Math.random() * operations.length)];

    const problem = `${num1} ${operation} ${num2}`;

    let answer;
    switch (operation) {
        case '+' :
            answer = num1 + num2;
            break;
        case '-' :
            answer = num1 - num2;
            break;
        case '*' :
            answer = num1 * num2;
            break;
        case '/' :
            answer = parseFloat((num1 / num2).toFixed(2)); 
            break;
        default:
            break;
    }
    return { problem, answer}
};

const MathProblems = () => {
    const [problems, setProblems] = useState([]);
    const [useAnswers, setUserAnswers] = useState(Array(5).fill(''));
    const [score, setScore] = useState(null);


    const generateProblem = () => {
        const newProblems = Array.from({length: 5 }, generateMathProblem);
        setProblem(newProblems);
        setUserAnswers(Array(5).fill(''));
        setScore(null);
    };

    const handleChange = (index, value) => {
        const newUserAnswers = [...useAnswers];
        newUserAnswers[index] = value;
        setUserAnswers(newUserAnswers);
    };

    cont 

    return (
        <div>
            <h1>Math Problems for Kids</h1>
            <button onClick={generateProblem}>Generate Problem</button>
            {problem && <p>{problem}</p>}
        </div>
    );
};

export default MathProblems;