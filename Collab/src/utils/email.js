import emailjs from "emailjs-com";

// export const sendBookingConfirmationEmail = async (details) => {
//   const {
//     name,
//     customerEmail,
//     mobile,
//     date,
//     time,
//     location,
//     providerName,
//     price,
//     unit,
//   } = details;

//   try {
//     const result = await emailjs.send(
//       import.meta.env.VITE_EMAILJS_SERVICE_ID,
//       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//       {
//         to_email: customerEmail, // ✅ Important!
//         customer_name: name,
//         customer_mobile: mobile,
//         booking_date: date,
//         booking_time: time,
//         provider_name: providerName,
//         provider_location: location,
//         price_unit: `₹${price}/${unit || "service"}`, // fallback
//       },
//       import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//     );

//     console.log("📧 Email sent:", result.status, result.text);
//   } catch (error) {
//     console.error("❌ Failed to send email:", error);
//   }
// };
// export const sendBookingConfirmationEmail = async (details) => {
//   const {
//     name,
//     customerEmail, 
//     mobile,
//     date,
//     time,
//     location,
//     reference,
//   } = details;

//   if (!customerEmail || customerEmail.trim() === "") {
//     console.error("❌ Email is missing. Cannot send confirmation.");
//     return;
//   }

//   try {
//     const result = await emailjs.send(
//       import.meta.env.VITE_EMAILJS_SERVICE_ID,
//       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//       {
//         name,
//         mobile,
//         date,
//         time,
//         location,
//         reference,
//       },
//       import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//     );

//     console.log("📧 Email sent:", result.status, result.text);
//   } catch (error) {
//     console.error("❌ Failed to send email:", error);
//   }
// };
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
        name,               // ✅ for {{name}}
        to_email: customerEmail, // ✅ for {{to_email}}
        mobile,             // ✅ for {{mobile}}
        date,               // ✅ for {{date}}
        time,               // ✅ for {{time}}
        location,           // ✅ for {{location}}
        reference,          // ✅ for {{reference}}
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("📧 Email sent:", result.status, result.text);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
