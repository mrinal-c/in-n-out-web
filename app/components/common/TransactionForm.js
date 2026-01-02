// components/TransactionModal.js
"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { TagInput } from "@/components/ui/tag-input";
import { CalendarIcon, Edit, LoaderCircleIcon } from "lucide-react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "@/redux/slices/expensesSlice";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { parseTransactionAPI } from "@/lib/api";

// const payments = ["Cash", "AMEX Card", "Citi Card", "Ally Card", "Venmo", "Venture X", "Discover Card"];

export const TransactionForm = ({ transaction, isOut }) => {
  //hooks
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { payments } = user;

  //local state
  const [open, setOpen] = useState(false);
  const [transactionText, setTransactionText] = useState("");
  const [hideTextbox, setHideTexbox] = useState(!!transaction);
  const [parsingMessage, setParsingMessage] = useState(undefined);
  const [isParsing, setIsParsing] = useState(false);

  //form helpers
  const formSchema = z.object({
    transactionDate: z.date(),
    description: z.string().max(100, {
      message: "Description cannot be longer than 100 characters",
    }),
    payment: z.enum(payments, { message: "Please pick a payment" }),
    amount: z.coerce.number().nonnegative(),
    tags: z
      .array(z.string())
      .nonempty({ message: "Must have at least one tag" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      transaction != null
        ? {
            ...transaction,
            transactionDate: new Date(transaction.transactionDate),
          }
        : {
            transactionDate: new Date(),
            description: "",
            type: "",
            payment: "",
            tags: [],
            amount: 0.0,
          },
  });

  const onSubmit = (value) => {
    value.transactionDate = value.transactionDate.toISOString().split("T")[0];
    if (transaction != null) {
      dispatch(editTransaction({ ...value, _id: transaction._id, out: isOut }));
    } else {
      dispatch(addTransaction({ ...value, out: isOut }));
    }
    setOpen(false);
  };

  const removeTransaction = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(transaction));
  };

  const parseTransactionDescription = async () => {
    setIsParsing(true);
    setParsingMessage(<p className="font-red-300">Error while parsing :/</p>)
    const parsedTransaction = await parseTransactionAPI(transactionText);
    parsedTransaction.transactionDate = new Date(
      parsedTransaction.transactionDate
    );
    const result = formSchema.safeParse(parsedTransaction);
    if (result.success) {
      form.setValue("description", parsedTransaction.description);
      form.setValue("amount", parsedTransaction.amount);
      form.setValue("tags", parsedTransaction.tags || []);
      form.setValue("payment", parsedTransaction.payment || "");
      form.setValue(
        "transactionDate",
        parsedTransaction.transactionDate
          ? new Date(parsedTransaction.transactionDate)
          : new Date()
      );
      setHideTexbox(true);
      setTransactionText("");
      setIsParsing(false);
    } else {
      setParsingMessage(result.error)
    }
  };

  const skipToManualEntry = () => {
    setHideTexbox(true);
    setTransactionText("");
  };

  const onOpenChangeHandler = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      setHideTexbox(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger>{transaction != null ? <Edit /> : "Add"}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add an {isOut ? "Out" : "In"}</DialogTitle>
        </DialogHeader>

        {!hideTextbox ? (
          <section className="flex flex-col gap-3">
            <p className="font-semibold"> AI-Powered Upload</p>
            <Textarea
              placeholder="Describe your transaction"
              value={transactionText}
              onChange={(e) => setTransactionText(e.target.value)}
            />
          </section>
        ) : (
          <Form {...form}>
            <form
              id="transaction-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagInput
                        tags={field.value}
                        settags={(newTags) => {
                          form.setValue("tags", newTags);
                        }}
                        maxLength={30}
                        maxtags={5}
                        inputField={field}
                      ></TagInput>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {payments.map((payment) => (
                          <SelectItem key={payment} value={payment}>
                            {payment}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
        <DialogFooter>
          <div className="flex gap-4 items-center">
            {!hideTextbox ? (
              <>
                {isParsing ? (
                  <Button type="button" disabled>
                    <p className="animate-pulse">Loading...</p>
                  </Button>
                ) : (
                  <>
                    <Button onClick={parseTransactionDescription}>
                      Parse with AI
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={skipToManualEntry}
                    >
                      Skip to Manual Entry
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button type="submit" form="transaction-form">
                  Submit
                </Button>
                {transaction != null && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={removeTransaction}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
