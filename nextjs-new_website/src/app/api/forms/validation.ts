import { z } from 'zod';

export const formTypeSchema = z.enum(['volunteer', 'subscribe', 'contact']);

export const baseFormSchema = z.object({
  formType: formTypeSchema,
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  message: z.string().trim().min(1, 'Message is required').max(5000),
});

export const volunteerFormSchema = baseFormSchema.extend({
  formType: z.literal('volunteer'),
  interest: z.string().trim().min(1, 'Please select an interest option').max(200),
});

export const subscribeFormSchema = baseFormSchema.extend({
  formType: z.literal('subscribe'),
  subject: z.string().trim().min(1, 'Please provide a subject').max(200),
});

export const contactFormSchema = baseFormSchema.extend({
  formType: z.literal('contact'),
  subject: z.string().trim().min(1, 'Please provide a subject').max(200),
});

export const formSchema = z.union([
  volunteerFormSchema,
  subscribeFormSchema,
  contactFormSchema,
]);

export function parseFormPayload(input: unknown) {
  return formSchema.safeParse(input);
}
