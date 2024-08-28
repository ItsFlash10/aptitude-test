"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import moment from "moment";

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
import { Card } from "./ui/card";

const Info = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="flex">
    <p className="w-16">{`${title}:`}</p>
    <p>{subtitle}</p>
  </div>
);

const QuizComponent = () => {
  const router = useRouter();
  const session = useSession();
  const { testId: examId } = useParams() || {};

  if (!examId) {
    router.push("/instructions");
  }

  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);
  const [previousQuestionId, setPreviousQuestionId] = useState<number | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const { name: username } = session.data?.user || {};
  const videoConstraints = {
    width: 96,
    height: 96,
    facingMode: "user",
  };
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
        <QuestionSummary handleTimerComplete={handleTimerComplete} />
        <Question />
        <QuestionActionButtons />
      </div>
      <div>
        <Card className="mb-3 flex gap-4 p-2">
          <Webcam
            audio={false}
            className="h-24 overflow-hidden rounded-lg"
            videoConstraints={videoConstraints}
          />
          <div className="flex flex-col justify-between py-2 text-sm">
            <Info title="Name" subtitle={username ?? ""} />
            <Info title="Exam Id" subtitle={(examId as string) || ""} />
            <Info title="Date" subtitle={moment().format("DD/MM/YYYY")} />
          </div>
        </Card>
        <QuestionsPalette />
      </div>
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
