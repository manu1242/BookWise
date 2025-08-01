import emailjs from "emailjs-com";

export const sendBookingConfirmationEmail = async (details) => {
  const {
    name,
    customerEmail, 
    mobile,
    date,
    time,
    location,
    reference,
  } = details;

  if (!customerEmail || customerEmail.trim() === "") {
    console.error("❌ Email is missing. Cannot send confirmation.");
    return;
  }

  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name,             
        to_email: customerEmail, 
        mobile,             
        date,               
        time,              
        location,           
        reference,          
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("📧 Email sent:", result.status, result.text);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
