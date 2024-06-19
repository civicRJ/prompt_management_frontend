import React, { useState } from 'react';
import './App.css';

function AnswerPromptForm() {
    const [grade, setGrade] = useState('');
    const [prompt_style, setPromptStyle] = useState('');
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
            const response = await fetch(`/get_answer_agent_prompt?grade=${grade}&prompt_style=${prompt_style}&subject=${subject}&topic=${topic}`);
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
            const response = await fetch(`/get_answer_agent_base?grade=${grade}&prompt_style=${prompt_style}&subject=${subject}&topic=${topic}`);
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
            const response = await fetch(`/get_answer_agent_rule_set?grade=${grade}&prompt_style=${prompt_style}&subject=${subject}&topic=${topic}`);
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
            const response = await fetch(`/update_answer_agent_base`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    prompt_style,
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
    
    // add rule
    const addRule = async () => {
    try {
        const response = await fetch('/add_answer_agent_rule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grade,
                prompt_style,
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
            const response = await fetch('/update_answer_agent_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    prompt_style,
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
            const response = await fetch('/delete_answer_agent_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    prompt_style,
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
            const response = await fetch('/update_answer_agent_rule_set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    prompt_style,
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
            <label>Prompt Style</label>
                <select value={prompt_style} onChange={(e) => setPromptStyle(e.target.value)}>
                    <option value="">Select Prompt Style</option>
                    <option value="mini-answer-agent">mini-answer-agent</option>
                    <option value="python-calculator">python-calculator</option>
                    <option value="step-by-step">step-by-step</option>
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
            <ol className="rule-list">
                {rule_set.map((rule, index) => (
                    <li key={index}>
                        {`${index + 1}. ${rule}`}
                        <button type="button" onClick={() => deleteRule(index)}>Delete</button>
                        <button onClick={() => moveRule(index, -1)} disabled={index === 0}>Up</button>
                                <button onClick={() => moveRule(index, 1)} disabled={index === rule_set.length - 1}>Down</button>
                    </li>
                ))}
            </ol>
        </div>
        {error && (
            <div className="error">
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        )}
    </div>
);
}

export default AnswerPromptForm;  