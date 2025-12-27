const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // TLS requires this to be false for port 587
  auth: {
    user: process.env.EMAIL_USER, // prasadlanghe02@outlook.com
    pass: process.env.EMAIL_PASS  // royurkuedymeffwl
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false 
  }
});