const fs = require('fs');
const path = require('path');

module.exports = async (message, config, client) => {
  if (message.content !== '!slike') return;
  if (message.author.id !== config.adminId) return;
  
  const slikeFolder = path.join(__dirname, '..', '..', 'slike');
  
  fs.readdir(slikeFolder, (err, files) => {
    if (err) {
      return message.reply('❌ Folder "slike/" ne postoji!');
    }
    
    const lista = files
      .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
      .map(file => `• ${file}`)
      .join('\n');
    
    if (!lista) {
      return message.reply('📁 Folder "slike/" je prazan!');
    }
    
    message.reply(`📁 **Dostupne slike:**\n${lista}`);
  });
};