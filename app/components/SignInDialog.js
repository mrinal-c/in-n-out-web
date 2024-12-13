"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Eye, EyeOff } from "lucide-react";

import { login, clearError } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch, useAppStore } from "../../redux/hooks";

export const SignInDialog = () => {
  //hooks
  const dispatch = useAppDispatch();

  //local state
  const [showPassword, setShowPassword] = useState(false);

  //form helpers
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Hmm... this doesn't seem to be a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Into In-N-Out</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {" "}
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
