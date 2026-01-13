"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getTranslations } from 'next-intl/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  success: boolean;
  fieldErrors?: { [key: string]: string[] } | null;
  message?: string | null;
};

export async function sendEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const t = await getTranslations("Contact.errors");

  const contactSchema = z.object({
    firstName: z.string().min(2, t("firstName_min")),
    lastName: z.string().min(2, t("lastName_min")),
    email: z.string().email(t("email_invalid")),
    subject: z.string().min(5, t("subject_min")),
    message: z.string().min(10, t("message_min")),
  });

  const validatedFields = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: t("generic"),
    };
  }

  const { firstName, lastName, email, subject, message } = validatedFields.data;

  try {
    // Note: If you don't have a verified domain on Resend, you must send to your own verified email
    // and "from" a generic onboarding address like 'onboarding@resend.dev'
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "megret.corentin@gmail.com", // Votre email personnel
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      text: `Message de ${firstName} ${lastName} (${email}):\n\n${message}`,
    });

    if (data.error) {
       return { success: false, message: "Erreur lors de l'envoi de l'email.", fieldErrors: null };
    }

    return { success: true, message: "Email envoyé avec succès !", fieldErrors: null };
  } catch (error) {
    return { success: false, message: "Une erreur servenu est survenue.", fieldErrors: null };
  }
}
