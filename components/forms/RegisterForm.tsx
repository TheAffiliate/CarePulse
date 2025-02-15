"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { Doctors, GenderOptions } from "@/constants";
import { SelectItem } from "@/components/ui/select";

interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: Date | null;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
}

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        gender: z.string(),
        birthDate: z.date().nullable(),
        address: z.string().min(5),
        occupation: z.string().optional(),
        emergencyContactName: z.string().min(2),
        emergencyContactNumber: z.string().min(10),
        primaryPhysician: z.string(),
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      birthDate: null,
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
    },
  });

  async function onSubmit(values: UserFormValues) {
    setIsLoading(true);
    try {
      console.log("Submitting form data:", values);
      const user = await createUser(values);

      if (user && user.$id) {
        router.push(`/patients/${user.$id}/register`);
      } else {
        router.push("/patients/register");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome! 👋</h1>
          <p className="text-dark-700">Tell Us More About Yourself.</p>
        </section>

        <section className="space-y-6">
          <h2 className="sub-header">Personal Information:</h2>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Mfundo Kuhlase"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User Icon"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="E-mail"
            placeholder="DrKuhlase@medixhub.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email Icon"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(012) 345 6789"
            iconAlt="Phone Icon"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date Of Birth"
            iconAlt="Calendar Icon"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            iconAlt=""
            renderSkeleton={({ value, onChange }) => (
              <FormControl>
                <div className="flex flex-wrap gap-4">
                  {GenderOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                        value === option
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      } hover:bg-blue-100 hover:border-blue-400`}
                      onClick={() => onChange(option)}
                    >
                      <Controller
                        name="gender"
                        control={form.control}
                        render={({ field }) => (
                          <input
                            type="radio"
                            value={option}
                            checked={field.value === option}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="hidden"
                          />
                        )}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="Diepkloof Ext, Johannesburg"
            iconAlt=""
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Medical Doctor"
            iconAlt=""
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
            iconAlt="Emergency Contact Icon"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(012) 345 6789"
            iconAlt="Phone Icon"
          />
        </div>

        <section className="space-y-6">
          <h2 className="sub-header">Medical Information:</h2>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select A Physician"
          iconAlt="Doctor Icon"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex items-center gap-2">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 border border-dark-500" />
                )}
                {doctor.name}
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="MedicalAidProvider"
            label="Medical-Aid Provider"
            placeholder="Discovery Health"
            iconAlt=""
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="MedicalAidNumber"
            label="Medical-Aid Number"
            placeholder="Your Membership number"
            iconAlt=""
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Pollen, etc."
            iconAlt=""
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication (if any)"
            placeholder="Neo-Mercazole (20mg), Paracetemol (500mg), etc."
            iconAlt=""
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Diabetes, Hypertension, etc."
            iconAlt=""
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Appendectomy, etc."
            iconAlt=""
          />
        </div>

        <section className="space-y-6">
          <h2 className="sub-header">Identification & Verification:</h2>
        </section>

        
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
