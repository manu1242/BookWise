import emailjs from "emailjs-com";

export const sendBookingConfirmationEmail = async (details) => {
  const {
    name,
    email,
    mobile,
    date,
    time,
    location,
    r
  } = details;

  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name,
        email,
        mobile,
        date,
        time,
        location,
        
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("📧 Email sent:", result.status, result.text);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
