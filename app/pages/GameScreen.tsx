import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { transliterate } from "../utils";
import { words } from "../data/words";
import type { Word } from "../data/words";
import BalatroCard from "../components/BalatroCard";
import Input from "../components/Input";
import Button from "../components/Button";

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
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [revealedSpelling, setRevealedSpelling] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [questionType, setQuestionType] = useState<
    "russian" | "transliteration" | "meaning"
  >("russian");
  const [incorrectAnswers, setIncorrectAnswers] = useState<Word[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Shuffle words and take the first 10 for the game
    setGameWords(shuffleArray(words).slice(0, 10));
  }, []);

  useEffect(() => {
    if (gameWords.length > 0) {
      const random = Math.random();
      // Randomize the question type for the new word
      if (random < 0.33) {
        setQuestionType("russian");
      } else if (random < 0.66) {
        setQuestionType("transliteration");
      } else {
        setQuestionType("meaning");
      }
    }
  }, [currentWordIndex, gameWords]);

  useEffect(() => {
    if (questionType !== "russian" || !inputValue) return;

    const hasLatin = /[a-zA-Z]/.test(inputValue);
    if (hasLatin) {
      const timer = setTimeout(() => {
        setInputValue(transliterate(inputValue));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inputValue, questionType]);

  const handleCardClick = () => {
    if (isRevealing) return;

    setIsRevealing(true);
    const currentWord = gameWords[currentWordIndex];
    const wordToReveal = `${currentWord.russian} (${currentWord.transliteration})`;
    let revealed = "";
    let i = 0;
    const interval = setInterval(() => {
      revealed += wordToReveal[i];
      setRevealedSpelling(revealed);
      i++;
      if (i === wordToReveal.length) {
        clearInterval(interval);
        setTimeout(() => {
          setRevealedSpelling("");
          setIsRevealing(false);
        }, 1500);
      }
    }, 100);
  };

  const handleAnswerSubmit = () => {
    const currentWord = gameWords[currentWordIndex];
    let correctAnswer: string;
    let userAnswer = inputValue;

    if (questionType === "russian") {
      correctAnswer = currentWord.russian;
      userAnswer = transliterate(inputValue);
    } else if (questionType === "transliteration") {
      correctAnswer = currentWord.transliteration;
    } else {
      // meaning
      correctAnswer = currentWord.meaning;
    }

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setScore(score + 10);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentWord]);
    }

    setInputValue("");
    if (currentWordIndex < gameWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game over
      navigate("/game-over", { state: { score, incorrectAnswers, gameWords } });
    }
  };

  if (gameWords.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = gameWords[currentWordIndex];
  const getQuestion = () => {
    switch (questionType) {
      case "russian":
        return `What is the Russian for '${currentWord.meaning}'?`;
      case "transliteration":
        return "How do you spell this word in Latin letters?";
      case "meaning":
        return "What is the meaning of this word?";
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center text-gray-500 dark:text-gray-400 mb-4 text-2xl font-bold">
          Score: {score}
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 mb-4 text-lg">
          {getQuestion()}
        </div>
        <div
          onClick={handleCardClick}
          className="cursor-pointer mb-4 flex justify-center"
        >
          <div className="w-[300px]">
            <BalatroCard>
              <h2 className="h-[380px] text-gray-500 dark:text-gray-400ƒ text-3xl font-bold text-center">
                {questionType === "meaning" ||
                questionType === "transliteration"
                  ? currentWord.russian
                  : currentWord.meaning}
              </h2>
              {revealedSpelling && (
                <div className="mt-2 text-sm bg-white/50 p-2 rounded">
                  <p>{revealedSpelling}</p>
                </div>
              )}
            </BalatroCard>
          </div>
        </div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleAnswerSubmit}
        />
        <div className="mt-4 flex justify-center">
          <Button onClick={handleAnswerSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
