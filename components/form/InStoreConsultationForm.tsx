/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
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
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as any);
      return;
    }

    setErrors({}); // clear old errors

    const res = await fetch("/api/jotform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    alert(json.success ? "Submitted!" : `Error: ${json.error}`);
  };

  return (
    <div className=" w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-black/25 max-h-[400px] overflow-y-auto p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl my-4 font-semibold text-white text-center">
            Request An In-Store Consultation
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-white px-4 py-2 rounded-full focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-white  px-4 py-2 rounded-full focus:outline-none"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 bg-white  py-2 rounded-full focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="number"
                placeholder="(123) 456-7890"
                value={form.number}
                onChange={handleChange}
                className="w-full bg-white  px-4 py-2 rounded-full focus:outline-none"
              />
              {errors.number && (
                <p className="text-red-400 text-xs mt-1">{errors.number}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <select
              name="store"
              value={form.store}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full font-sans focus:outline-none bg-white text-black placeholder:text-gray-700 appearance-none pr-10"
            >
              <option value="" disabled>
                -- Select Store --
              </option>
              <option value="DECATUR">DECATUR</option>
              <option value="DOUGLASVILLE">DOUGLASVILLE</option>
              <option value="JONESBORO">JONESBORO</option>
              <option value="MABLETON">MABLETON</option>
              <option value="ROSWELL">ROSWELL</option>
              <option value="SNELLVILLE">SNELLVILLE</option>
              <option value="WOODSTOCK">WOODSTOCK</option>
            </select>

            {/* Dropdown icon */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="block font-bold text-white mb-2 text-lg">
              What Type of Products Are You Interested In?
            </label>
            <div className="grid grid-cols-2 gap-2 text-white text-sm">
              {[
                "CARPET",
                "VINYL",
                "LUXURY VINYL",
                "HARDWOOD",
                "LAMINATE",
                "STAIN RESISTANT",
                "UNDECIDED",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="productTypes"
                    value={item}
                    checked={form.productTypes?.includes(item)}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-white mb-1 text-lg">
              Have Questions?
            </label>
            <textarea
              name="questions"
              value={form.questions}
              onChange={handleChange}
              rows={3}
              placeholder="Ask us anything..."
              className="w-full px-4 py-2 bg-white rounded-md focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-2 rounded-full hover:bg-red-600 transition"
        >
          SUBMIT NOW
        </button>
      </form>
    </div>
  );
}
