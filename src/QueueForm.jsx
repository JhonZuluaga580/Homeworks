import React, { useState } from 'react';

const QueueForm = ({ addPerson }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && amount) {
            addPerson({ name, amount });
            setName('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="amount">Monto de Retiro:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Agregar a la Cola</button>
        </form>
    );
};

export default QueueForm;