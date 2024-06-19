import React, { useState } from 'react';
import './App.css';

function AddRule() {
    const [newRule, setNewRule] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/add_rule_to_all_documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newRule }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Rule added successfully');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('An error occurred while adding the rule');
        }
    };

    return (
        <div className="App">
            <h1>Add Rule to all Documents</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Rule:</label>
                    <input
                        type="text"
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                    />
                </div>
                <button type="submit">Add Rule</button>
            </form>
            {message && (
                <div className="message">
                    <h2>Message:</h2>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default AddRule;
