const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (message.content !== '!colors') return;
  if (message.author.id !== config.adminId) return;
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });
  
  const imagePath = path.join(__dirname, '..', '..', 'slike', 'boja.png');
  const imageAttachment = new AttachmentBuilder(imagePath, { name: 'boja.png' });

  const embed = new EmbedBuilder()
    .setColor('#003892')
    .setAuthor({ 
      name: '[  P L J U G A  ] ℗',
      iconURL: 'attachment://icon.png'
    })
    .setTitle('🎨 | BOJE')
    .setDescription('Odaberi svoju boju u discordu:')
    .setImage('attachment://boja.png')
  
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('color_select')
    .setPlaceholder('Odaberi boju')
    .setMinValues(0)
    .setMaxValues(1)
    .addOptions([
      {
        label: 'Crna',
        value: 'crna'
      },
      {
        label: 'Bijela',
        value: 'bijela'
      },
      {
        label: 'Zelena',
        value: 'zelena'
      },
      {
        label: 'Roza',
        value: 'roza'
      },
      {
        label: 'Plava',
        value: 'plava'
      },
      {
        label: 'Žuta',
        value: 'zuta'
      },
      {
        label: 'Crvena',
        value: 'crvena'
      },
      {
        label: 'Ljubičasta',
        value: 'ljubicasta'
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