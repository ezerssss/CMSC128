import { ExpenseTypeEnum } from "@/app/enums/expense";
import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const ExpenseSchema = z.object({
  expenseID: z.string().min(1),
  title: z.string().min(1),
  amount: z.number().nonnegative(),
  category: z.nativeEnum(ExpenseTypeEnum),
  description: z.string(),
  date: z.instanceof(Timestamp),
});

export type ExpenseType = z.infer<typeof ExpenseSchema>;

export const NewExpenseRequestSchema = ExpenseSchema.omit({
  expenseID: true,
  date: true,
}).extend({ shopID: z.string().min(1), date: z.string().date() });

export type NewExpenseRequestType = z.infer<typeof NewExpenseRequestSchema>;

export const NewExpenseFormSchema = NewExpenseRequestSchema.omit({
  shopID: true,
  amount: true,
}).extend({ amount: z.coerce.number().nonnegative() });

export type NewExpenseFormType = z.infer<typeof NewExpenseFormSchema>;
