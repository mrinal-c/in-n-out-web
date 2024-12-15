"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionDialog } from "@/app/components/TransactionDialog";

export function ExpenseCell({ out }) {
  const { date, description, type, amount, payment } = out;

  const filename = (paymentName) => {
    switch (paymentName) {
      case "Venmo":
        return "venmo.png";
      case "AMEX Card":
        return "amex.png";
      case "Citi Card":
        return "citi.png";
      case "Ally Card":
        return "ally.png";
      case "Cash":
        return "cash.png";
      default:
        return "default.png";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription>
          {new Date(date).toDateString().slice(4)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>${amount}</p>
          <TransactionDialog out={out} />
        </div>
      </CardContent>
    </Card>
  );
}
