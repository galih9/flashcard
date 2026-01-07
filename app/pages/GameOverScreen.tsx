import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { Word } from '../data/words';
import Card from '../components/Card';
import Button from '../components/Button';

const GameOverScreen = () => {
  const location = useLocation();
  const { score, incorrectAnswers, gameWords } = location.state as { score: number; incorrectAnswers: Word[]; gameWords: Word[] } || { score: 0, incorrectAnswers: [], gameWords: [] };

  // Determine correct answers by filtering out incorrect ones
  const correctAnswers = gameWords.filter(
    (word: Word) => !incorrectAnswers.some((incorrect: Word) => incorrect.russian === word.russian)
  );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Game Over</h1>
        <h2 className="text-2xl mb-8">Your Score: {score}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Correct</h3>
            <div className="space-y-2">
              {correctAnswers.length > 0 ? (
                correctAnswers.map((word: any, index: number) => (
                  <Card key={index}>
                    <p className="font-semibold">{word.russian}</p>
                    <p className="text-sm text-gray-500">{word.transliteration} - {word.meaning}</p>
                  </Card>
                ))
              ) : (
                <p>No correct answers.</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-500">Incorrect</h3>
            <div className="space-y-2">
              {incorrectAnswers.length > 0 ? (
                incorrectAnswers.map((word: any, index: number) => (
                  <Card key={index}>
                     <p className="font-semibold">{word.russian}</p>
                    <p className="text-sm text-gray-500">{word.transliteration} - {word.meaning}</p>
                  </Card>
                ))
              ) : (
                <p>No incorrect answers. Perfect score!</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/game">
            <Button onClick={() => {}}>Retry</Button>
          </Link>
          <Link to="/">
            <Button onClick={() => {}}>Main Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
