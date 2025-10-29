"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { register, handleSubmit } = useForm<ContactFormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log(data["name"], data["email"], data["message"]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-100 max-w-xl"
    >
      <h2 className="text-xl font-semibold mb-4">Зв&apos;язатися з нами</h2>
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ім&apos;я
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ваше ім&apos;я"
            {...register("name", { required: "Вкажіть ім&apos;я" })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            {...register("email", {
              required: "Вкажіть email",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Некоректний email",
              },
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Повідомлення
          </label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ваше повідомлення..."
            {...register("message", {
              required: "Вкажіть повідомлення",
              minLength: { value: 10, message: "Мінімум 10 символів" },
            })}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Done
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
