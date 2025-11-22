const { AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (!message.content.startsWith('!slika')) return;
  if (message.author.id !== config.adminId) return;
  
  const imeSlike = message.content.slice(7).trim();
  
  if (!imeSlike) {
    return message.reply('❌ Format: `!slika ime-slike.png`');
  }
  
  const putanjaSlike = path.join(__dirname, '..', '..', 'slike', imeSlike);
  
  try {
    const attachment = new AttachmentBuilder(putanjaSlike);
    await message.channel.send({ files: [attachment] });
    message.delete().catch(console.error);
  } catch (err) {
    message.reply(`❌ Ne mogu naći sliku: ${imeSlike}`);
  }
};