import { QuizQuestion } from "@repo/common/config";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion, AnimatePresence } from "framer-motion";

import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { Card } from "./ui/card";

const Question = () => {
  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const currentQuestionId = useRecoilValue(recoilCurrentQuestionId);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleOptionSelect = (questionId: number, optionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, selectedOptionId: optionId } : q)),
    );
  };
  return (
    <Card className="mb-8 h-[50vh] overflow-auto px-6 py-2 text-slate-100 lg:mr-8">
      <motion.div
        key={currentQuestion?.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 10 }}
        className="flex gap-2 text-2xl font-medium"
      >
        <p>{`${questions.findIndex((q) => q.id === currentQuestionId) + 1}.`}</p>
        <p>{currentQuestion?.question}</p>
      </motion.div>
      <div className="ml-6 mt-5 flex flex-col space-y-4 text-2xl text-slate-300">
        <AnimatePresence>
          {currentQuestion?.options.map((option, index) => (
            <motion.label
              key={`${currentQuestion.id}-${option.id}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex cursor-pointer items-center space-x-2 self-start"
            >
              <input
                checked={currentQuestion.selectedOptionId === option.id}
                className="form-radio text-blue-500"
                name={`question-${currentQuestion.id}`}
                onChange={() => handleOptionSelect(currentQuestion.id, option.id)}
                type="radio"
                value={option.id}
              />
              <span>{option.text}</span>
            </motion.label>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default Question;
