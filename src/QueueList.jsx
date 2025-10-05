import React from 'react';

const QueueList = ({ queue }) => {
    return (
        <div>
            <h2>Cola de Cajero Automático</h2>
            <ul>
                {queue.map((person, index) => (
                    <li key={index}>
                        {person.name} - ${person.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QueueList;