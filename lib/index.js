import nodemailer from "nodemailer";
import path from "path";

const hotmailConfig =
  '{"host":"smtp-mail.outlook.com","secureConnection":false,"port":587,"tls":{"ciphers":"SSLv3"}}';

const getTransport = (mailerConfig, user, pass) =>
  nodemailer.createTransport({
    ...mailerConfig,
    auth: {
      user,
      pass,
    },
  });

const send = (
  user,
  pass,
  to,
  filenames,
  mailerConfig = hotmailConfig,
  subject = "Assunto"
) => (html = "<h1>Enviado</h1>") => {
  mailerConfig = JSON.parse(mailerConfig);

  const transport = getTransport(mailerConfig, user, pass);

  const attachments = filenames.map((filename) => ({
    filename,
    path: path.join(process.cwd(), `/files/${filename}`),
  }));

  if (!attachments.length > 0) throw "no attachments";

  return transport.sendMail({
    from: user,
    to,
    subject,
    attachments,
    html,
  });
};

export default send;
