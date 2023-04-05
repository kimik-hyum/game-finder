// pages/api/graph.ts
import { NextApiRequest, NextApiResponse } from "next";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration } from "chart.js";

const generateGraphImage = async (): Promise<Buffer> => {
  const width = 800;
  const height = 600;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const chartConfiguration: ChartConfiguration<"line"> = {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Example Data",
          data: [10, 12, 5, 9, 17, 15, 25, 20, 30, 28, 32, 40],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return chartJSNodeCanvas.renderToBuffer(chartConfiguration);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const imageBuffer = await generateGraphImage();
    const base64Image = imageBuffer.toString("base64");

    res.status(200).json({ base64Image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating graph image" });
  }
}
