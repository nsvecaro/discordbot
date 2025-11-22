const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = async (message, config, client) => {
  if (message.content !== '!rules') return;
  if (message.author.id !== config.adminId) return;
  
  const iconPath = path.join(__dirname, '..', '..', 'slike', 'pljugaicon.png');
  const iconAttachment = new AttachmentBuilder(iconPath, { name: 'icon.png' });
  
  const embed = new EmbedBuilder()
    .setColor('#003892')
    .setAuthor({ 
      name: '[  P L J U G A  ] ℗',
      iconURL: 'attachment://icon.png'
    })
    .setTitle('📜 PRAVILA SERVERA')
    .setDescription(
      'Klikom na gumb za verifikaciju potvrđuješ da si pročitao/la i slažeš se sa sljedećim pravilima:\n\n' +
      '**1. Poštovanje zajednice**\n' +
      'Tretiramo sve članove s poštovanjem. Zabranjeno je bilo kakvo uznemirivanje, vrijeđanje ili diskriminacija na temelju rase, vjere, spola, nacionalnosti, seksualne orijentacije ili bilo koje druge osobne karakteristike.\n\n' +
      '**2. Jezik i komunikacija**\n' +
      'Pričamo balkanski (hrvatski, srpski, bosanski, crnogorski, makedonski,...). Engeleski je dozvoljen, ali se trudimo zadržati naš jezik kao glavni način komunikacije.\n\n' +
      '**3. Zabranjeni sadržaj**\n' +
      'Strogo je zabranjeno dijeliti:\n' +
      '∙ Pornografski ili seksualno eksplicitan sadržaj\n' +
      '∙ Sadržaj koji prikazuje maloljetnike na neprikladan način (CP)\n' +
      '∙ Gore, nasilje ili sadržaj koji šokira\n' +
      '∙ Piratirizirani materijal ili ilegalan sadržaj\n\n' +
      '**4. Spam i reklame**\n' +
      'Nemoj spamati poruke, slike ili ping-ati ljude bez razloga. Reklame i promocije nisu dozvoljene bez dozvole administracije.\n\n' +
      '**5. Discord ToS**\n' +
      'Svi moramo poštovati Discord-ove službene uvjete korištenja (Terms of Service) i Community Guidelines.\n\n' +
      '**6. Zdravorazumsko ponašanje**\n' +
      'Koristi zdrav razum. Ako misliš da nešto nije okej, vjerojatno i nije.\n\n' +
      '> Kršenje pravila rezultira upozorenjem, mutom, kick-om ili ban-om, ovisno o težini prekršaja.'
    )
    .setTimestamp()
    .setFooter({ text: '[  P L J U G A  ] ℗' });
  
  const sentMessage = await message.channel.send({ 
    embeds: [embed],
    files: [iconAttachment]
  });
  
  await sentMessage.react('✅');
  message.delete().catch(console.error);
};