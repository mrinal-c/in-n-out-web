"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionForm } from "@/app/components/common/TransactionForm.js";

export function TransactionCard({ transaction }) {
  const { date, description, amount, out } = transaction;

  return (
    <Card className={`flex flex-col justify-between ${out ? "" : "border-black border-4 border-solid"}`}>
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription>
          {new Date(date).toDateString().slice(4)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>${amount}</p>
          <TransactionForm transaction={transaction} isOut={out} />
        </div>
      </CardContent>
    </Card>
  );
}
