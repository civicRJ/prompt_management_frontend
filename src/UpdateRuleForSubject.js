import React, { useState } from 'react';
import axios from 'axios';

function UpdateRuleForSubject() {
  const [subject, setSubject] = useState('');
  const [interaction, setInteraction] = useState('');
  const [learningMethod, setLearningMethod] = useState('');
  const [oldRule, setOldRule] = useState('');
  const [newRule, setNewRule] = useState('');
  const [commonRules, setCommonRules] = useState([]);
  const [updatedCount, setUpdatedCount] = useState(null);

  const getCommonRules = () => {
    axios.get(`/get_common_rules?subject=${subject}&interaction=${interaction}&learning_method=${learningMethod}`)
      .then(response => {
        setCommonRules(response.data.rules);
      })
      .catch(error => {
        console.error('Error fetching common rules:', error);
      });
  };

  const updateRule = () => {
    axios.post('/update_rule_for_subject', {
      subject,
      interaction,
      learning_method: learningMethod,
      old_rule: oldRule,
      new_rule: newRule
    })
      .then(response => {
        setUpdatedCount(response.data.success);
      })
      .catch(error => {
        console.error('Error updating rule:', error);
      });
  };

  return (
    <div>
      <h1>Rule Management</h1>
      <div>
        <label>Subject:</label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
      </div>
      <div>
        <label>Interaction:</label>
        <input type="text" value={interaction} onChange={e => setInteraction(e.target.value)} />
      </div>
      <div>
        <label>Learning Method:</label>
        <input type="text" value={learningMethod} onChange={e => setLearningMethod(e.target.value)} />
      </div>
      <button onClick={getCommonRules}>Get Common Rules</button>
      <h2>Common Rules:</h2>
      <ul>
        {commonRules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
      <div>
        <label>Old Rule:</label>
        <input type="text" value={oldRule} onChange={e => setOldRule(e.target.value)} />
      </div>
      <div>
        <label>New Rule:</label>
        <input type="text" value={newRule} onChange={e => setNewRule(e.target.value)} />
      </div>
      <button onClick={updateRule}>Update Rule</button>
      {updatedCount && <p>{updatedCount}</p>}
    </div>
  );
}

export default UpdateRuleForSubject;
