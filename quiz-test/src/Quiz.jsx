import { useState } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (answerIndex) => {
    if (!showResults && selectedAnswers[currentQuestionIndex] === null) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = answerIndex;
      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const getAnswerClass = (answerIndex) => {
    if (selectedAnswers[currentQuestionIndex] !== null) {
      if (questions[currentQuestionIndex].answers[answerIndex].isCorrect) {
        return 'correct';
      }
      if (selectedAnswers[currentQuestionIndex] === answerIndex) {
        return 'incorrect';
      }
    }
    return '';
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answerIndex, questionIndex) => {
      if (questions[questionIndex].answers[answerIndex]?.isCorrect) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="progress-indicator">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`circle ${
              index < currentQuestionIndex
                ? 'completed'
                : index === currentQuestionIndex
                ? 'active'
                : ''
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="quiz">
      {showResults ? (
        <div className="results">
          You got {calculateScore()} out of {questions.length} correct.
        </div>
      ) : (
        <div className="question-section">
          <div>
            <h4>Question {currentQuestionIndex + 1} of {questions.length}</h4>
          </div>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <div className="answers">
            {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
              <button
                key={answerIndex}
                className={`answer ${getAnswerClass(answerIndex)}`}
                onClick={() => handleAnswerClick(answerIndex)}
              >
                {answer.text}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextClick}
            className="next-button"
            disabled={selectedAnswers[currentQuestionIndex] === null}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Show Results'}
          </button>
          {renderProgressIndicator()}
        </div>
      )}
    </div>
  );
};

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          isCorrect: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Quiz;
