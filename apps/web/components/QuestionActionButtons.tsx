import React from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { Button } from "./ui/button";

const QuestionActionButtons = () => {
  const router = useRouter();

  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);

  const updateQuestionStatus = (questionId: number, newStatus: QuestionStatus | string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, status: newStatus } : q)),
    );
  };

  const handleSaveAndNextClick = () => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion?.selectedOptionId) {
      currentQuestionId && updateQuestionStatus(currentQuestionId, QuestionStatus.Answered);
      const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
      const nextIndex = Math.min(currentIndex + 1, questions.length - 1);
      setCurrentQuestionId(questions[nextIndex]!.id);
    } else {
      toast("No Ser!!", {
        description: "Please select an option to save and go to the next question",
      });
    }
  };

  const handleMarkForReview = () => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    const status = currentQuestion?.selectedOptionId
      ? QuestionStatus.ReviewWithAnswer
      : QuestionStatus.ReviewWithoutAnswer;

    currentQuestionId && updateQuestionStatus(currentQuestionId, status);

    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    const nextIndex = Math.min(currentIndex + 1, questions.length - 1);
    setCurrentQuestionId(questions[nextIndex]!.id);
  };

  const navigateQuestion = (offset: number) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    const newIndex = Math.min(Math.max(currentIndex + offset, 0), questions.length - 1);
    setCurrentQuestionId(questions[newIndex]!.id);
  };

  const handleNextClick = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === currentQuestionId &&
        q.selectedOptionId &&
        q.status !== QuestionStatus.Answered &&
        q.status !== QuestionStatus.ReviewWithAnswer
          ? { ...q, status: "visited" }
          : q,
      ),
    );
    navigateQuestion(1);
  };

  const handlePrevClick = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === currentQuestionId &&
        q.selectedOptionId &&
        q.status !== QuestionStatus.Answered &&
        q.status !== QuestionStatus.ReviewWithAnswer
          ? { ...q, status: "visited" }
          : q,
      ),
    );
    navigateQuestion(-1);
  };

  const handleClearClick = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === currentQuestionId ? { ...q, selectedOptionId: null } : q)),
    );
  };

  const handleSubmitClick = () => {
    router.replace("/submit-confirmation");
  };

  return (
    <div className="mr-8 flex justify-between">
      <div className="flex gap-2">
        <Button
          className="border border-[#20e8a4] bg-transparent text-white"
          onClick={handleSaveAndNextClick}
        >
          Save & Next
        </Button>
        <Button
          className="border border-slate-700 bg-transparent text-white"
          onClick={handlePrevClick}
        >
          {`<`}
        </Button>
        <Button
          className="border border-slate-700 bg-transparent text-white"
          onClick={handleClearClick}
        >
          Clear
        </Button>
        <Button
          className="border border-slate-700 bg-transparent text-white"
          onClick={handleNextClick}
        >
          {`>`}
        </Button>
        <Button
          className="border border-[#9f3db4] bg-transparent text-white"
          onClick={handleMarkForReview}
        >
          Mark for Review
        </Button>
      </div>
      <Button className="bg-[#20e8a4] text-green-950" onClick={handleSubmitClick}>
        Submit
      </Button>
    </div>
  );
};

export default QuestionActionButtons;
