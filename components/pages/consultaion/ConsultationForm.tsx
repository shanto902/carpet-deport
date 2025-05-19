/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { formatPhone } from "@/components/form/formInput";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  number: z
    .string()
    .regex(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Phone number must be in (###) ###-#### format"
    ),
  store: z.string().min(1, "Please select your store"),
  productTypes: z.array(z.string()).optional(),
  questions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function InStoreConsultationForm() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    store: "",
    productTypes: [],
    questions: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        productTypes: checked
          ? [...(prev.productTypes || []), value]
          : prev.productTypes?.filter((item) => item !== value) || [],
      }));
    } else {
      const newValue = name === "number" ? formatPhone(value) : value;
      setForm({ ...form, [name]: newValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as any);
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    setErrors({});

    // Show loading notification
    const toastId = toast.loading("Submitting your request...");

    try {
      const res = await fetch("/api/jotform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.success) {
        toast.success("Form submitted successfully!", { id: toastId });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          store: "",
          productTypes: [],
          questions: "",
        });
      } else {
        toast.error(`Submission failed: ${json.error}`, { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again later.", {
        id: toastId,
      });
    }
  };

  const storeOptions = [
    "DECATUR",
    "DOUGLASVILLE",
    "JONESBORO",
    "MABLETON",
    "ROSWELL",
    "SNELLVILLE",
    "WOODSTOCK",
  ];

  const productOptions = [
    "CARPET",
    "VINYL",
    "LUXURY VINYL",
    "HARDWOOD",
    "LAMINATE",
    "STAIN RESISTANT",
    "UNDECIDED",
    "OTHER",
  ];

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-secondary p-10 rounded-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Request An In-store Consultation
            </h2>
            <p className="text-gray-500 mt-1">
              Meet One-On-One With One Of Our Flooring Specialists For Design
              Assistance & A FREE Estimate
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-gray-100 px-4 py-3 rounded-full focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-gray-100 px-4 py-3 rounded-full focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-100 px-4 py-3 rounded-full focus:outline-none"
              />
              <input
                id="number"
                type="tel"
                inputMode="numeric"
                name="number"
                placeholder="Phone Number"
                value={form.number}
                onChange={handleChange}
                className="w-full bg-gray-100 px-4 py-3 rounded-full focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <h3 className="font-semibold mb-2">Please Select Your Store</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {storeOptions.map((store) => (
                <label
                  key={store}
                  className={`flex items-center justify-start gap-4 border px-4 py-2 bg-secondary rounded-full cursor-pointer transition-all ${
                    form.store === store
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="store"
                    value={store}
                    checked={form.store === store}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {form.store === store ? (
                    <>
                      {" "}
                      <CircleDot /> {store}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Circle /> {store}
                    </>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <h3 className="font-semibold mb-2">
              Have Question? Ask Us Anything
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {productOptions.map((product) => (
                <label
                  key={product}
                  className={`flex items-center justify-start gap-4 border px-4 py-2 bg-secondary rounded-full cursor-pointer transition-all ${
                    form.productTypes?.includes(product)
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="productTypes"
                    value={product}
                    checked={form.productTypes?.includes(product)}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {form.productTypes?.includes(product) ? (
                    <>
                      <CheckCircle2 /> {product}
                    </>
                  ) : (
                    <>
                      <Circle /> {product}
                    </>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <label className="font-semibold">
              What Type Of Products Are You Interested In?
            </label>
            <textarea
              name="questions"
              value={form.questions}
              onChange={handleChange}
              rows={3}
              placeholder="Typing..."
              className="w-full bg-gray-100 px-4 py-3 rounded-md mt-2 accent-primary "
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white font-bold py-3 rounded-full hover:bg-red-600 transition"
          >
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
}
