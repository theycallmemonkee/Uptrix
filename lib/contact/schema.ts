import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120, "Name is too long"),
  email: z.email("Enter a valid email address").max(160, "Email is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000, "Message is too long"),
  honey: z.string().optional().default(""),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
