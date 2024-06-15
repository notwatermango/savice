import { type AllData } from "./page";

interface AnalysisResultProps {
  data: AllData;
}

export default function AnalysisResult({ data }: AnalysisResultProps) {
  return <div className="flex flex-col gap-2"></div>;
}
