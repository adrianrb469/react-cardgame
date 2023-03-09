import React, { useState, useEffect } from "react";
import Card from "./Card";
import style from "../style.css";
import Navbar from "./Navbar";

export default function Board({ difficulty }) {
    var won = "";
    const num_rows =
        difficulty === "easy" ? 2 : difficulty === "medium" ? 4 : 6;
    const boardClassName =
        difficulty === "easy"
            ? "board-easy"
            : difficulty === "medium"
            ? "board-medium"
            : "board-hard";

    // Top Bar data
    const [numMoves, setNumMoves] = useState(0);
    const [score, setScore] = useState(0);

    // Game data
    const [cardStates, setCardStates] = useState([]);
    const [cardFlips, setCardFlips] = useState(0);
    const [cardHistory, setCardHistory] = useState([]);

    const initialCardStates = () => {
        const letters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "!",
            "@",
            "%",
            "&",
            "*",
            "<",
            ">",
            "⭐",
            "+",
            "-",
        ];

        // Randomizes the letters assigned to each card
        let shuffledLetters = letters
            .map((letter) => ({ letter, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((item) => item.letter);

        // Take only two of each letter
        shuffledLetters = shuffledLetters
            .slice(0, (num_rows * num_rows) / 2)
            .flatMap((letter) => [letter, letter])
            .sort(() => Math.random() - 0.5);

        setCardStates(
            Array(shuffledLetters.length)
                .fill()
                .map((_, index) => ({
                    id: index,
                    letter: shuffledLetters[index],
                    isFlipped: false,
                    isActive: false,
                }))
        );
    };

    // Game Logic

    const cardClick = (id) => {
        if (
            cardStates[id].isActive != true &&
            cardStates[id] != cardStates[cardHistory[cardHistory.length - 1]]
        ) {
            flipCard(id);
            updateCardHistory(id);
            setCardFlips(cardFlips + 1);
            setNumMoves(numMoves + 1);
            if (cardFlips == 1) {
                if (
                    cardStates[id].letter ==
                    cardStates[cardHistory[cardHistory.length - 1]].letter
                ) {
                    setScore(score + 10);
                    setCardFlips(0);
                    setActiveCard(id);
                    setActiveCard(cardHistory.pop());
                } else {
                    setTimeout(() => {
                        flipCard(id);
                        flipCard(cardHistory.pop());
                    }, 1000); // delay alert by 1 second

                    setCardFlips(0);
                }
            }
        } else {
        }
    };

    if (score >= (num_rows ** 2 / 2) * 10) {
        won = "Nice!";
    }

    const setActiveCard = (id) => {
        const newCardStates = [...cardStates]; // make a copy of the cardStates array
        newCardStates[id].isActive = true;
        setCardStates(newCardStates); // update the state with the new card states
    };

    const flipCard = (id) => {
        if (cardStates[id].isActive != true) {
            const newCardStates = [...cardStates]; // make a copy of the cardStates array
            newCardStates[id].isFlipped = !newCardStates[id].isFlipped;
            setCardStates(newCardStates); // update the state with the new card states
        }
    };

    const updateCardHistory = (id) => {
        const newCardHistory = [...cardHistory];
        newCardHistory.push(id);
        setCardHistory(newCardHistory);
    };

    // This makes sure the configuration remains the same with every re-render
    useEffect(() => {
        initialCardStates();
    }, []);

    var cards = [];

    cards = cardStates.map((card) => (
        <Card
            key={card.id}
            id={card.id}
            isFlipped={card.isFlipped}
            letter={card.letter}
            isActive={card.isActive}
            onClick={cardClick}
        />
    ));

    return (
        <div className="game">
            <Navbar moves={numMoves} score={score} />
            <div className="center-board">
            <div className={boardClassName}>{cards}</div>
            </div>
            
            <h1 className="won-text">{won}</h1>
        </div>
    );
}
