"use client";

import React, { useEffect, useState } from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUp } from "@/lib/auth";
type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z
    .object({
      name: type === "sign-in" ? z.string().optional() : z.string().min(3, "Name must be at least 3 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(3, "Password must be at least 3 characters"),
      confirmPassword: type === "sign-in" ? z.string().optional() : z.string().min(3, "Confirm password must be at least 3 characters"),
    })
    .refine(
      (data) => {
        if (type === "sign-up") {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords do not match",
        path: ["confirmPassword"], // path of error
      }
    );
};

const AuthForm: React.FC<{ type: FormType }> = ({ type }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      if (type === "sign-up") {
        const signUpResponse = await signUp({
          email: values.email,
          password: values.password,
          name: values.name as string,
        });
        console.log("signUpResponse", signUpResponse);

        // Check if signUpResponse indicates an error (adjust based on your signUp function's return)
        // For example, if it returns { error: "message" } or throws
        // if (signUpResponse && (signUpResponse as any).error) {
        //   setError((signUpResponse as any).error || "Sign-up failed. Please try again.");
        //   setIsLoading(false);
        //   return;
        // }

        // Optionally, sign in the user automatically after successful sign-up
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (signInResult?.error) {
          // If auto sign-in fails, redirect to sign-in page with a message or show error
          setError("Sign-up successful, but auto sign-in failed. Please sign in manually.");
          // router.push("/sign-in?message=signup_success_login_failed"); // Or handle as preferred
        } else if (signInResult?.ok) {
          router.push("/"); // Redirect to home/dashboard after successful sign-up and sign-in
        } else {
          // Fallback if signInResult is not ok and not an error (should ideally not happen with redirect:false)
          router.push("/sign-in"); // Or show a generic success message for sign-up
        }
      } else {
        // Sign-in logic
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          setError(result.error === "CredentialsSignin" ? "Invalid email or password." : "An unexpected error occurred during sign-in.");
        } else if (result?.ok) {
          router.push("/");
        } else {
          // Should not happen with redirect: false and proper error handling from NextAuth
          setError("An unknown error occurred during sign-in.");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Catch errors from signUp or other unexpected issues
      console.error("Form submission error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const isSignIn = type === "sign-in";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFail = (errors: any) => {
    // console.log("Form validation failed:", errors);
    // You can extract and display the first error, for example
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey && errors[firstErrorKey].message) {
      setError(errors[firstErrorKey].message);
    } else {
      setError("Please check the form for errors.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFail)} className="flex flex-col gap-5 w-full">
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={"Enter your name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={"Enter your email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={"Enter your password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {!isSignIn && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={"Confirm your password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          )}

          <Button className="btn" type="submit">
            {isLoading ? "Processing..." : type === "sign-in" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="underline underline-offset-4">
        {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
      </Link>
    </div>
  );
};

export default AuthForm;
