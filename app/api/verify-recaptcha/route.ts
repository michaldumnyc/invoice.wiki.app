import { NextResponse } from "next/server"

export async function POST(request: Request) {
  console.log("API route handler called")
  console.log("Request method:", request.method)
  console.log("Request headers:", Object.fromEntries(request.headers))

  const body = await request.json()
  console.log("Request body:", body)

  const { token } = body

  if (!token) {
    console.log("reCAPTCHA token is missing")
    return NextResponse.json({ success: false, message: "reCAPTCHA token is missing" }, { status: 400 })
  }

  try {
    console.log("Verifying reCAPTCHA token")
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" },
    )

    const recaptchaData = await recaptchaRes.json()
    console.log("reCAPTCHA verification result:", recaptchaData)

    if (recaptchaData.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error)
    return NextResponse.json({ success: false, message: "Error verifying reCAPTCHA" }, { status: 500 })
  }
}

