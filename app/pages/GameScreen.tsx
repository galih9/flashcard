import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

type Edition = "normal" | "foil" | "holographic" | "polychrome" | "negative";

const editions: { type: Edition; probability: number; points: number }[] = [
  { type: "normal", probability: 0.6, points: 10 },
  { type: "foil", probability: 0.2, points: 25 },
  { type: "holographic", probability: 0.1, points: 50 },
  { type: "polychrome", probability: 0.05, points: 100 },
  { type: "negative", probability: 0.05, points: 0 }, // Points for negative are special
];

const getRandomEdition = (): Edition => {
  const random = Math.random();
  let cumulativeProbability = 0;
  for (const edition of editions) {
    cumulativeProbability += edition.probability;
    if (random < cumulativeProbability) {
      return edition.type;
    }
  }
  return "normal"; // Fallback
};

type GameWord = Word & { edition: Edition };

const GameScreen = () => {
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
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
  const location = useLocation();
  const level = location.state?.level || 0;

  useEffect(() => {
    // Shuffle words from the selected level and assign random editions
    const wordsWithEditions = shuffleArray(words[level]).map((word: Word) => ({
      ...word,
      edition: getRandomEdition(),
    }));
    setGameWords(wordsWithEditions);
  }, [level]);

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

  const checkIfAnswerCorrect = (userAnswer: string, correctAnswers: string[]) => {
    return correctAnswers.some(
      (answer) => answer.toLowerCase() === userAnswer.toLowerCase()
    );
  };

  const handleAnswerSubmit = () => {
    const currentWord = gameWords[currentWordIndex];
    let correctAnswers: string[];
    let userAnswer = inputValue;

    if (questionType === "russian") {
      correctAnswers = currentWord.russian;
      userAnswer = transliterate(inputValue);
    } else if (questionType === "transliteration") {
      correctAnswers = currentWord.transliteration;
    } else {
      // meaning
      correctAnswers = currentWord.meaning;
    }

    if (checkIfAnswerCorrect(userAnswer, correctAnswers)) {
      const edition = currentWord.edition;
      if (edition === "negative") {
        setScore(score * 2);
      } else {
        const editionData = editions.find((e) => e.type === edition);
        if (editionData) {
          setScore(score + editionData.points);
        }
      }
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
