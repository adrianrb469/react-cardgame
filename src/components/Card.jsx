import React, { useState } from "react";
import style from "../style.css";

export default function Card({ id, isFlipped, letter, isActive, onClick }) {
    var className = "";
    var text = "";
    var active = "";

    var bgColor = "";
    var textColor = "";
    var cursor = "";

    const handleCardClick = () => {
        onClick(id);
    };

    if (isFlipped == true) {
        className = "card-flipped";
        text = letter;
    } else {
        className = "card";
        text = "";
    }

    if (isActive == true) {
        bgColor = "#cccf82";
        textColor = "#171716";
        cursor = "default";
    }

    return (
        <div
            className={className}
            style={{ background: bgColor, color: textColor, cursor: cursor , border:"5px solid #a9a391" }}
            onClick={handleCardClick}
        >
            {`${text}`}
        </div>
    );
}
