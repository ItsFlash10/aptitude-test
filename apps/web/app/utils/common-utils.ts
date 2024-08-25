import { QuestionStatus } from "@repo/common/config";

export const getQuestionColorAndText = (status: QuestionStatus | string) => {
  let color: string;
  let label: string;
  let labelColor: string;
  let summaryColor: string;

  switch (status) {
    case QuestionStatus.Visited:
      color = "bg-[#e30746]";
      label = "Not Answered";
      labelColor = "text-red-950";
      summaryColor = "border-[#e30746]";
      break;
    case QuestionStatus.Answered:
      color = "bg-[#00cd4d]";
      label = "Answered";
      labelColor = "text-green-950";
      summaryColor = "border-[#00cd4d]";
      break;
    case QuestionStatus.ReviewWithAnswer:
      color = "bg-[#b30dd7]";
      label = "Answered and marked for Review";
      labelColor = "text-purple-950";
      summaryColor = "border-[#b30dd7]";
      break;
    case QuestionStatus.ReviewWithoutAnswer:
      color = "bg-[#e8b020]";
      label = "Marked for Review";
      labelColor = "text-yellow-950";
      summaryColor = "border-[#e8b020]";
      break;
    default:
      color = "bg-slate-700";
      label = "Not Visited";
      labelColor = "text-slate-300";
      summaryColor = "border-slate-200";
      break;
  }
  return { color, label, labelColor, summaryColor };
};
