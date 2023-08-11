import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: any;
}

export default function DoughnutChart({ data }: DoughnutChartProps) {
  return <Doughnut className="w-full h-full" data={data} />;
}
