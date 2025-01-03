"use client";
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
import { TagInput } from "@/components/ui/tag-input";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { updateUserTable } from "@/redux/slices/userSlice";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const EditUserTableForm = ({ isOut }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { outTable, inTable } = user;
  const table = isOut ? outTable : inTable;

  //local state
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    category: z
      .string()
      .min(1, { message: "Category cannot be empty" })
      .refine((value) => !table.some((entry) => entry.category === value), {
        message: "Categories must be unique!",
      }),
    tags: z
      .array(
        z.string().min(1, "Cannot have empty tag").max(30, "Tag is too long")
      )
      .min(1, "Must have at least one tag")
      .max("No more than 5 tags")
      .refine((items) => new Set(items).size === items.length, {
        message: "Must be an array of unique strings",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      tags: [],
    },
  });

  const onSubmit = (value) => {
    dispatch(updateUserTable({ table: [...table, value], isOut }));
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id={`form-${isOut}`}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
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
          </form>
        </Form>
        <DialogFooter>
          <div className="flex gap-4">
            <Button type="submit" form={`form-${isOut}`}>
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
