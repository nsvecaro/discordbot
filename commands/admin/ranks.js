const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (message.content !== '!ranks') return;
  if (message.author.id !== config.adminId) return;
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });

  const imagePath = path.join(__dirname, '..', '..', 'slike', 'rank.png');
  const imageAttachment = new AttachmentBuilder(imagePath, { name: 'rank.png' });
  
  const embed = new EmbedBuilder()
    .setColor('#003892')
    .setAuthor({ 
      name: '[  P L J U G A  ] ℗',
      iconURL: 'attachment://icon.png'
    })
    .setTitle('🏆 | RANK')
    .setDescription('Odaberi svoj rank:')
    .setImage('attachment://rank.png')
  
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('rank_select')
    .setPlaceholder('Odaberi svoj rank')
    .setMinValues(0)
    .setMaxValues(1)
    .addOptions([
      {
        label: 'Sovereign',
        value: 'sovereign',
        emoji: '<:mid:1441121671263158414>'
      },
      {
        label: 'Challenger',
        value: 'challenger',
        emoji: '<:mid:1441121671263158414>'
      },
      {
        label: 'Grandmaster',
        value: 'grandmaster',
        emoji: '<:mid:1441121671263158414>'
      },
      {
        label: 'Master',
        value: 'master',
        emoji: '<:mid:1441121671263158414>'
      },
      {
        label: 'Diamond',
        value: 'diamond',
        emoji: '<:mid:1441121671263158414>'
      },
      {
        label: 'Emerald',
        value: 'emerald',
        emoji: '<:mid:1441121671263158414>'
      }
    ]);
  
  const row = new ActionRowBuilder().addComponents(selectMenu);
  
  await message.channel.send({
    embeds: [embed],
    files: [iconAttachment, imageAttachment],
    components: [row]
  });
  
  message.delete().catch(console.error);
};