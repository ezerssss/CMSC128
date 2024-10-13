"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { LoginFormSchema, LoginFormType } from "../types/client/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import { signInWithEmailAndPassword } from "firebase/auth";
import clientAuth from "../firebase/clientAuth";
import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    disabled: isLoading,
  });

  async function onSubmit(values: LoginFormType) {
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(
        clientAuth,
        values.email,
        values.password
      );

      router.push(searchParams.get("backTo") ?? "/");
      toast.success("Successfully logged in.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF] p-4">
      <Card className="w-full max-w-4xl overflow-hidden bg-white shadow-lg md:flex">
        <div className="relative w-2/5">
          <Image
            src="/images/login/log-in-bg-2.JPG"
            alt="Illustration"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative p-4">
            <Image
              src="/images/logo/name-logo.png"
              alt="Brand Logo"
              width={250}
              height={100}
              className="left-0 top-0"
            />
          </div>
        </div>
        <div className="w-3/5 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
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
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4 flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="rememberMe" checked />
                    <label
                      htmlFor="rememberMe"
                      className="ml-1 cursor-pointer text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col items-center space-y-4">
                <Button className="w-full bg-[#173563] hover:bg-[#1E4C8A]">
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
