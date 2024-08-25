"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Question from "./Question";
import QuestionActionButtons from "./QuestionActionButtons";
import QuestionsPalette from "./QuestionsPalette";
import QuestionSummary from "./QuestionSummary";

const QuizComponent = () => {
  const router = useRouter();
  const session = useSession();

  const { name: username } = session.data?.user || {};

  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);
  const [previousQuestionId, setPreviousQuestionId] = useState<number | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleTimerComplete = () => {
    setIsAlertVisible(true);
  };

  const handleSubmitClick = () => {
    setIsAlertVisible(false);
    router.push("/");
  };

  useEffect(() => {
    if (previousQuestionId !== null) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          if (q.id === previousQuestionId) {
            return q.selectedOptionId || q.status === QuestionStatus.ReviewWithoutAnswer
              ? q
              : { ...q, status: QuestionStatus.Visited };
          }
          return q;
        }),
      );
    }
    if (currentQuestionId === null) {
      setCurrentQuestionId(questions[0]!.id);
    }

    setPreviousQuestionId(currentQuestionId);
  }, [currentQuestionId]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 flex flex-col p-4 lg:mt-12 lg:flex-row"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="flex flex-col lg:w-[60vw]">
        <QuestionSummary handleTimerComplete={handleTimerComplete} username={username ?? ""} />
        <Question />
        <QuestionActionButtons />
      </div>
      <QuestionsPalette />
      <AlertDialog open={isAlertVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Times Up!!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank You for your response participating
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmitClick}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default QuizComponent;
