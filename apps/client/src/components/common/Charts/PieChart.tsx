import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: any;
}

export default function PieChart({ data }: PieChartProps) {
  return <Pie className="w-full h-full" data={data} />;
}
