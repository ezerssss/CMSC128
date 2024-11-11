import { toast } from "sonner";

export function getErrorMessage(error: unknown): string {
  let message = "Something went wrong.";

  if (error instanceof Error) {
    message = error.message;
  }

  return message;
}
