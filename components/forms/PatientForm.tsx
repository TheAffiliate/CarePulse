"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import PhoneInput from "react-phone-number-input";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

interface CustomProps {}

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  DATE_PICKER = 'datePicker',
  SKELETON = 'skeleton',
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    }
  });

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    // Submit the form values.
    // ✅ This will be type-safe and validated.

    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      // Logging the user object returned from createUser
      console.log('User returned from createUser:', user);

      // Redirect to the registration page regardless of user creation
      if (user && user.$id) {
        router.push(`/patients/${user.$id}/register`);
      } else {
        router.push('/patients/register');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there! 👋</h1>
          <p className="text-dark-700">Schedule Your Appointment.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Mfundo Kuhlase"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="E-mail"
          placeholder="DrKuhlase@medixhub.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(012) 345 6789"
          iconSrc="/assets/icons/"
          iconAlt=""
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;