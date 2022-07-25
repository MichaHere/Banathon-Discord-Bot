const Client = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "embed",
    aliases: ["em"],
    category: "Moderation",
    description: "🌀 Returns whatever you want in a embed.",
    usage: `${config.prefix}embed <description>`,
    permissions: "Manage Messages",
    run: async (client, message, args, text) => {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                const webhooks = await message.channel.fetchWebhooks();
                var webhook = webhooks.first();

                var webhookName = message.author.username

                if(message.member.nickname) {
                    webhookName = message.member.nickname
                }

                

                const sender = message.author
                const originalMessage = message
                
                const roleColor = message.member.displayHexColor === "#000000" ? "#e5e5e5" : message.member.displayHexColor;

                var embed = new Client.MessageEmbed()
                    .setDescription(message.content.replace(config.prefix + "embed " + args[0] + " " + args[1], ""))                    
                    .setColor(roleColor)
                    

                if(message.attachments.array()[0]){
                    var attach = message.attachments.array()
                    embed.setImage(attach[0].url)
                }


                const title = await message.channel.send(text[31])
                title.react("✅")
                title.react("🇽")

                client.on("messageReactionAdd", async (reaction, user) => {
                    if (reaction.message === title && reaction.emoji.name === "🇽") {
                        if (user.bot) return;
                        title.delete();
                        
                        if (!args[0]) {
                            var replyErr = await message.reply(text[32]);
                            return replyErr.delete({ timeout: 10000 })
                        }
                        if (!webhook)
                            webhook = message.channel.createWebhook('Fuwa Bot; say', { avatar: client.user.avatarURL() })
                                .then(webhook => {
                                    webhook.send("", {
                                        "username": webhookName,
                                        "avatarURL": message.author.avatarURL(),
                                        "embeds": [embed.setDescription(args.join(" "))],
                                    })
                                })
                        else {
                            await webhook.send("", {
                            "username": webhookName,
                            "avatarURL": message.author.avatarURL(),
                            "embeds": [embed.setDescription(args.join(" "))],
                            })
                        
                        }
                        message.delete();
            
                    }
                    if (reaction.message === title && reaction.emoji.name === "✅") {
                        if (user.bot) return;
                        title.reactions.removeAll()
                        title.edit(text[33]);
                        
                        let Interval = setInterval(function() {
                            if (title.id !== message.channel.lastMessageID) {
                                if (message.channel.lastMessage.author === sender) {
                                    const embedTitle = message.channel.lastMessage

                                    title.delete()
                                    embedTitle.delete()

                                    if (!webhook)
                                        webhook = message.channel.createWebhook('Fuwa Bot; say', { avatar: client.user.avatarURL() })
                                            .then(webhook => {
                                                webhook.send("", {
                                                    "username": webhookName,
                                                    "avatarURL": message.author.avatarURL(),
                                                    "embeds": [embed.setDescription(args.join(" ")).setTitle(embedTitle.content)],
                                                })
                                            })
                                    else {
                                        webhook.send("", {
                                        "username": webhookName,
                                        "avatarURL": message.author.avatarURL(),
                                        "embeds": [embed.setDescription(args.join(" ")).setTitle(embedTitle.content)],
                                        })
                                    
                                    }

                                    clearInterval(Interval)
                                    message.delete();
                                }
                            }
                        }, client.ping )
                        
                        

                    }

                })
        

            } else {
                message.reply(text[30])
            
        }

    }

}