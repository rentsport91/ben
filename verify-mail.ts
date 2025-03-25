import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "euroswifts.com", // Outgoing Server
  port: 587, // SMTP Port
  secure: true, // Secure SSL/TLS connection (true for port 465)
  auth: {
    user: "info@euroswifts.com", // Username
    pass: "qpvOGgyoI7nV", // Use the email account's password
  },
  requireTLS: true,
});

// Optional: Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP configuration error:", error);
  } else {
    console.log("SMTP is ready to send messages");
  }
});

export default transporter;
