import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { NewOrderFormSchema, NewOrderFormType } from "@/app/types/client/item";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogisticsEnum, ServicesEnum } from "@/app/enums/services";
import { PaymentStatusEnum } from "@/app/enums/payment";
import { BoardStatusEnum } from "@/app/enums/board";
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
  BoardStatusOptions,
  LogisticsOptions,
  PaymentOptions,
  ServicesOptions,
} from "@/app/constants/options";

function NewOrder() {
  const form = useForm<NewOrderFormType>({
    resolver: zodResolver(NewOrderFormSchema),
    defaultValues: {
      name: "",
      address: "",
      services: [ServicesEnum.WASH],
      logistics: LogisticsEnum.DELIVERY,
      bag: "",
      weight: 1,
      price: 100,
      paymentStatus: PaymentStatusEnum.UNPAID,
      boardStatus: BoardStatusEnum.TO_BE_PICKED_UP,
    },
  });

  function onSubmit(values: NewOrderFormType) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-5">New order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">New Order</DialogTitle>
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
                        <Input {...field} placeholder="Enter customer's name" />
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
                          value={PaymentOptions.find((c) => c.value === value)}
                          onChange={(val) => onChange(val?.value)}
                          options={PaymentOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="boardStatus"
                  render={({ field: { onChange, value, ref } }) => (
                    <FormItem>
                      <FormLabel>Board Status</FormLabel>
                      <FormControl>
                        <Select
                          className="h-9"
                          ref={ref}
                          value={BoardStatusOptions.find(
                            (c) => c.value === value
                          )}
                          onChange={(val) => onChange(val?.value)}
                          options={BoardStatusOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewOrder;
