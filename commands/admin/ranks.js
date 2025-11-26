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
        emoji: '<:sovereign:1440012737743945768>'
      },
      {
        label: 'Challenger',
        value: 'challenger',
        emoji: '<:challenger:1440012690398511156>'
      },
      {
        label: 'Grandmaster',
        value: 'grandmaster',
        emoji: '<:grandmaster:1440012849278746738>'
      },
      {
        label: 'Master',
        value: 'master',
        emoji: '<:master:1440012813941866496>'
      },
      {
        label: 'Diamond',
        value: 'diamond',
        emoji: '<:diamond:1440012784363634809>'
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