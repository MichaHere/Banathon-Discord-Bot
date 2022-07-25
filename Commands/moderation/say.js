const { Message } = require("discord.js");
const Client = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "say",
    aliases: ["s", "talk"],
    category: "Moderation",
    description: "💬 Returns whatever you want the bot to say.",
    usage: `${config.prefix}say <text>`,
    permissions: "Manage Messages",
    run: async (client, message, args, text) => {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (args != "") {
                message.channel.send(args.join(" "))

            } else {
                message.channel.send(text[34])
            }
        } else {
            message.reply(text[30])
        }
    }
}
