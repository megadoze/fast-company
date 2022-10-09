import React from "react";
import UseMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, status, progress } = UseMockData();
    const handleClick = () => {
        if (status !== "Ready") {
            initialize();
        }
    };
    return (
        <div className="container mt-5">
            <h1>Main page</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress:{progress}%</li>
                {error && <li>Error:{error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Start initialization
            </button>
        </div>
    );
};

export default Main;
