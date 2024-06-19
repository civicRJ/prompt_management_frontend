import React, { useState } from 'react';
import './App.css';

function AddRuleTopicAnswerAgent() {
    const [topic, setTopic] = useState('');
    const [newRule, setNewRule] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/add_answer_agent_rule_to_topic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, newRule }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Rule added successfully');
            } else {
                setMessage(data.error);
            }
        }
        catch (error) {
            setMessage('An error occurred while adding the rule');
        }
    }
    
    return (
        <div className="App">
            <h1>Add Rule to topic</h1>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Topic:</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter topic"
                    />
                </div>
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

export default AddRuleTopicAnswerAgent;