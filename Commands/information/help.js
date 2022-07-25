const Client = require("discord.js");
const config = require("../../config.json")
const cBot = require("./bot")
const cEmbed = require("../moderation/embed")
const cClear = require("../moderation/clear")
const cSay = require("../moderation/say")
const c8ball = require("../entertainment/8ball")
const cCoinflip = require("../entertainment/coinfilp")
const cRockPaperScissors = require("../entertainment/Rock,Paper,Scissors")
const cUserinfo = require("./userinfo")
const cTrueart = require("../entertainment/trueart")

module.exports = {
    name: "help",
    aliases: ["h", "?", "uhmmm", "sorrywhat"],
    category: "Information",
    description: "❓ Shows all the bot commands.",
    usage: `${config.prefix} help <optional: command>`,
    permissions: "None",
    run: async (client, message, args, text) => {
        try{


            const commandList = [cBot, cEmbed, cClear, cSay, cCoinflip, c8ball, cUserinfo, cRockPaperScissors]

            const roleColor = message.guild.me.displayHexColor === "#000000" ? "#2f3136" : message.guild.me.displayHexColor

            const embed = new Client.MessageEmbed()
                .setTitle("Help")
                .setDescription("```" + config.prefix + text[15])
                .setThumbnail("https://cdn.discordapp.com/attachments/860541906974801930/860543457469792266/banana_art_icon.png")
                .setFooter(client.user.username + ", help", client.user.avatarURL())
                .setColor(roleColor)

            if (args[0]) {
                var exist = false
                arg = message.content.toLowerCase().trim().split(/ +/g);
                commandList.forEach(function (command) {

                    if (arg.includes(command.name) || command.aliases.includes(args[0])){
                        exist = true
                        return message.channel.send(embed
                            .setTitle("Help: " + command.name)
                            .setDescription("")
                            .addFields(
                                { name: config.prefix + command.name, value: "`Description:` \n" + command.description + "\n`Usage:` \n" + command.usage + "\n`Aliases:` \n" + command.aliases.join(", ") + "\n`category:` \n" + command.category + "\n`permissions:` \n" + command.permissions }
                            ))
                    }

                })
                if (exist === false) {
                    message.channel.send(text[16] + args.join(" ") + text[17])
                }

            } else {

                const msg = await message.channel.send(embed);

                msg.react('❓');
                msg.react('🔧');
                msg.react('🎉');

                client.on("messageReactionAdd", async (reaction, user) => {
                    if (reaction.message === msg && reaction.emoji.name === "❓") {
                        if (user.bot) return;
                        msg.edit(embed
                            .setTitle("Info Help")
                            .setDescription("")
                            .spliceFields(0, 100)
                            .addFields(
                                { name: config.prefix + "help", value: "`Description:` \n❓ Shows all the bot commands." + "\n`Usage:` \n" + config.prefix + "help" + "\n`Aliases:` \nh, ?", inline: true },
                                { name: config.prefix + cBot.name, value: "`Description:` \n" + cBot.description + "\n`Usage:` \n" + cBot.usage + "\n`Aliases:` \n" + cBot.aliases.join(", "), inline: true },
                                { name: config.prefix + cUserinfo.name, value: "`Description:` \n" + cUserinfo.description + "\n`Usage:` \n" + cUserinfo.usage + "\n`Aliases:` \n" + cUserinfo.aliases.join(", "), inline: false }
                            )
                            .setFooter(client.user.username + text[18], client.user.avatarURL())
                        )
                        msg.reactions.resolve('❓').remove()
                        msg.react('🔧');
                        msg.react('🎉');
                    }
                    if (reaction.message === msg && reaction.emoji.name === "🔧") {
                        if (user.bot) return;
                        msg.edit(embed
                            .setTitle("Mod Help")
                            .setDescription("")
                            .spliceFields(0, 100)
                            .addFields(
                                { name: config.prefix + cEmbed.name, value: "`Description:` \n" + cEmbed.description + "\n`Usage:` \n" + cEmbed.usage + "\n`Aliases:` \n" + cEmbed.aliases.join(", ") + "\n`permissions:` \n" + cEmbed.permissions, inline: true },
                                { name: config.prefix + cClear.name, value: "`Description:` \n" + cClear.description + "\n`Usage:` \n" + cClear.usage + "\n`Aliases:` \n" + cClear.aliases.join(", ") + "\n`permissions:` \n" + cClear.permissions, inline: true },
                                { name: config.prefix + cSay.name, value: "`Description:` \n" + cSay.description + "\n`Usage:` \n" + cSay.usage + "\n`Aliases:` \n" + cSay.aliases.join(", ") + "\n`permissions:` \n" + cSay.permissions, inline: false }
                            )
                            .setFooter(client.user.username + text[19], client.user.avatarURL())
                        )
                        msg.reactions.resolve('🔧').remove()
                        msg.react('❓');
                        msg.react('🎉');
                    }
                    if (reaction.message === msg && reaction.emoji.name === "🎉") {
                        if (user.bot) return;
                        msg.edit(embed
                            .setTitle("Fun Help")
                            .setDescription("")
                            .spliceFields(0, 100)
                            .addFields(
                                { name: config.prefix + c8ball.name, value: "`Description:` \n" + c8ball.description + "\n`Usage:` \n" + c8ball.usage + "\n`Aliases:` \n" + c8ball.aliases.join(", "), inline: true },
                                { name: config.prefix + cCoinflip.name, value: "`Description:` \n" + cCoinflip.description + "\n`Usage:` \n" + cCoinflip.usage + "\n`Aliases:` \n" + cCoinflip.aliases.join(", "), inline: true },
                                { name: config.prefix + cRockPaperScissors.name, value: "`Description:` \n" + cRockPaperScissors.description + "\n`Usage:` \n" + cRockPaperScissors.usage + "\n`Aliases:` \n" + cRockPaperScissors.aliases.join(", "), inline: true },
                                { name: config.prefix + cTrueart.name, value: "`Description:` \n" + cTrueart.description + "\n`Usage:` \n" + cTrueart.usage + "\n`Aliases:` \n" + cTrueart.aliases.join(", "), inline: true },
                            )
                            .setFooter(client.user.username + text[20], client.user.avatarURL())
                        )
                        msg.reactions.resolve('🎉').remove()
                        msg.react('🔧');
                        msg.react('❓');
                    }

                })

            }
        }catch(err) {
            console.log(err)
        }

    }
}
