import React, { useState } from 'react';
import axios from 'axios';

function UpdateAnswerPrompt() {
  const [grade, setGrade] = useState('');
  const [prompt_style, setPromptStyle] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('/update_answer_agent_prompts', {
        grade,
        prompt_style,
        subject,
        topic,
      });
      console.log(response);
      if (response.data.success) {
        setSuccessMessage(response.data.success);
      } else {
        setError(response.data.error);
        console.log(response.data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Answer Prompt</h2>
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
          <label>Prompt Style:</label>
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
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Prompts'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default UpdateAnswerPrompt;