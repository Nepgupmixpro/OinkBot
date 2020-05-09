const config = require('../../config.json');
const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
    if (message.member.roles.cache.has(config.bot.roles.staff)) {
        let role =  message.guild.roles.cache.get(config.bot.roles.event)
        await role.setMentionable(!role.mentionable, 'Event toggle command').catch(console.error);
        await message.channel.send(`Event role is ${(role.mentionable) ? 'now' : 'no longer'} mentionable.`).then(msg => msg.delete({timeout: 5000}))
    } else {
        await message.channel.send('You do not have permissions for that.').then(msg => msg.delete({timeout: 5000}))
    }

}

module.exports.config = {
    name: 'toggle event',
    aliases: ['toggle event mentionable', 'toggle event', 'change event mentionable', 'change event status',],
    description: 'Are we starting an event? Cool! Let me make sure everyone notices!',
}
