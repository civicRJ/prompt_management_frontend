import React, { useState } from 'react';
import './App.css';

function FunctionalPromptForm() {
    const [type, setType] = useState('');
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
            const response = await fetch(`/get_functional_prompt?type=${type}`);
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
            const response = await fetch(`/get_functional_base?type=${type}`);
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
            const response = await fetch(`/get_functional_rule_set?type=${type}`);
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
            const response = await fetch(`/update_functional_base`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
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
        const response = await fetch('/add_functional_rule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type,
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
            const response = await fetch('/update_functional_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
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
            const response = await fetch('/delete_functional_rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
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
            const response = await fetch('/update_functional_rule_set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
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
        <h1>Fetch Functional Prompt</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select type</option>
                    <option value="welcome_classifier">welcome_classifier</option>
                    <option value="welcome_classifier_fallback">welcome_classifier_fallback</option>
                    <option value="converse_practice_problem">converse_practice_problem</option>
                    <option value="answer_agent_gpt">answer_agent_gpt</option>
                    <option value="answer_agent_gpt_step_by_step">answer_agent_gpt_step_by_step</option>
                    <option value="wolfram_condense">wolfram_condense</option>
                    <option value="answer_agent_collate">answer_agent_collate</option>
                    <option value="context_refresh">context_refresh</option>
                    <option value="off-topic-check">off-topic-check</option>
                    <option value="rule_set_converse_practice_problem_in_context">rule_set_converse_practice_problem_in_context</option>
                    <option value="rule_set_converse_practice_problem_bypass">rule_set_converse_practice_problem_bypass</option>
                    <option value="rule_set_question_answer_in_context">rule_set_question_answer_in_context</option>
                    <option value="rule_set_question_answer_bypass">rule_set_question_answer_bypass</option>
                    <option value="context_setting_query">context_setting_query</option>
                    <option value="num_theo_classifier">num_theo_classifier</option>
                    <option value="practice_problem_evaluation">practice_problem_evaluation</option>
                    <option value="image_pull">image_pull</option>
                    <option value="conversation_score">conversation_score</option>
                    <option value="generate_summary">generate_summary</option>
                </select>
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

export default FunctionalPromptForm;  