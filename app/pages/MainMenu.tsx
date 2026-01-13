import { useState } from "react";
import { Link } from "react-router-dom";
import { words } from "../data/words";
import Button from "../components/Button";
import BalatroCard from "../components/BalatroCard";

const MainMenu = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const variants = [
    "normal",
    "foil",
    "holographic",
    "polychrome",
    "negative",
  ] as const;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Russian Flashcards
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {words[0].map((word, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className="cursor-pointer"
          >
            <BalatroCard variant={"holographic"}>
              <div className="h-[300px] w-[180px] flex flex-col justify-between">
                <div>
                  <h2 className="text-xl text-gray-500 dark:text-gray-400ƒ font-semibold">
                    {word.russian}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {word.transliteration}
                  </p>
                </div>
                {expandedCard === index && (
                  <div className="mt-2 text-sm bg-white/50 p-2 rounded">
                    <p>{word.meaning}</p>
                    <p className="text-xs uppercase mt-1 font-bold opacity-70">
                      {variants[index % variants.length]}
                    </p>
                  </div>
                )}
              </div>
            </BalatroCard>
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
