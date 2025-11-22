const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (message.content !== '!lranks') return;
  if (message.author.id !== config.adminId) return;
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });

  const imagePath = path.join(__dirname, '..', '..', 'slike', 'lrank.png');
  const imageAttachment = new AttachmentBuilder(imagePath, { name: 'lrank.png' });
  
  const embed = new EmbedBuilder()
    .setColor('#003892')
    .setAuthor({ 
      name: '[  P L J U G A  ] ℗',
      iconURL: 'attachment://icon.png'
    })
    .setTitle('🏆 | LEGENDARY RANK')
    .setDescription('Odaberi svoj legendary rank:')
    .setImage('attachment://lrank.png')
  
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('lrank_select')
    .setPlaceholder('Odaberi svoj legendary rank')
    .setMinValues(0)
    .setMaxValues(1)
    .addOptions([
      {
        label: 'Legend',
        value: 'legend'
      },
      {
        label: 'Legendary Challenger',
        value: 'lchallenger'
      },
      {
        label: 'Legendary Grandmaster',
        value: 'lgrandmaster'
      },
      {
        label: 'Legendary Master',
        value: 'lmaster'
      },
      {
        label: 'Legendary Commander',
        value: 'lcommander'
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