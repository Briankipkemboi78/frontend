import React, { useState } from 'react';
import './MathProblems.css';

const generateRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

const generateMathProblem = () => {
    const operations = ['+', '-']; // Only addition and subtraction
    let num1 = generateRandomNumber(10);
    let num2 = generateRandomNumber(10);
    let operation = operations[Math.floor(Math.random() * operations.length)];

    // Ensure subtraction does not give negative results
    if (operation === '-' && num1 < num2) {
        [num1, num2] = [num2, num1];
    }

    const problem = `${num1} ${operation} ${num2}`;
    let answer;

    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        default:
            break;
    }
    return { problem, answer };
};

const MathProblems = () => {
    const [problems, setProblems] = useState([]);
    const [userAnswers, setUserAnswers] = useState(Array(10).fill(''));
    const [score, setScore] = useState(null);
    const [incorrectIndices, setIncorrectIndices] = useState([]);

    const generateProblem = () => {
        const newProblems = Array.from({ length: 10 }, generateMathProblem);
        setProblems(newProblems);
        setUserAnswers(Array(10).fill(''));
        setScore(null);
        setIncorrectIndices([]);
    };

    const handleChange = (index, value) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[index] = value;
        setUserAnswers(newUserAnswers);
    };

    const checkAnswers = () => {
        const correctAnswers = problems.map(problem => problem.answer);
        const userScore = userAnswers.reduce((score, answer, index) => {
            return score + (parseFloat(answer) === correctAnswers[index] ? 1 : 0);
        }, 0);
        setScore(userScore);

        const newIncorrectIndices = userAnswers.map((answer, index) => parseFloat(answer) !== correctAnswers[index] ? index : null).filter(index => index !== null);
        setIncorrectIndices(newIncorrectIndices);
    };

    return (
        <div className="container">
            <h1>Fun Maths Challenges for Kids</h1>
            <button className="generate-btn" onClick={generateProblem}>Generate Problems</button>
            <div className="problems-container">
                {problems.map((problem, index) => (
                    <div key={index} className="problem">
                        <p>{problem.problem} =</p>
                        <input
                            type="text"
                            value={userAnswers[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className={`answer-input ${incorrectIndices.includes(index) ? 'incorrect' : ''}`}
                        />
                    </div>
                ))}
            </div>
            <button className="check-btn" onClick={checkAnswers}>Check Answers</button>
            {score !== null && <p className="score">Your score is: {score}/10</p>}
        </div>
    );
};

export default MathProblems;
