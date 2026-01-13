import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { words } from "../data/words";
import Button from "../components/Button";
import BalatroCard from "../components/BalatroCard";

const MainMenu = () => {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const navigate = useNavigate();

  const handleLevelClick = (index: number) => {
    setExpandedLevel(expandedLevel === index ? null : index);
  };

  const handlePlayClick = () => {
    setShowLevelSelect(true);
  };

  const handleLevelSelect = (level: number) => {
    setShowLevelSelect(false);
    navigate("/game", { state: { level } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Russian Flashcards
      </h1>
      <div className="space-y-2">
        {words.map((level, levelIndex) => (
          <div key={levelIndex} className="border rounded">
            <div
              className="p-4 cursor-pointer bg-gray-100 dark:bg-gray-800"
              onClick={() => handleLevelClick(levelIndex)}
            >
              <h2 className="text-xl font-semibold">Level {levelIndex + 1}</h2>
            </div>
            {expandedLevel === levelIndex && (
              <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {level.map((word, wordIndex) => (
                  <BalatroCard key={wordIndex} variant="normal">
                    <div className="h-[150px] w-[120px] flex flex-col justify-between text-center">
                      <h3 className="text-lg font-semibold">
                        {word.russian}
                      </h3>
                      <p>{word.transliteration}</p>
                      <p className="text-sm">{word.meaning.join(", ")}</p>
                    </div>
                  </BalatroCard>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex justify-center">
          <Button onClick={handlePlayClick}>Play</Button>
        </div>
      </div>
      {showLevelSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Select a Level</h2>
            <div className="grid grid-cols-3 gap-4">
              {words.map((_, levelIndex) => (
                <Button
                  key={levelIndex}
                  onClick={() => handleLevelSelect(levelIndex)}
                >
                  Level {levelIndex + 1}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => setShowLevelSelect(false)}
              className="mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
