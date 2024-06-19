import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PromptForm from './PromptForm';
import AddRulePage from './AddRulePage';
import AddRuleTopicPage from './AddRuleTopicPage';
import FunctionalPromptForm from './FunctionalPromptForm';
import AnswerPromptForm from './AnswerPromptForm';
import AddRuleTopicAnswerAgent from './AddRuleTopicAnswerAgent';
import UpdateAnswerPrompt from './UpdateAnswerPrompt';
import AddRule from './AddRule';
import UpdateRuleForSubject from './UpdateRuleForSubject';
import './App.css';

function App() {
    return (
        <Router>
            {/* <div className="App"> */}
                <nav>
                    <ul>
                        <li><Link to="/">Learning Prompt</Link></li>
                        <li><Link to="/functional-prompt-form">Functional Prompt Form</Link></li>
                        <li><Link to="/answer-prompt-form">Answer Prompt Form</Link></li>
                        <li><Link to="/add-rule-to-all">Add Rule to all Documents</Link></li>
                        <li><Link to="/add-rule">Add Rule to Subject</Link></li>
                        <li><Link to="/add-rule-topic">Add Rule to Topic</Link></li>
                        <li><Link to="/add-rule-topic-answer-agent">Add Rule to Topic for Answer Agent</Link></li>
                        <li><Link to="/update-answer-prompt">Update Answer Prompt</Link></li>
                        <li><Link to="/update-rule-for-subject">Update Rule for Subject</Link></li>


                        
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<PromptForm />} />
                    <Route path="/add-rule-to-all" element={<AddRule />} />
                    <Route path="/add-rule" element={<AddRulePage />} />
                    <Route path="/add-rule-topic" element={<AddRuleTopicPage />} />
                    <Route path="/functional-prompt-form" element={<FunctionalPromptForm />} />
                    <Route path="/answer-prompt-form" element={<AnswerPromptForm />} />
                    <Route path="/add-rule-topic-answer-agent" element={<AddRuleTopicAnswerAgent />} />
                    <Route path="/update-answer-prompt" element={<UpdateAnswerPrompt />} />
                    <Route path="/update-rule-for-subject" element={<UpdateRuleForSubject />} />
                </Routes>
            {/* </div> */}
        </Router>
    );
}

export default App;
