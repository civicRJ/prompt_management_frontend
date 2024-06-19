import React, { useState } from 'react';
import './App.css';

function AddRulePage() {
    const [subject, setSubject] = useState('');
    const [newRule, setNewRule] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/add_rule_to_subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, newRule }),
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
            <h1>Add Rule to Subject</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject:</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="physics">Physics</option>
                        <option value="math">Mathematics</option>
                        <option value="biology">Biology</option>
                        <option value="english">English</option>
                        <option value="history">History</option>
                        <option value="geography">Geography</option>
                        <option value="civics">Civics</option>
                        <option value="economics">Economics</option>
                        <option value="political_science">Political Science</option>
                        <option value="health_&_physical_education">Health & Physical Education</option>
                        <option value="social_science">Social Science</option>
                        <option value="ict">ICT</option>
                        <option value="science">Science</option>
                    </select>
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

export default AddRulePage;
