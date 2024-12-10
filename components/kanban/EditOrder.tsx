"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  DeleteOrderRequestType,
  EditOrderFormSchema,
  EditOrderFormType,
  EditOrderRequestType,
  OrderType,
} from "@/app/types/client/item";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import {
  LogisticsOptions,
  PaymentOptions,
  ServicesOptions,
} from "@/app/constants/options";
import { Loader2 } from "lucide-react";
import useShopID from "@/app/store";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import useUser from "@/app/hooks/useUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import copy from "copy-to-clipboard";

interface PropsInterface {
  order: OrderType;
  isOpen: boolean;
  handleOnOpenChange: (open: boolean) => void;
}

function EditOrder(props: PropsInterface) {
  const { isOpen, handleOnOpenChange, order } = props;
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const { shopID } = useShopID();

  const form = useForm<EditOrderFormType>({
    resolver: zodResolver(EditOrderFormSchema),
    defaultValues: {
      name: order.name,
      address: order.address ?? "",
      services: order.services,
      logistics: order.logistics,
      bag: order.bag,
      weight: order.weight,
      price: order.price,
      paymentStatus: order.paymentStatus,
    },
    disabled: isLoading,
  });

  async function onSubmit(values: EditOrderFormType) {
    if (!shopID || !user) {
      // Should not happen, but just in case.
      toast.error("Necessary preconditions failed.");
      return;
    }

    try {
      setIsLoading(true);

      const editOrderRequest: EditOrderRequestType = {
        userID: user.uid,
        shopID,
        orderID: order.orderID,
        orderData: values,
      };

      const res = await fetch("/api/order/edit", {
        method: "POST",
        body: JSON.stringify(editOrderRequest),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { message } = await res.json();

      form.reset();
      toast.success(message);
      handleOnOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!shopID || !user) {
      // Should not happen, but just in case.
      toast.error("Necessary preconditions failed.");
      return;
    }

    try {
      setIsLoading(true);

      const editOrderRequest: DeleteOrderRequestType = {
        userID: user.uid,
        shopID,
        orderID: order.orderID,
      };

      const res = await fetch("/api/order/delete", {
        method: "POST",
        body: JSON.stringify(editOrderRequest),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { message } = await res.json();

      form.reset();
      toast.success(message);
      handleOnOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    const copySuccess = copy(
      `https://laba-da-beta.vercel.app/tracker?orderID=${order.orderID}&shopID=${shopID}`
    );

    if (copySuccess) {
      toast.success("Customer tracking link copied to your clipboard.");
    } else {
      toast.error("Failed to copy customer tracking link to clipboard.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent className="max-w-[85%] md:max-w-2xl">
        <DialogHeader className="flex justify-center gap-0">
          <DialogTitle className="text-2xl">Edit Order</DialogTitle>
          <button
            className="cursor-pointer text-sm text-gray-400 underline sm:text-left"
            onClick={handleCopy}
          >
            Click to copy customer's tracking link.
          </button>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold">Customer Info</h2>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Edit customer's name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter customer's address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h2 className="text-xl font-bold">Laundry Details</h2>
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          min={1}
                          placeholder="Enter weight in kilos"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₱)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer's bag" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold">Service details</h2>
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field: { onChange, value, ref } }) => (
                    <FormItem>
                      <FormLabel>Services availed</FormLabel>
                      <FormControl>
                        <Select
                          isMulti
                          className="h-9"
                          ref={ref}
                          isDisabled={isLoading}
                          value={ServicesOptions.filter((c) =>
                            value.includes(c.value)
                          )}
                          onChange={(val) => onChange(val.map((c) => c.value))}
                          options={ServicesOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logistics"
                  render={({ field: { onChange, value, ref } }) => (
                    <FormItem>
                      <FormLabel>Logistics</FormLabel>
                      <FormControl>
                        <Select
                          className="h-9"
                          ref={ref}
                          isDisabled={isLoading}
                          value={LogisticsOptions.find(
                            (c) => c.value === value
                          )}
                          onChange={(val) => onChange(val?.value)}
                          options={LogisticsOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field: { onChange, value, ref } }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <FormControl>
                        <Select
                          className="h-9"
                          ref={ref}
                          isDisabled={isLoading}
                          value={PaymentOptions.find((c) => c.value === value)}
                          onChange={(val) => onChange(val?.value)}
                          options={PaymentOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="mr-2 bg-red-500"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the order and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="button"
                      disabled={isLoading}
                      className="bg-red-500 hover:bg-red-500/90"
                      onClick={handleDelete}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : "Edit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrder;
