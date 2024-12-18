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
import { CalendarIcon, Edit } from "lucide-react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { addOut, editTransaction, deleteTransaction } from "@/redux/slices/expensesSlice";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//constant types and payments arrays
const types = [
  "Personal",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Big Ticket",
  "Groceries",
  "Travel",
];
const payments = ["Cash", "AMEX Card", "Citi Card", "Ally Card", "Venmo"];

export const OutForm = ({ out }) => {
  //hooks
  const dispatch = useAppDispatch();

  //local state
  const [open, setOpen] = useState(false);

  //form helpers
  const formSchema = z.object({
    date: z.date(),
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
      out != null
        ? { ...out, date: new Date(out.date) }
        : {
            date: new Date(),
            description: "",
            type: "",
            payment: "",
            tags: [],
            amount: 0.0,
          },
  });

  const onSubmit = (value) => {
    value.date = value.date.toISOString().split("T")[0];
    if (out != null) {
      dispatch(editTransaction({ ...value, _id: out._id }));
    } else {
      dispatch(addOut(value));
    }
    setOpen(false);
  };

  const removeOut = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(out));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{out != null ? <Edit /> : "Add"}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add an Out</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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
                  <FormLabel>Topics</FormLabel>
                  <FormControl>
                    <TagInput
                      tags={field.value}
                      setTags={(newTags) => {
                        form.setValue("tags", newTags);
                      }}
                      maxLength={30}
                      maxTags={5}
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
        <DialogFooter>
          <div className="flex gap-4">
            <Button type="submit" form="form">
              Submit
            </Button>
            {out != null && (
              <Button type="button" variant="destructive" onClick={removeOut}>
                Remove
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
