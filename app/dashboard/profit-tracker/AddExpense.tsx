"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useUser from "@/app/hooks/useUser";
import useShopID from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ExpenseTypeEnum } from "@/app/enums/expense";
import {
  NewExpenseFormSchema,
  NewExpenseFormType,
  NewExpenseRequestType,
} from "@/app/types/client/expense";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Timestamp } from "firebase/firestore";
import Select from "react-select";
import { ExpenseTypeOptions } from "@/app/constants/options";
import { getInputDateLocaleDefaultValue } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function AddExpense() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const { shopID } = useShopID();

  const form = useForm<NewExpenseFormType>({
    resolver: zodResolver(NewExpenseFormSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: ExpenseTypeEnum.LABOR,
      description: "",
      date: getInputDateLocaleDefaultValue(new Date()),
    },
    disabled: isLoading,
  });

  async function onSubmit(values: NewExpenseFormType) {
    if (!shopID || !user) {
      // Should not happen, but just in case.
      toast.error("Necessary preconditions failed.");
      return;
    }

    try {
      setIsLoading(true);

      const newExpenseRequest: NewExpenseRequestType = {
        ...values,
        shopID,
      };

      const res = await fetch("/api/expense/add", {
        method: "POST",
        body: JSON.stringify(newExpenseRequest),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { message } = await res.json();

      form.reset();
      toast.success(message);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter expense title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter expense amount"
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      isDisabled={isLoading}
                      className="h-9"
                      ref={ref}
                      value={ExpenseTypeOptions.find((c) => c.value === value)}
                      onChange={(val) => onChange(val?.value)}
                      options={ExpenseTypeOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter expense description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter expense date"
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpense;
