import nodemailer from 'nodemailer';

export const sendEmail = async (subject: string, body: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'laxmikanthreddy8905@gmail.com',
      pass: 'qvmi dzvi kizn hlia' // replace with your real app password
    }
  });

  await transporter.sendMail({
    from: 'Dairy Farm <laxmikanthreddy8905@gmail.com>',
    to: 'laxmikanthreddy8905@gmail.com',
    subject,
    html: body,
  });
};
