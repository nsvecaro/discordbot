const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (!message.content.startsWith('!say')) return;
  if (message.author.id !== config.adminId) return;
  
  // Uzmi tekst nakon "!say "
  const args = message.content.slice(5).trim().split('|');
  
  if (args.length < 2) {
    return message.reply('❌ Format: `!say Naslov|Tekst1|Tekst2|Tekst3...`');
  }
  
  const title = args[0].trim();
  const lines = args.slice(1).map(line => `${line.trim()}`).join('\n');
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });
  
  const embed = new EmbedBuilder()
    .setColor('#003892')
    .setAuthor({ 
      name: '[  P L J U G A  ] ℗',
      iconURL: 'attachment://icon.png'
    })
    .setTitle(title)
    .setThumbnail('attachment://icon.png')
    .setDescription(lines)
    .setFooter({ text: '[  P L J U G A  ] ℗' });
  
  await message.channel.send({ 
    embeds: [embed],
    files: [iconAttachment]
  });
  
  message.delete().catch(console.error);
};
