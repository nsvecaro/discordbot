const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (!message.content.startsWith('!wof')) return;
  if (message.author.id !== config.adminId) return;
  
  const args = message.content.slice(5).trim().split('|');
  
  if (args.length < 10) {
    return message.reply('❌ Format: `!wof Ime1|Razlog1|Ime2|Razlog2|Ime3|Razlog3|Ime4|Razlog4|Ime5|Razlog5`');
  }
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });

  const bigImagePath = path.join(__dirname, '..', '..', 'slike', 'hof.png');
  const bigImageAttachment = new AttachmentBuilder(bigImagePath, { name: 'banner.png' });

  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setAuthor({ 
      name: '[  P L J U G A  ] ℗',
      iconURL: 'attachment://icon.png'
    })
    .setTitle('🏆  •  WALL OF FAME  •  🏆  ')
    .setThumbnail('https://support-leagueoflegends.riotgames.com/hc/article_attachments/41887131017491')
    .setDescription(
      `**Najzaslužniji igrači ovog mjeseca! 🔥**\n\n` +
      `# ** 🏅 1. ${args[0].trim()}**\n${args[1].trim()}\n\n` +
      `# ** 🏅 2. ${args[2].trim()}**\n${args[3].trim()}\n\n` +
      `# ** 🏅 3. ${args[4].trim()}**\n${args[5].trim()}\n\n` +
      `# ** 🏅 4. ${args[6].trim()}**\n${args[7].trim()}\n\n` +
      `# ** 🏅 5. ${args[8].trim()}**\n${args[9].trim()}`
    )
    .setImage('attachment://banner.png')
    .setFooter({ text: '[  P L J U G A  ] ℗' });
  
  await message.channel.send({ 
    embeds: [embed],
    files: [iconAttachment, bigImageAttachment]
  });
  
  message.delete().catch(console.error);
};