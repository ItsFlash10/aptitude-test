import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { getQuestionColorAndText } from "../app/utils";
import { Card } from "./ui/card";

const QuestionsPalette = () => {
  const questions = useRecoilValue(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);
  const handleQuestionClick = (id: number) => {
    setCurrentQuestionId(id);
  };

  return (
    <Card className="col mb-6 mt-8 grid max-h-44 w-full grid-cols-6 gap-y-4 self-start overflow-auto rounded-sm p-4 sm:grid-cols-12 lg:mt-0 lg:max-h-[50vh] lg:w-[25vw] lg:grid-cols-5">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`mx-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg font-bold text-white ${getQuestionColorAndText(question.status).color} ${question.id === currentQuestionId ? "scale-110 border-[2px] border-[#0000003f]" : ""} hover:opacity-90`}
          onClick={() => handleQuestionClick(question.id)}
        >
          {index + 1}
        </div>
      ))}
    </Card>
  );
};

export default QuestionsPalette;
