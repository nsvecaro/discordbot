module.exports = async (message, config, client) => {
    const responses = {
      '!goran': 'DALMACIJA!',
      '!vrijeme': 'Vrijeme je za ranked😈',
      '!supp': 'BETTER SUPP ALWAYS WIN',
      '!start': 'Start or I am leave',
      '!sekunda': 'Motam al lazem da sam brzo gotov',
      '!invite': 'https://discord.gg/4PBbYYMVKU'
    };
  
    if (responses[message.content]) {
      message.reply(responses[message.content]);
    }
  };