import Quiz from './Quiz';
import questions from '../questions.json';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1 className='heading' >Quiz App</h1>
      <Quiz questions={questions} />
    </div>
  );
};

export default App;

