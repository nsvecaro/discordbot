module.exports = async (message, config, client) => {
    if (!message.content.startsWith('!clear')) return;
    if (message.author.id !== config.adminId) return;
    
    const amount = parseInt(message.content.slice(7).trim());
    
    if (!amount || amount < 1 || amount > 100) {
      return message.reply('❌ Format: `!clear broj` (1-100)');
    }
    
    try {
      await message.channel.bulkDelete(amount + 1, true);
    } catch (err) {
      message.reply('❌ Ne mogu obrisati poruke (možda su starije od 14 dana)');
    }
  };