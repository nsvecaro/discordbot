const { Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = (client, config) => {
  
  // Učitaj sve command file-ove
  const loadCommands = (folder) => {
    const commandsPath = path.join(__dirname, '..', 'commands', folder);
    
    // Provjeri postoji li folder
    if (!fs.existsSync(commandsPath)) {
      console.log(`⚠️ Folder ne postoji: ${folder}`);
      return [];
    }
    
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    return commandFiles.map(file => {
      try {
        return require(path.join(commandsPath, file));
      } catch (err) {
        console.error(`❌ Greška u file-u ${folder}/${file}:`, err.message);
        return null;
      }
    }).filter(cmd => cmd !== null);
  };

  const adminCommands = loadCommands('admin');
  const utilityCommands = loadCommands('utility');
  const funCommands = loadCommands('fun');

  console.log(`✅ Učitano ${adminCommands.length} admin komandi`);
  console.log(`✅ Učitano ${utilityCommands.length} utility komandi`);
  console.log(`✅ Učitano ${funCommands.length} fun komandi`);

  // MessageCreate event
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    // Pokreni sve admin komande
    for (const command of adminCommands) {
      try {
        await command(message, config, client);
      } catch (err) {
        console.error('❌ Greška u admin komandi:', err);
      }
    }

    // Pokreni sve utility komande
    for (const command of utilityCommands) {
      try {
        await command(message, config, client);
      } catch (err) {
        console.error('❌ Greška u utility komandi:', err);
      }
    }

    // Pokreni sve fun komande
    for (const command of funCommands) {
      try {
        await command(message, config, client);
      } catch (err) {
        console.error('❌ Greška u fun komandi:', err);
      }
    }
  });

// MessageReactionAdd event
client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (user.bot) return;
  
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      return;
    }
  }
  
  if (reaction.emoji.name === '✅' && reaction.message.embeds.length > 0) {
    const embed = reaction.message.embeds[0];
    
    if (embed.title === '📜 PRAVILA SERVERA') {
      const member = reaction.message.guild.members.cache.get(user.id);
      const verifiedRole = reaction.message.guild.roles.cache.find(r => r.name === 'Verified');
      
      if (verifiedRole && member) {
        await member.roles.add(verifiedRole);
        
        // Čekaj 1 sekundu pa daj drugi role
        setTimeout(async () => {
          const secondRole = reaction.message.guild.roles.cache.find(r => r.name === '------------------');
          if (secondRole) {
            await member.roles.add(secondRole);
          }
        }, 1500);
      }
    }
  }
});


// StringSelectMenu handler
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  
  if (interaction.customId === 'lane_select') {
    const member = interaction.member;
    
    // Mapa role naziva
    const roleMap = {
      'top': 'Top Lane',
      'jungle': 'Jungle',
      'mid': 'Mid Lane',
      'dragon': 'Dragon Lane',
      'support': 'Support'
    };
    
    // Svi lane role-ovi
    const allLaneValues = Object.keys(roleMap);
    
    // Odabrani lane-ovi
    const selectedLanes = interaction.values;
    
    // Lane-ovi koje treba maknuti
    const lanesToRemove = allLaneValues.filter(lane => !selectedLanes.includes(lane));
    
    const addedRoles = [];
    const removedRoles = [];
    
    // Makni lane role-ove koje NISU odabrane
    for (const laneValue of lanesToRemove) {
      const roleName = roleMap[laneValue];
      const role = interaction.guild.roles.cache.find(r => r.name === roleName);
      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        removedRoles.push(roleName);
      }
    }
    
    // Dodaj odabrane role-ove
    for (const laneValue of selectedLanes) {
      const roleName = roleMap[laneValue];
      const role = interaction.guild.roles.cache.find(r => r.name === roleName);
      if (role && !member.roles.cache.has(role.id)) {
        await member.roles.add(role);
        addedRoles.push(roleName);
      }
    }
    
    // Čekaj 1 sekundu pa provjeri opet
    setTimeout(async () => {
      await member.fetch();
      
      // Dodaj ako još nisu dodani
      for (const laneValue of selectedLanes) {
        const roleName = roleMap[laneValue];
        const role = interaction.guild.roles.cache.find(r => r.name === roleName);
        if (role && !member.roles.cache.has(role.id)) {
          await member.roles.add(role);
        }
      }
    }, 1000);
    
    // Pripremi poruku
    let message = '';
    if (addedRoles.length > 0) {
      message += `✅ Dodano: ${addedRoles.join(', ')}\n`;
    }
    if (removedRoles.length > 0) {
      message += `❌ Maknuto: ${removedRoles.join(', ')}\n`;
    }
    if (addedRoles.length === 0 && removedRoles.length === 0) {
      message = '✅ Tvoji lane-ovi ostaju isti.';
    }
    
    await interaction.reply({
      content: message,
      flags: [64]
    });
    setTimeout(() => {
      interaction.deleteReply().catch(console.error);
    }, 5000);
  }

  if (interaction.customId === 'color_select') {
    const member = interaction.member;
    
    const colorMap = {
      'crna': '℗ Obsidian',
      'zelena': '℗ Emerald',
      'bijela': '℗ Pearl',
      'roza': '℗ Coral',
      'plava': '℗ Sapphire',
      'zuta': '℗ Gold',
      'crvena': '℗  Ruby',
      'ljubicasta': '℗  Violet'
    };
    
    const allColors = Object.values(colorMap);
    
    // Makni sve boje
    for (const colorName of allColors) {
      const role = interaction.guild.roles.cache.find(r => r.name === colorName);
      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }
    
    // Dodaj odabranu boju (ako je nešto odabrano)
    if (interaction.values.length > 0) {
      const selectedColor = interaction.values[0];
      const colorName = colorMap[selectedColor];
      const role = interaction.guild.roles.cache.find(r => r.name === colorName);
      if (role) {
        await member.roles.add(role);
      }
      
      const reply = await interaction.reply({
        content: `✅ Tvoja boja: ${colorName}`,
        flags: [64]
      });
      
      setTimeout(() => {
        interaction.deleteReply().catch(console.error);
      }, 5000);
    } else {
      const reply = await interaction.reply({
        content: '❌ Boja uklonjena',
        flags: [64]
      });
      
      setTimeout(() => {
        interaction.deleteReply().catch(console.error);
      }, 5000);
    }
  }

  if (interaction.customId === 'rank_select') {
    const member = interaction.member;
    
    const rankMap = {
      'sovereign': 'Sovereign',
      'challenger': 'Challenger',
      'grandmaster': 'Grandmaster',
      'master': 'Master',
      'diamond': 'Diamond',
      'emerald': 'Emerald'
    };
    
    const allRanks = Object.values(rankMap);
    
    // Makni sve rankove
    for (const rankName of allRanks) {
      const role = interaction.guild.roles.cache.find(r => r.name === rankName);
      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }
    
    // Dodaj rank
    if (interaction.values.length > 0) {
      const selectedRank = interaction.values[0];
      const rankName = rankMap [selectedRank];
      const role = interaction.guild.roles.cache.find(r => r.name === rankName);
      if (role) {
        await member.roles.add(role);
      }
      
      const reply = await interaction.reply({
        content: `✅ Tvoj rank: ${rankName}`,
        flags: [64]
      });
      
      setTimeout(() => {
        interaction.deleteReply().catch(console.error);
      }, 5000);
    } else {
      const reply = await interaction.reply({
        content: '❌ Rank uklonjen',
        flags: [64]
      });
      
      setTimeout(() => {
        interaction.deleteReply().catch(console.error);
      }, 5000);
    }
  }

  if (interaction.customId === 'lrank_select') {
    const member = interaction.member;
    
    const lrankMap = {
      'legends': 'Legend',
      'lchallenger': 'Legendary Challenger',
      'lgrandmaster': 'Legendary Grandmaster',
      'lmaster': 'Legendary Master',
      'lcommander': 'Legendary Commander'
    };
    
    const alllRanks = Object.values(lrankMap);
    
    // Makni sve rankove
    for (const lrankName of alllRanks) {
      const role = interaction.guild.roles.cache.find(r => r.name === lrankName);
      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }
    
    // Dodaj rank
    if (interaction.values.length > 0) {
      const selectedlRank = interaction.values[0];
      const lrankName = lrankMap [selectedlRank];
      const role = interaction.guild.roles.cache.find(r => r.name === lrankName);
      if (role) {
        await member.roles.add(role);
      }
      
      const reply = await interaction.reply({
        content: `✅ Tvoj rank: ${lrankName}`,
        flags: [64]
      });
      
      setTimeout(() => {
        interaction.deleteReply().catch(console.error);
      }, 5000);
    } else {
      const reply = await interaction.reply({
        content: '❌ Rank uklonjen',
        flags: [64]
      });
      
      setTimeout(() => {
        interaction.deleteReply().catch(console.error);
      }, 5000);
    }
  }
});
};