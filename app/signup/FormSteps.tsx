"use client";

import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormType } from "../types/client/auth";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormStepProps {
  form: UseFormReturn<SignUpFormType, any, undefined>;
}

export function FormStepOne(props: Readonly<FormStepProps>) {
  const { form } = props;

  return (
    <div className="space-y-3">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter your email"
                className="rounded-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="password"
                placeholder="Enter your password"
                className="rounded-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="password"
                placeholder="Confirm your password"
                className="rounded-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function FormStepTwo(
  props: FormStepProps & {
    imageBlob: null | File;
    setImageBlob: Dispatch<SetStateAction<File | null>>;
  }
) {
  const { form, imageBlob, setImageBlob } = props;
  const imageURL = imageBlob ? URL.createObjectURL(imageBlob) : "";

  return (
    <>
      <FormField
        control={form.control}
        name="laundryShopImage"
        render={({ field }) => (
          <FormItem className="text-center">
            <FormLabel htmlFor="imageUpload" className="cursor-pointer">
              {imageURL ? (
                <Image
                  src={imageURL}
                  alt="Profile Photo"
                  width={100}
                  height={100}
                  className="mx-auto rounded-full"
                />
              ) : (
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                  <Upload size={30} className="text-gray-500" />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChangeCapture={(event) => {
                  const target = event.target as HTMLInputElement;

                  if (!target?.files) {
                    return;
                  }

                  setImageBlob(target.files[0]);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="laundryShopName"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Laundry Shop Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter your shop name"
                className="rounded-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numMachines"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Number of Machines</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="Enter number of machines"
                className="rounded-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
