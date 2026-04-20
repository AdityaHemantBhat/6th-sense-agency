const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, serviceId, serviceName } = req.body;

    if (!email || !serviceId) {
      return res.status(400).json({ error: "Email and service selection are required." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "support@sixthsenseagency.in",
      subject: `New Project Started | 6th Sense Agency`,
      html: `
        <h2>New Project Started</h2>
        <p>A client has started a new project via the 6th Sense Agency booking page.</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Selected Service:</strong> ${serviceName} (ID: ${serviceId})</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Booking email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending booking email." });
  }
}
