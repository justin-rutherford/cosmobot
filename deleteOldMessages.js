const Discord = require('discord.js');

const deleteMessage = async (message, count = 0) => {
  await new Promise(r => setTimeout(r, count * 3500)); //slow down the deletes

  message.delete().catch(console.error);
}

const handleMessageFetch = async (messages, channel) => {
  let awaitMilliseconds = 135000;
  let count = 0;
  
  if (messages.size > 0) {
    messages.forEach(message => deleteMessage(message, count++));
  } else {
    awaitMilliseconds = 3600000; //No messages, wait an hour before trying again
  }

  await new Promise(r => setTimeout(r, awaitMilliseconds));
  deleteOldMessages(channel);
};

const deleteOldMessages = channel => {
  let beforeDate = new Date();
  beforeDate.setDate(beforeDate.getDate() - (28));
  const beforeTimestamp = Discord.SnowflakeUtil.generate(beforeDate);

  channel.messages
    .fetch({ limit: 30, before: beforeTimestamp })
    .then(messages => handleMessageFetch(messages, channel))
    .catch(() => {
      console.error(`Error fetching new messages for ${channel.name}.  Retrying...`);
      deleteOldMessages(channel);
    });
};

exports.deleteOldMessages = deleteOldMessages;
