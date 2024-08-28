import React from "react";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { useRecoilValue } from "recoil";
import { questionsData } from "@repo/store";

import { getQuestionColorAndText } from "../app/utils";
import Timer from "./Timer";
import { Card } from "./ui/card";

interface IQuestionSummaryProps {
  handleTimerComplete: () => void;
}

const getCount = (questions: QuizQuestion[], status: QuestionStatus) =>
  questions?.reduce((acc, question) => {
    if (question.status === status) acc += 1;
    return acc;
  }, 0);

const StatusBox = ({ questionStatus }: { questionStatus: QuestionStatus }) => {
  const quizQuestions = useRecoilValue(questionsData);
  const count = getCount(quizQuestions, questionStatus);
  const { label, summaryColor } = getQuestionColorAndText(questionStatus);

  return (
    <div className="flex items-center gap-2">
      <div
        className={`mx-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-medium text-white ${summaryColor}`}
      >
        {count}
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
};

const QuestionSummary = (props: IQuestionSummaryProps) => {
  const { handleTimerComplete } = props;

  return (
    <Card className="mb-3 flex justify-between border-none bg-gradient-to-r from-[#020f31] to-[#121d39] p-4 lg:mr-8">
      <div className="col grid w-[70%] grid-cols-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
        <StatusBox questionStatus={QuestionStatus.Default} />
        <StatusBox questionStatus={QuestionStatus.Visited} />
        <StatusBox questionStatus={QuestionStatus.Answered} />
        <StatusBox questionStatus={QuestionStatus.ReviewWithAnswer} />
        <StatusBox questionStatus={QuestionStatus.ReviewWithoutAnswer} />
      </div>
      <div className="flex min-w-20 flex-col items-end justify-center">
        <Timer onComplete={handleTimerComplete} duration={60 * 60 * 2} />
      </div>
    </Card>
  );
};

export default QuestionSummary;
