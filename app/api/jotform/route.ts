import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const formId = "250145363798060";

  const formData = new URLSearchParams();

  // Map to QIDs
  formData.append("submission[3][first]", body.firstName);
  formData.append("submission[3][last]", body.lastName);
  formData.append("submission[4]", body.email);
  formData.append("submission[5]", body.phoneNumber);
  formData.append("submission[6]", body.store);

  if (Array.isArray(body.productTypes)) {
    body.productTypes.forEach((item: string) => {
      formData.append("submission[7][]", item);
    });
  }

  formData.append("submission[8]", body.questions || "");

  try {
    const response = await fetch(
      `https://api.jotform.com/form/${formId}/submissions?apiKey=${process.env.JOTFORM_API_KEY}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Submission failed");
    }

    return NextResponse.json({ success: true, data: result });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
