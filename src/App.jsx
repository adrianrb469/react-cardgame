import React from "react";
import { useState } from "react";
import Board from "./components/Board";
import style from "./style.css";

function App() {
    const [value, setValue] = React.useState("easy");
    const [key, setKey] = React.useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
        setKey(key + 1);
    };

    return (
        <>
            <Board key={key} difficulty={value} />

            <select value={value} onChange={handleChange} className="dropdown">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </>
    );
}

export default App;
