const API_KEY = "YOUR_API_KEY";
const DOMAIN = "YOUR_DOMAIN_NAME";

const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

const messageData = {
  from: "Excited User <me@samples.mailgun.org>",
  to: "foo@example.com, bar@example.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
};

client.messages
  .create(DOMAIN, messageData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// const messageData = {
//   from: "Excited User <me@samples.mailgun.org>",
//   to: "foo@example.com, bar@example.com",
//   subject: "Hello",
//   text: "Testing some Mailgun awesomeness!",
// };

const MailGun = async (messageData: {
  from: string;
  to: string;
  subject: string;
  text: string;
}) => {};

export default MailGun;
