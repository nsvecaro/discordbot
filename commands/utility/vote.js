module.exports = async (message, config, client) => {
    if (message.content !== '!vote') return;
    if (message.author.id !== config.adminId) return;
    
    const messages = await message.channel.messages.fetch({ limit: 2 });
    const lastMessage = messages.filter(m => m.author.id === client.user.id).first();
    
    if (!lastMessage) {
      return message.reply('❌ Nema poruke za voting!');
    }
    
    await lastMessage.react('✅');
    await lastMessage.react('❌');
    
    message.delete().catch(console.error);
  };