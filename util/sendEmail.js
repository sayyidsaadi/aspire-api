import nodemailer from "nodemailer";
export const sendEmail = ({ to, sub, msg, name }) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "creativewebshopltd@gmail.com",
      pass: "rzxrhozdjipweysd",
    },
  });

  transport.sendMail({
    from: "creativewebshopltd@gmail.com",
    to: to,
    subject: sub,
    html: `<head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      /* Responsive styles for desktop */
      @media only screen and (min-width: 600px) {
        .email-container {
          max-width: 600px;
          margin: 0 auto;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <!-- Header -->
      <header style="background-color: #f1f1f1; padding: 20px">
        <h1 style="text-align: center; color: #333">Aspire</h1>
      </header>

      <!-- Main Content -->
      <div style="padding: 20px">
        <h2>Welcome to Our Newsletter!</h2>
        <p>Dear ${name},</p>
        <p>
          Thank you for joining to our Website. We are excited to have
          you on board! <h3>${msg}</h3>
        </p>
        <p>
          Stay tuned for the latest updates, Products, and special offers from our
          company.
        </p>
        <p>
          Best regards,<br />
          The Company Team
        </p>
      </div>

      <!-- Footer -->
      <footer
        style="background-color: #f1f1f1; padding: 20px; text-align: center"
      >
        <p style="font-size: 12px; color: #777">
          You received this email because you Joined to our Aspire Website.
          <br />
          &copy; 2023 Company. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
    `,
  });
};
