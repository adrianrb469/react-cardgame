import React from "react";
import style from "../style.css";

export default function Navbar({ score, moves }) {
    return (
        <div className="navbar">
            <h1>억</h1>
            <h1>score: {score}</h1>
            <h1>moves: {moves}</h1>
        </div>
    );
}
