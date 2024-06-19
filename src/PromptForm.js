import React, { useState } from 'react';
import './App.css';

function PromptForm() {
    const [grade, setGrade] = useState('');
    const [interaction, setInteraction] = useState('');
    const [learningMethod, setLearningMethod] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [prompt, setPrompt] = useState('');
    const [updatedBase, setUpdatedBase] = useState('');
    const [base, setBase] = useState('');
    const [newRule, setNewRule] = useState('');
    const [updatedRuleIndex, setUpdatedRuleIndex] = useState('');
    const [updatedRule, setUpdatedRule] = useState('')
    const [rule_set,setRuleSet] = useState([]);
    const [error, setError] = useState('');

    // get prompt
    const fetchPrompt = async () => {
        try {
            const response = await fetch(`/get_prompt?grade=${grade}&interaction=${interaction}&learning_method=${learningMethod}&subject=${subject}&topic=${topic}`);
            const data = await response.json();
            if (response.ok) {
                setPrompt(data.prompt);
                setError('');
            } else {
                setError(data.error);
                setPrompt('');
            }
        } catch (error) {
            setError('An error occurred while fetching the prompt');
            setPrompt('');
        }
    };

    // get base set
    const fetchBase = async () => {
        try {
            const response = await fetch(`/get_base?grade=${grade}&interaction=${interaction}&learning_method=${learningMethod}&subject=${subject}&topic=${topic}`);
            const data = await response.json();
            if (response.ok) {
                setBase(data.base);
                setError('');
            } else {
                setError(data.error);
                setBase('');
            }
        } catch (error) {
            setError('An error occurred while fetching the Base Set');
            setBase('');
        }
    };

    // get rule set
    const fetchRuleSet = async () => {
        try {
            const response = await fetch(`/get_rule_set?grade=${grade}&interaction=${interaction}&learning_method=${learningMethod}&subject=${subject}&topic=${topic}`);
            const data = await response.json();
            if (response.ok) {
                setRuleSet(data.rule_set);
                setError('');
            } else {
                setError(data.error);
                setRuleSet([]);
            }
        } catch (error) {
            setError('An error occurred while fetching the prompt');
            setRuleSet([]);
        }
    };

    // update base set
    const updateBase = async () => {
        try {
            const response = await fetch(`/update_base`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    interaction,
                    learningMethod,
                    subject,
                    topic,
                    base: updatedBase,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                setBase(updatedBase);
                alert('Base Set updated successfully');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while updating the Base Set');
        }
    };

    // revert base set
    const revertBase = async () => {
        try {
            const response = await fetch(`/revert_base`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    interaction,
                    learning_method: learningMethod,
                    subject,
                    topic,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setBase(data.base);
                setUpdatedBase(data.base)
                setError('');
                alert('Base Set reverted successfully');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while reverting the Base Set');
        }
    };
    
    // add rule
    const addRule = async () => {
    try {
        const response = await fetch('/add_rule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grade,
                interaction,
                learningMethod,
                subject,
                topic,
                newRule,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setError('');
            fetchRuleSet(); // Refresh the rule set after adding a rule
            setNewRule('');
        } else {
            setError(data.error);
        }
    } catch (error) {
        setError('An error occurred while adding the rule');
    }
};

    // update rule
    const updateRule = async () => {
        try {
            const response = await fetch('/update_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    interaction,
                    learningMethod,
                    subject,
                    topic,
                    index: updatedRuleIndex,
                    updatedRule,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                fetchRuleSet(); // Refresh the rule set after updating a rule
                setUpdatedRuleIndex('');
                setUpdatedRule('');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while updating the rule');
        }
    };

    // delete rule
    const deleteRule = async (index) => {
        try {
            const response = await fetch('/delete_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    interaction,
                    learningMethod,
                    subject,
                    topic,
                    index,
                }),
                
            });
            
            console.log(index)
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                alert('Rule deleted successfully');
                setError('');
                fetchRuleSet(); // Refresh the rule set after deleting a rule
            } else {
                setError(data.error);
            }
        } catch (error) {
            alert('An error occurred while deleting the rule');
            setError('An error occurred while deleting the rule');
        }
    };

    // move rule
    const moveRule = (index, direction) => {
        const newRuleSet = [...rule_set];
        const targetIndex = index + direction;

        if (targetIndex < 0 || targetIndex >= rule_set.length) return;

        const temp = newRuleSet[targetIndex];
        newRuleSet[targetIndex] = newRuleSet[index];
        newRuleSet[index] = temp;

        setRuleSet(newRuleSet);
        updateRuleSet(newRuleSet);
    };

    // update rule set
    const updateRuleSet = async (newRuleSet) => {
        try {
            const response = await fetch('/update_rule_set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    interaction,
                    learningMethod,
                    subject,
                    topic,
                    rule_set: newRuleSet,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
            } else {
                setError('');
            }
        } catch (error) {
            setError('An error occurred while updating the rule set');
        }
    };
    const revertRuleSet = async () => {
        try {
            const response = await fetch(`/revert_rule_set`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    interaction,
                    learning_method: learningMethod,
                    subject,
                    topic,
                }),
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                // setRuleSet(data.rule_set);
                fetchRuleSet(); // Refresh the rule set after updating a rule
                setError('');
                alert('Rule Set reverted successfully');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while reverting the Rule Set');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPrompt();
        fetchBase();
        fetchRuleSet();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateBase();
    };
  return (
    <div className="App">
        <h1>Fetch Learning Prompt</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Grade:</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                    <option value="">Select Grade</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div>
            <label>Interaction:</label>
                <select value={interaction} onChange={(e) => setInteraction(e.target.value)}>
                    <option value="">Select Interaction</option>
                    <option value="regular">Regular</option>
                    <option value="socratic">Socratic</option>
                </select>
            </div>
            <div>
                <label>Learning Method:</label>
                <select value={learningMethod} onChange={(e) => setLearningMethod(e.target.value)}>
                    <option value="">Select Learning Method</option>
                    <option value="in-context">In Context</option>
                    <option value="bypass">Bypass</option>
                </select>
            </div>
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
                <label>Topic:</label>
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <button type="submit">Get Prompt</button>
        </form>
        
        {base && (
            <div className="prompt">
                <h2>Base Set:</h2>
                <p>{base}</p>
                <form onSubmit={handleUpdate}>
                        <textarea
                            value={updatedBase}
                            onChange={(e) => setUpdatedBase(e.target.value)}
                            rows="10"
                            cols="50"
                        ></textarea>
                        <button type="submit">Update Base Set</button>
                    </form>
                    
            </div>
        )}
        <button onClick={revertBase}>Revert Base</button>
        <div>
            <label>New Rule:</label>
            <input type="text" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
            <button type="button" onClick={addRule}>Add Rule</button>
        </div>
        <div>
            <label>Update Rule:</label>
            <input type="number" value={updatedRuleIndex} onChange={(e) => setUpdatedRuleIndex(e.target.value)} />
            <input type="text" value={updatedRule} onChange={(e) => setUpdatedRule(e.target.value)} />
            <button type="button" onClick={updateRule}>Update Rule</button>
        </div>
        <div className="prompt">
    <h2>Rule Set:</h2>
    <table className="rule-table">
        <thead>
            <tr>
                <th>Index</th>
                <th>Rule</th>
                <th>Topic Rule Flag</th>
                <th>Delete</th>
                <th>Move Up</th>
                <th>Move Down</th>

            </tr>
        </thead>
        <tbody>
            {rule_set.map((rule, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{rule[1]}</td>
                    <td>{rule[0]}</td>
                    <td>
                        <button type="button" onClick={() => deleteRule(index)}>Delete</button>
                    </td>
                    <td>
                        <button onClick={() => moveRule(index, -1)} disabled={index === 0}>Up</button>
                    </td>
                    <td>
                        <button onClick={() => moveRule(index, 1)} disabled={index === rule_set.length - 1}>Down</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
        <button onClick={revertRuleSet}>Revert Rule Set</button>

        {error && (
            <div className="error">
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        )}
    </div>
);
}

export default PromptForm;  