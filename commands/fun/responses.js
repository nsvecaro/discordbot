module.exports = async (message, config, client) => {
    const responses = {
      '!moto': 'Gagi je pimp, mi smo kurve.',
      '!goran': 'DALMACIJA!',
      '!teo': 'picka',
      '!vrijeme': 'Vrijeme je za ranked',
      '!supp': 'BETTER SUPP ALWAYS WIN',
      '!start': 'Start or I am leave'
    };
  
    if (responses[message.content]) {
      message.reply(responses[message.content]);
    }
  };