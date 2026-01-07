import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { words } from '../data/words';
import type { Word } from '../data/words';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GameScreen = () => {
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [revealedSpelling, setRevealedSpelling] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [questionType, setQuestionType] = useState<'transliteration' | 'meaning'>('transliteration');
  const [incorrectAnswers, setIncorrectAnswers] = useState<Word[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Shuffle words and take the first 10 for the game
    setGameWords(shuffleArray(words).slice(0, 10));
  }, []);

  useEffect(() => {
    if (gameWords.length > 0) {
      // Randomize the question type for the new word
      setQuestionType(Math.random() > 0.5 ? 'transliteration' : 'meaning');
    }
  }, [currentWordIndex, gameWords]);

  const handleCardClick = () => {
    if (isRevealing) return;

    setIsRevealing(true);
    const wordToReveal = gameWords[currentWordIndex].transliteration;
    let revealed = '';
    let i = 0;
    const interval = setInterval(() => {
      revealed += wordToReveal[i];
      setRevealedSpelling(revealed);
      i++;
      if (i === wordToReveal.length) {
        clearInterval(interval);
        setTimeout(() => {
          setRevealedSpelling('');
          setIsRevealing(false);
        }, 1500);
      }
    }, 100);
  };

  const handleAnswerSubmit = () => {
    const currentWord = gameWords[currentWordIndex];
    const correctAnswer = questionType === 'transliteration' ? currentWord.transliteration : currentWord.meaning;

    if (inputValue.toLowerCase() === correctAnswer.toLowerCase()) {
      setScore(score + 10);
    } else {
        setIncorrectAnswers([...incorrectAnswers, currentWord]);
    }

    setInputValue('');
    if (currentWordIndex < gameWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game over
      navigate('/game-over', { state: { score, incorrectAnswers, gameWords } });
    }
  };

  if (gameWords.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = gameWords[currentWordIndex];

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 text-2xl font-bold">Score: {score}</div>
        <div className="text-center mb-4 text-lg">
            {questionType === 'transliteration' ? 'How do you spell this word in Latin letters?' : 'What is the meaning of this word?'}
        </div>
        <div onClick={handleCardClick} className="cursor-pointer mb-4">
          <Card>
            <h2 className="text-3xl font-bold text-center">{currentWord.russian}</h2>
            {revealedSpelling && (
                <p className="text-center mt-2 text-xl">{revealedSpelling}</p>
            )}
          </Card>
        </div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="mt-4 flex justify-center">
            <Button onClick={handleAnswerSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
