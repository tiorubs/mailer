"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

const hotmailConfig =
  '{"host":"smtp-mail.outlook.com","secureConnection":false,"port":587,"tls":{"ciphers":"SSLv3"}}';

const getTransport = (mailerConfig, user, pass) =>
  _nodemailer2.default.createTransport({
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
    path: _path2.default.join(process.cwd(), `/files/${filename}`),
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

exports. default = send;
