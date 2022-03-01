const nodemailer = require('nodemailer');
const config = require('config');
const fs = require('fs');

const html = fs.readFileSync('./app/index.html', 'utf-8');
const emails = fs.readFileSync(
  '/mnt/d/Data/Criminal/email.txt',
  'utf-8'
).split('\r\n');

async function main() {
  const transporter = nodemailer.createTransport(config.gmail);
  const len = emails.length;
  const startFrom = 0;
  let index = 1;
  for await (const email of emails) {
    if (index < startFrom) {
      index += 1;
      continue;
    }
    const res = await transporter.sendMail({
      from: 'petrovartur225@gmail.com',
      to: email,
      subject: 'russia MUST BE STOPPED!',
      html,
      attachments: [
        {
          filename: 'index.html',
          path: '/mnt/d/Workspace/personal-projects/node-email-spammer/data/index.html',
          encoding: 'utf-8',
        },
      ],
    })
      .catch((e) => {
        console.error(e.message);
      });
    console.log(`${index}/${len}\t${email}\t${res?.response}`);
    index += 1;
  }
  console.log('Done!');
}
main();