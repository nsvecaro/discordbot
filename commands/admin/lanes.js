const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (message.content !== '!lanes') return;
  if (message.author.id !== config.adminId) return;
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });

  const imagePath = path.join(__dirname, '..', '..', 'slike', 'uloga.png');
  const imageAttachment = new AttachmentBuilder(imagePath, { name: 'uloga.png' });
  
  const embed = new EmbedBuilder()
    .setColor('#003892')
    .setAuthor({ 
        name: '[  P L J U G A  ] ℗',
        iconURL: 'attachment://icon.png'
      })
    .setTitle('🎮 | ULOGA')
    .setDescription('Odaberi uloge koje igraš:')
    .setImage('attachment://uloga.png')
    
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('lane_select')
    .setPlaceholder('Odaberi lane')
    .setMinValues(0)
    .setMaxValues(5)
    .addOptions([
      {
        label: 'Top Lane',
        value: 'top',
        
      },
      {
        label: 'Jungle',
        value: 'jungle',
        
      },
      {
        label: 'Mid Lane',
        value: 'mid',
        
      },
      {
        label: 'Dragon Lane',
        value: 'dragon',
        
      },
      {
        label: 'Support',
        value: 'support',
    
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