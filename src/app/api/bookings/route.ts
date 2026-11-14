import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const adminApiUrl =
      process.env.API_DATA ||
      process.env.NEXT_PUBLIC_API_DATA ||
      "http://localhost:3000/api";

    const res = await fetch(`${adminApiUrl}/bookings`, {
      method: "POST",
      body: formData,
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const rawText = await res.text();
      console.error("🔥 Respons non-JSON dari Server Admin:", res.status, rawText.slice(0, 300));
      return NextResponse.json(
        {
          success: false,
          message: `Server admin mengembalikan status ${res.status} (bukan JSON). Cek middleware/route /api/bookings di admin.`,
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("🔥 Proxy POST /api/bookings error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Tidak dapat terhubung ke server admin (pastikan server port 3000 berjalan).",
      },
      { status: 500 }
    );
  }
}