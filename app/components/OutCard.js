"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OutForm } from "@/app/components/OutForm.js";

export function OutCard({ out }) {
  const { date, description, amount } = out;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription>
          {new Date(date).toDateString().slice(4)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>${amount}</p>
          <OutForm out={out} />
        </div>
      </CardContent>
    </Card>
  );
}
