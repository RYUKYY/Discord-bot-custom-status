const Discord = require('discord.js');
const client = new Discord.Client();



// notify when the bot is ready to use
client.once('ready', () => {
    console.log(`[🤖] - ${client.user.username} | ✅`);
});

//Give the ROLE_ID to the member who has the STATUS_CUSTOM
client.on('presenceUpdate', (_oldPresence, newPresence) => {

 
  const roleID = "ROLE_ID"
  const inviteLink = ["STATUS_CUSTOM"]
  const member = newPresence.member
  if (member) {
    // Ignore members who already have the role
    if (!member.roles.cache.has(roleID)) {
      const customStatus = newPresence.activities
        .find(activity => activity.type === 'CUSTOM_STATUS')
        ?.state
      if (customStatus) {
        if (customStatus.includes(inviteLink)) {
          member.roles.add(roleID)
            .catch(console.error)
        }
      }
    }
  }
})

//remove the role of people who have the ROLE_ID but do not have the STATUS_CUSTOM
client.on('presenceUpdate', (_oldPresence, newPresence) => {

  var checkminutes = 5, checkthe_interval = checkminutes * 60 * 1000; //This 

  const roleID = "ROLE_ID"
  const inviteLink = ["STATUS_CUSTOM"]
  const member = newPresence.member
  setInterval(function(){
  if (member) {
    if (member.roles.cache.has(roleID)) {
      const customStatus = newPresence.activities
        .find(activity => activity.type === 'CUSTOM_STATUS')
        ?.state
      if (customStatus) {
        if (customStatus.includes(!inviteLink)) {
          member.roles.remove(roleID)
          .catch(console.error)
        }
      } else (member.roles.remove(roleID))
    }
  }
  }, checkthe_interval);
})

// location of the bot token that allows the bot to log in
client.login("TOKEN_BOT");