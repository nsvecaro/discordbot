const { Client, GatewayIntentBits, Events } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ] 
});

client.once(Events.ClientReady, () => {
  console.log('✅ Bot online!');

  // Pokreni periodičnu provjeru Wild Rift role-ova svakih 10 minuta
  setInterval(async () => {
    console.log('🔍 Provjeravam Wild Rift role-ove...');

    try {
      const guild = client.guilds.cache.first();
      if (!guild) return;

      const wildRiftRoleName = 'ㅤㅤㅤㅤㅤㅤ∙ 𝗪𝗜𝗟𝗗 𝗥𝗜𝗙𝗧 ∙‎‎‎‎‎‎‎‎ㅤㅤㅤㅤㅤㅤㅤㅤㅤ';
      const wildRiftRole = guild.roles.cache.find(r => r.name === wildRiftRoleName);

      if (!wildRiftRole) return;

      // Dohvati sve članove koji imaju Wild Rift role
      await guild.members.fetch();
      const membersWithWildRift = guild.members.cache.filter(m => m.roles.cache.has(wildRiftRole.id));

      // Svi rankovi, legendary rankovi i lane-ovi
      const allRanks = ['Sovereign', 'Challenger', 'Grandmaster', 'Master', 'Diamond', 'Emerald'];
      const allLegendaryRanks = ['Legend', 'Legendary Challenger', 'Legendary Grandmaster', 'Legendary Master', 'Legendary Commander'];
      const allLanes = ['Top Lane', 'Jungle', 'Mid Lane', 'Dragon Lane', 'Support'];
      const allRequiredRoles = [...allRanks, ...allLegendaryRanks, ...allLanes];

      let removedCount = 0;

      // Provjeri svakog člana
      for (const [, member] of membersWithWildRift) {
        const hasRequiredRole = allRequiredRoles.some(roleName => {
          const role = guild.roles.cache.find(r => r.name === roleName);
          return role && member.roles.cache.has(role.id);
        });

        // Ako nema nijednu potrebnu ulogu, makni Wild Rift role
        if (!hasRequiredRole) {
          await member.roles.remove(wildRiftRole);
          removedCount++;
          console.log(`  ❌ Maknut Wild Rift role od ${member.user.tag}`);
        }
      }

      console.log(`✅ Provjera završena. Maknuto ${removedCount} Wild Rift role-ova.`);
    } catch (error) {
      console.error('❌ Greška u periodičnoj provjeri:', error.message);
    }
  }, 10 * 60 * 1000); // 10 minuta
});

// Učitaj messageCreate event
require('./events/messageCreate')(client, config);

client.login(config.token);