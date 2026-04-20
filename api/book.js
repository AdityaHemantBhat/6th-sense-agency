import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, serviceId, serviceName } = req.body;

    if (!email || !serviceId) {
      return res.status(400).json({ error: "Email and service are required." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"6th Sense Booking" <${process.env.SMTP_USER}>`,
      to: "support@sixthsenseagency.in",
      replyTo: email,
      subject: `Project Brief: ${serviceName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <h2 style="color: #000; background: #C8F04D; padding: 30px; margin: 0; text-align: center; font-size: 24px; text-transform: uppercase;">Project Request</h2>
          <div style="padding: 30px;">
            <p style="font-size: 18px; margin-bottom: 20px;">A potential client has requested a quote.</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #C8F04D;">
              <p style="margin-bottom: 10px;"><strong>Client:</strong> ${email}</p>
              <p style="margin-bottom: 0;"><strong>Selected Service:</strong> ${serviceName}</p>
            </div>
            <p style="margin-top: 30px; font-size: 11px; color: #999; text-align: center;">ID: ${serviceId}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Booking email sent" });
  } catch (error) {
    console.error("Booking SMTP Error:", error);
    res.status(500).json({ error: "Booking email failed.", details: error.message });
  }
}
