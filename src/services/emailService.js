// import nodemailer from "nodemailer";

// // Configure transporter
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // Gmail SMTP
//   port: 465,
//   secure: true, // SSL
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Google App Password
//   },
// });

// /**
//  * Send a simple HTML email
//  * @param {string} to - Recipient email
//  * @param {string} subject - Email subject
//  * @param {string} html - HTML content
//  */
// export const sendEmail = async (to, subject, html) => {
//   try {
//     const mailOptions = {
//       from: `"Waghera Tourism" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("📧 Email sent successfully:", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     return false;
//   }
// };

// /**
//  * Send an email with attachment
//  * @param {string} to - Recipient email
//  * @param {string} subject - Email subject
//  * @param {string} html - HTML content
//  * @param {Buffer} attachmentBuffer - Attachment as Buffer
//  * @param {string} filename - Attachment file name
//  */
// export const sendEmailWithAttachment = async (to, subject, html, attachmentBuffer, filename) => {
//   try {
//     const mailOptions = {
//       from: `"Waghera Tourism" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//       attachments: [{ filename, content: attachmentBuffer }],
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("📧 Email with attachment sent:", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("❌ Email with attachment failed:", error);
//     return false;
//   }
// };



// import nodemailer from "nodemailer";

// // Create transporter (Gmail example)
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER, // your email
//         pass: process.env.EMAIL_PASS  // app password if using Gmail
//     }
// });

// /**
//  * Send email with HTML content and optional attachment
//  * @param {string} to - recipient email
//  * @param {string} subject - email subject
//  * @param {string} htmlBody - HTML content of the email
//  * @param {Buffer} attachmentBuffer - optional attachment as Buffer
//  * @param {string} filename - attachment file name
//  */
// export const sendEmailWithAttachment = async (to, subject, htmlBody, attachmentBuffer, filename) => {
//     try {
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             html: htmlBody,
//             attachments: attachmentBuffer ? [
//                 {
//                     filename,
//                     content: attachmentBuffer
//                 }
//             ] : []
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to ${to} successfully`);
//     } catch (error) {
//         console.error("Failed to send email:", error);
//         throw error;
//     }
// };




import nodemailer from "nodemailer";

// Create transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send email with HTML content and optional attachment
 */
export const sendEmailWithAttachment = async (
    to,
    subject,
    htmlBody,
    attachmentBuffer,
    filename
) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlBody,
            attachments: attachmentBuffer ? [
                { filename, content: attachmentBuffer }
            ] : []
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} successfully`);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
};

/* =====================================================
   ✅ ADD THIS FUNCTION BELOW (NO CHANGE ABOVE)
   ===================================================== */

export const sendRegistrationEmail = async (toEmail, userName) => {
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">

        <h2 style="color: #2c7a7b; text-align:center;">
          🌿 Welcome to Waghera Agro Tourism 🌿
        </h2>

        <p style="font-size: 16px;">Hello <b>${userName}</b>,</p>

        <p style="font-size: 15px; color:#444;">
          We’re excited to inform you that your <b>registration is successful!</b><br>
          Thank you for joining the Waghera Agro family. We look forward to serving you!
        </p>

        <hr style="margin: 20px 0;">

        <h3 style="color: #2c7a7b;">📞 Contact Information</h3>
        <p>
          <b>Phone:</b> +91 9876543210<br>
          <b>Email:</b> support@wagheraagro.com<br>
          <b>Instagram:</b>
          <a href="https://instagram.com/wagheraagro" style="color:#3182ce;">
            @wagheraagro
          </a>
        </p>

        <hr style="margin: 20px 0;">

        <p style="font-size: 14px; color:#555;">
          If you have any questions or need assistance, feel free to reach out anytime.
          <br><br>
          Regards,<br>
          <b>Waghera Agro Tourism Team</b>
        </p>

      </div>
    </div>
    `;

    // 🔁 Reusing your existing function
    await sendEmailWithAttachment(
        toEmail,
        "🎉 Welcome to Waghera Agro Tourism – Registration Successful!",
        htmlBody
    );
};
