const config = require('../../config.json');
const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
    await message.delete();
    if (message.member.roles.cache.has(config.bot.roles.staff)) {
        if (args.length == 0)
            await message.channel.send('```log\n' + require('child_process').execSync('cat /home/zaph/.pm2/logs/app-out.log | tail -n 50').toString() + '\n```').then(msg => msg.delete({timeout: 60000}));
        else if (args.length == 1) {
            if (!isNaN(args[0])) {
                await message.channel.send('```log\n' + require('child_process').execSync('cat /home/zaph/.pm2/logs/app-out.log | tail -n '+args[0]).toString() + '\n```').then(msg => msg.delete({timeout: 60000}));
            } else{
                await message.channel.send(args[0] + 'was not a number. Please provide a number for this command.').then(msg => msg.delete({timeout: 5000}));
            }
        } else {
            await message.channel.send('This command only takes one argument. Try again.').then(msg => msg.delete({timeout: 5000}));
        }
    } else {
        await message.channel.send('You do not have permissions for that.').then(msg => msg.delete({timeout: 5000}));
    }

}

module.exports.config = {
    name: 'get log',
    aliases: ['fetch log', 'show log', 'get status', 'log please',],
    description: 'Has something happened recently? Need me to show you the log?',
}
