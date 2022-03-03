const nodemailer = require('nodemailer');
const config = require('config');
const fs = require('fs');
const arrayHelper = require('./helpers/arrayHelper');

const transporter = nodemailer.createTransport({
  service: config.gmail.service,
  auth: config.gmail.auth,
});

const html = fs.readFileSync('./app/index.html', 'utf-8');
const emails = arrayHelper.makeChunks(400, fs.readFileSync(config.emailTargets.path, 'utf-8').split('\r\n'));

async function main() {
  const len = emails.length;
  const startFrom = 0;
  let index = 1;
  for await (const email of emails) {
    if (index < startFrom) {
      index += 1;
      continue;
    }
    const res = await transporter.sendMail({
      from: `${config.gmail.auth.user}@${config.gmail.domain}`,
      to: email,
      subject: 'russia MUST BE STOPPED!',
      html,
      attachments: [
        {
          filename: 'ddos_index.html',
          path: './data/ddos_index.html',
          encoding: 'utf-8',
        },
      ],
    })
      .catch((e) => {
        console.error(e.message);
      });
    console.log(`${index}/${len}\t${res?.response}`);
    index += 1;
  }
  console.log('Done!');
}
main();
