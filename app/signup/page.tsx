"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignUpFormSchema, SignUpFormType } from "../types/client/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import clientStorage from "../firebase/clientStorage";
import { getErrorMessage } from "@/lib/error";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
import clientAuth from "../firebase/clientAuth";
import { toast } from "sonner";
import { FormStepOne, FormStepTwo } from "./FormSteps";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [imageBlob, setImageBlob] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signUpForm = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      laundryShopName: "",
      laundryShopImage: "",
    },
    disabled: isLoading,
  });

  async function onSubmit(values: SignUpFormType) {
    if (!imageBlob) {
      return;
    }

    let user: User | null = null;

    try {
      setIsLoading(true);

      user = (
        await createUserWithEmailAndPassword(
          clientAuth,
          values.email,
          values.password
        )
      ).user;

      // Upload picture client side.
      const pictureRef = ref(
        clientStorage,
        `/images/profiles/${values.email}/${values.laundryShopName}`
      );

      const upload = await uploadBytes(pictureRef, imageBlob);
      const photoUrl = await getDownloadURL(upload.ref);

      values.laundryShopImage = photoUrl;
      const { password, confirmPassword, ...data } = values;

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          uid: user.uid,
        }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { message } = (await res.json()) as { message: string };

      signUpForm.reset();
      setImageBlob(null);
      toast.success(message);
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));

      if (user) {
        await deleteUser(user);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleNextButton() {
    const valid = await signUpForm.trigger([
      "email",
      "password",
      "confirmPassword",
    ]);

    if (valid) {
      setStep(2);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF] p-4">
      <Card className="h-[600px] w-[1000px] overflow-hidden bg-white shadow-lg md:flex">
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

        <div className="flex w-3/5 flex-col justify-center p-8">
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="mt-4">
                <Progress value={(step / 2) * 100} className="mx-auto w-1/3" />
                <div className="mx-auto mt-2 text-center text-gray-600">
                  {step} of 2
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                <CardDescription>
                  {step === 1
                    ? "Create an account to get started."
                    : "Complete your profile to continue."}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {step === 1 ? (
                  <FormStepOne form={signUpForm} />
                ) : (
                  <FormStepTwo
                    form={signUpForm}
                    imageBlob={imageBlob}
                    setImageBlob={setImageBlob}
                  />
                )}
              </CardContent>

              <CardFooter className="mt-4 flex w-full flex-col items-center space-y-4">
                <div className="flex w-full justify-between">
                  {step === 1 ? (
                    <Button
                      onClick={handleNextButton}
                      className="ml-auto bg-[#173563] text-white hover:bg-[#1E4C8A]"
                      type="button"
                    >
                      Next
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => setStep(1)}
                        className="bg-gray-500 text-white hover:bg-gray-600"
                        type="button"
                      >
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        className="ml-auto bg-[#173563] text-white hover:bg-[#1E4C8A]"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </>
                  )}
                </div>

                <div className="mt-4 w-full text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Log In
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
