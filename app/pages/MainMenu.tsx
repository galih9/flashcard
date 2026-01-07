import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { words } from '../data/words';
import Card from '../components/Card';
import Button from '../components/Button';

const MainMenu = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Russian Flashcards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {words.map((word, index) => (
          <div key={index} onClick={() => handleCardClick(index)} className="cursor-pointer">
            <Card>
              <h2 className="text-xl font-semibold">{word.russian}</h2>
              <p className="text-gray-500 dark:text-gray-400">{word.transliteration}</p>
              {expandedCard === index && (
                <div className="mt-2">
                  <p>{word.meaning}</p>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex justify-center">
            <Link to="/game">
                <Button onClick={() => {}}>Play</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
