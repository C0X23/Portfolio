"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { sendEmail, type ContactState } from "@/app/actions";
import { useTranslations } from "next-intl";

const initialState: ContactState = {
  success: false,
  fieldErrors: null,
  message: null,
};

export function Contact() {
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="py-24 bg-stone-50 dark:bg-stone-950 relative border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-500 dark:from-stone-100 dark:to-stone-400 mb-6">
              {t("title")}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg mb-8 max-w-md">
              {t("description")}
            </p>

            <div className="space-y-6">
              <ContactItem icon={<Mail className="w-6 h-6" />} text="megret.corentin@gmail.com" href="mailto:megret.corentin@gmail.com" />
              <ContactItem icon={<Phone className="w-6 h-6" />} text="+33 6 16 43 76 44" href="tel:+33616437644" />
              <ContactItem icon={<MapPin className="w-6 h-6" />} text={t("location")} />
            </div>
          </motion.div>

          {state.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[400px]"
            >
              <h3 className="text-2xl font-bold mb-2">{t("success_title")}</h3>
              <p className="text-stone-600">
                {t("success_msg")}
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
              action={formAction}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input name="lastName" placeholder={t("placeholders.lastName")} required />
                  {state.fieldErrors?.lastName && (
                    <p className="text-red-500 text-xs mt-1">{state.fieldErrors.lastName[0]}</p>
                  )}
                </div>
                <div>
                  <Input name="firstName" placeholder={t("placeholders.firstName")} required />
                  {state.fieldErrors?.firstName && (
                    <p className="text-red-500 text-xs mt-1">{state.fieldErrors.firstName[0]}</p>
                  )}
                </div>
              </div>
              <div>
                <Input name="email" type="email" placeholder={t("placeholders.email")} required />
                {state.fieldErrors?.email && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.email[0]}</p>
                )}
              </div>
              <div>
                <Input name="subject" placeholder={t("placeholders.subject")} required />
                {state.fieldErrors?.subject && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.subject[0]}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  className="w-full h-32 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-500/50 transition-all resize-none shadow-sm placeholder:text-stone-400 dark:placeholder:text-stone-400"
                  placeholder={t("placeholders.message")}
                  required
                />
                {state.fieldErrors?.message && (
                  <p className="text-red-500 text-xs mt-1">{state.fieldErrors.message[0]}</p>
                )}
              </div>
              {!state.success && state.message && (
                 <p className="text-red-500 text-sm text-center">{state.message}</p>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? t("sending") : t("send")}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-50 transition-colors">
      <span className="p-3 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 group-hover:border-stone-300 dark:group-hover:border-stone-600 shadow-sm transition-all">
        {icon}
      </span>
      <span className="text-lg">{text}</span>
    </div>
  );

  return href ? (
    <a href={href} className="block group">
      {content}
    </a>
  ) : (
    <div className="group">{content}</div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-500/50 transition-all shadow-sm placeholder:text-stone-400 dark:placeholder:text-stone-400"
    />
  );
}
