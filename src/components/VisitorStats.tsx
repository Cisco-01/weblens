"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
const chartData = [{ month: "january", desktop: 670, mobile: 1260 }];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function VisitorStats() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 z-30">
        <CardTitle
          className="uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
          3xl:text-6xl text-[#181A1B] text-center bg-clip-text text-white/25 
          bg-gradient-to-r from-emerald-600 via-emerald-600/85 to-zinc-900
          my-3 dark:text-white/85 dark:bg-clip-text"
        >
          WEB LENS
        </CardTitle>
        <CardDescription className="3xl:text-2xl z-50">
          <Link
            href="https://giovcasle.vercel.app"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 hover:underline hover:decoration-current animate-x"
          >
            Powered by DevG <TrendingUp className="h-4 w-4 hover:scale-105" />
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 z-30">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] h-auto"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="dashed" />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }: any) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy || 0}
                          className="fill-foreground text-2xl font-bold 3xl:text-3xl"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 25}
                          className="fill-muted-foreground 3xl:text-lg"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-8 text-sm z-30 3xl:gap-4">
        <div className="grid items-center gap-2 font-medium leading-none text-center text-sm md:text-base 3xl:text-2xl">
          <span>Take snapshots with your current camera quality</span>
          <span>and save them in .PNG 🤳</span>
          <span>Or record videos on any of your devices 📹</span>
        </div>
        <div className="leading-none text-muted-foreground 3xl:text-xl">
          All in one place
        </div>
      </CardFooter>
    </Card>
  );
}
