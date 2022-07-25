const { Message } = require("discord.js");
const config = require("../../config.json");
const ms = require('ms')
const Client = require("discord.js");

module.exports = {
    name: "bot",
    aliases: [ "ping", "invite", "whatamidoing", "info"],
    category: "Information",
    description: "📠 Returns information about the bot.",
    usage: `${config.prefix}bot <optional: type>`,
    permissions: "None",
    run: async (client, message, args, text) => {

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#e5e5e5" : message.guild.me.displayHexColor;

        client.users.cache.tap(all => users = all.size)

        client.guilds.cache.tap(all => guilds = all.size)

        if(!args[0]){
            const embed = new Client.MessageEmbed()
                .setTitle(text[12])
                .addFields(
                    { name: "Users", value: users, inline: true },
                    { name: "Guilds", value: guilds, inline: true },
                    { name: "Uptime", value: ms(client.uptime, { long: true }), inline: true },
                    { name: "Invite", value: `[[Invite link]](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands)`, inline: true },
                    { name: "ping", value: "pinging...", inline: true },
                )
                .setFooter(client.user.username + text[13], client.user.avatarURL())
                .setColor(roleColor)

            const awaitping = await message.channel.send(embed)

            awaitping.edit(embed.spliceFields(4, 1).addFields( { name: "ping", value: Math.floor(awaitping.createdAt - message.createdAt) + 'ms', inline: true } ))

        } else {
            if(args[0].toLowerCase() === "ping"){
                const msg = await message.channel.send('🏓 pinging...')


            msg.edit('🏓 ponged at a latency of `' + Math.floor(msg.createdAt - message.createdAt) + 'ms`')
            } else if(args[0].toLowerCase() === "uptime" || args[0].toLowerCase() === "up"){
                message.channel.send('⌚ The bots uptime is `' + ms(client.uptime, { long: true }) + "`")
            } else if(args[0].toLowerCase() === "invite"|| args[0].toLowerCase() === "inv"){
                message.channel.send(new Client.MessageEmbed().setDescription(`**[Invite link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands)**`).setColor(roleColor))
            } else if(args[0].toLowerCase() === "users" || args[0].toLowerCase() === "u"){
                message.channel.send("🗂 The bot currently has `"+users+"` users")
            } else if(args[0].toLowerCase() === "guilds" || args[0].toLowerCase() === "g") {
                message.channel.send("🗂 The bot is currently in `"+guilds+"` guilds")
            } else { message.reply(text[14]) }
        }


    }
}
