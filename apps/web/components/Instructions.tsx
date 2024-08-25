"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createQueryString } from "@/lib/utils";

import { Button } from "./ui/button";

const Instructions = () => {
  const router = useRouter();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isInspectDetected, setIsInspectDetected] = useState(false);

  const toggleAlert = () => {
    setIsAlertVisible(!isAlertVisible);
  };

  const handleChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const detectConsoleOpen = () => {
    const threshold = 160;
    const isConsoleOpen =
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold;

    if (isConsoleOpen) {
      setIsInspectDetected(true);
      setIsAlertVisible(true);
    }
    return isConsoleOpen;
  };

  const handleStartClick = () => {
    if (isTermsChecked) {
      if (detectConsoleOpen()) {
        setIsInspectDetected(true);
      } else {
        // TODO: Check if already submitted the test
        // TODO: changes id path param
        router.push(`/test/${"12312412"}${createQueryString("", "")}`);
      }
    } else {
      toggleAlert();
    }
  };

  useEffect(() => {
    detectConsoleOpen();
  }, []);

  return (
    <main className="flex flex-col p-4">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold">
        Please read all the instructions carefully
      </h1>
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">General Instructions</h2>
        <ol className="ml-6 list-decimal space-y-1">
          <li>Total duration of the exam is 120mins</li>
          <li>
            The clock will be set at the server. The countdown timer in the top right corner of
            screen will display the remaining time available for you to complete the examination.
            When the timer reaches zero, the examination will end by itself. You will not be
            required to end or submit your examination.
          </li>
          <li>
            The Questions Palette displayed on the right side of screen will show the status of each
            question using one of the following symbols:
            <ol className="ol-roman ml-6">
              <li>You have not visited the question yet.</li>
              <li>You have not answered the question.</li>
              <li>You have answered the question.</li>
              <li>You have NOT answered the question, but have marked the question for review.</li>
              <li>
                The question(s) "Answered and Marked for Review" will be considered for evaluation.
              </li>
            </ol>
          </li>
          <li>{`You can click on the ">" arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on "<" which appears on the right side of question window.`}</li>
        </ol>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Navigating to a Question</h2>
        <ol className="ml-6 list-decimal space-y-1">
          <li>
            To answer the question, do the following:
            <ol className="ol-alphabetic ml-6">
              <li>
                Click on the question number in the Question Palette at the right of your screen to
                go to that numbered question directly.
                {/* <p className="italic text-gray-600">
                  Note that using this option does NOT save your answer to the
                  current question.
                </p> */}
              </li>
              <li>
                Click on Save & Next to save your answer for the current question and then go to the
                next question.
              </li>
              <li>
                Click on Mark for Review & Next to save your answer for the current question, mark
                it for review, and then go to the next question.
              </li>
            </ol>
          </li>
        </ol>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Answering a Question</h2>
        <ol className="ml-6 list-decimal space-y-1">
          <li>
            Procedure for answering a multiple choice type question:
            <ol className="ol-alphabetic ml-6">
              <li>To select your answer, click on the button of one of the options.</li>
              <li>
                To deselect your chosen answer, click on the button of the chosen option again or
                click on the Clear Response button.
              </li>
              <li>To change your chosen answer, click on the button of another option.</li>
              <li>To save your answer, you MUST click on the Save & Next button.</li>
              <li>To mark the question for review, click on the Mark for Review & Next button.</li>
            </ol>
          </li>
          <li>
            To change your answer to a question that has already been answered, first select that
            question for answering and then follow the procedure for answering that type of
            question.
          </li>
        </ol>
        <div className="mt-8 flex items-center space-x-4">
          <input
            type="checkbox"
            id="agree"
            name="agreement"
            checked={isTermsChecked}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 border-gray-300"
          />
          <label htmlFor="agree" className="flex-1 cursor-pointer text-sm text-blue-100">
            I have read and understood the instructions. All computer hardware allotted to me are in
            proper working condition. I declare that I am not in possession of / not wearing / not
            carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited
            material with me into the Examination Hall. I agree that in case of not adhering to the
            instructions, I shall be liable to be debarred from this Test and/or to disciplinary
            action, which may include ban from future Tests / Examinations.
          </label>
        </div>

        <div className="my-8 flex w-full justify-center">
          <Button
            className="bg-[#1b4bc4] text-white hover:bg-[#1b4bc47b]"
            onClick={handleStartClick}
          >
            Start Test
          </Button>
        </div>
      </div>
      <AlertDialog open={isAlertVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isInspectDetected ? "Alert" : "Hold on your horses!!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isInspectDetected
                ? "Inspecting is not allowed! Please close the inspect window in order to proceed"
                : "Please accept terms and conditions before proceeding."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={toggleAlert}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Instructions;
