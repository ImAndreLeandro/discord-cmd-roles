const Discord = require('discord.js');

exports.run = async (client, message, args) => {
 
  let page = 1;
  
  const m = await message.channel.send("Getting roles...");
  
  let is = true;
  p(message, m, client, is, page);
  
}

async function p(message, m, client, is, page) {
  let roles = message.guild.roles.array();
  
  let msg = "Total roles: **" + roles.length + "**\n";
  
  msg += "\nPage: **" + page + "**\n";
  
  let start = 0 + ((page - 1) * 10);
  let last = 10 + ((page - 1) * 10);
  
  let pages = Math.ceil(roles.length/10);
  if (page > pages) {
    msg += "\n:x: There is no more roles to show! :x:";
  }
  
  for (let i = start; i<last; i++) {
    if (i < roles.length) {
      msg += "\n__" + roles[i].name + "__ (ID: `" + roles[i].id + "`)";
    }
  }
  
  msg += "\n\n";
  if (page > 1) {
    msg += "Change to the previous page with ◀!\n";
  }
  msg += "Change to the next page with ▶!\n";
  
  let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name.toUpperCase() + " ROLES:")
    .setColor([54, 57, 163])
    .setDescription(msg);
  
  await m.edit(embed);
  
  await m.clearReactions();
  if (page > 1) {
    await m.react("◀");
  }
  await m.react("▶");
  
  is = true;
  
  const reactions = await m.awaitReactions(reaction => {
    let a = reaction.users.array();
    if ((a[1] === message.author) && (is === true)) {
      if ((reaction.emoji.name === "▶")) {
        page += 1;
        p(message, m, client, is, page);
        is = false;
      }
      if ((reaction.emoji.name === "◀")) {
        page -= 1;
        p(message, m, client, is, page);
        is = false;
      }
    }
  }, {time: 60000});
}
