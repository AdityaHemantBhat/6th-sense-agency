import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, phone, services, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
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
      from: `"6th Sense Agency" <${process.env.SMTP_USER}>`,
      to: "support@sixthsenseagency.in",
      replyTo: email,
      subject: `New Contact Request | ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <h2 style="color: #000; background: #C8F04D; padding: 30px; margin: 0; text-align: center; font-size: 24px; text-transform: uppercase;">New Inquiry</h2>
          <div style="padding: 30px;">
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Company:</strong> ${company || 'N/A'}</p>
            <p style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p style="margin-bottom: 20px;"><strong>Interest:</strong> ${services ? services.join(', ') : 'None'}</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #C8F04D;">
              <p style="margin: 0; font-weight: bold; margin-bottom: 10px;">Message:</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message || 'No additional details provided.'}</p>
            </div>
            <p style="margin-top: 30px; font-size: 11px; color: #999; text-align: center;">Capture: sixthsenseagency.in</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("SMTP Error:", error);
    res.status(500).json({ error: "Email delivery failed.", details: error.message });
  }
}
