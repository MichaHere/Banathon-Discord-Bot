const config = require("../../config.json")
const Client = require("discord.js");


module.exports = {
    name: "clear",
    aliases: ["purge", "c", "delete", "remove", "del", "rm"],
    category: "Moderation",
    description: "📩 Deletes up to 100 messages send in the last two weeks.",
    usage: `${config.prefix}clear <optional: amount (1-100)>`,
    permissions: "Manage Messages",
    run: async (client, message, args, text) => {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {

            let bulkAmount;

            if (isNaN(args[0])) {
                args[0] = 99;
            }

            if (parseInt(args[0]) <= 0) {
                return message.channel.send(text[24])
            }

            if (parseInt(args[0]) > 100) {
                return message.channel.send(text[25])
            } else {
                bulkAmount = parseInt(args[0]);
            }

            if (bulkAmount === 100) { bulkAmount = 99 }

            message.channel.bulkDelete(bulkAmount + 1, true)

            if (bulkAmount === 1) {
                const msg = await message.channel.send(text[27])
                msg.delete({ timeout: 5000 });

            } else if (bulkAmount === 99) {
                const msg = await message.channel.send(text[28] + (bulkAmount + 1) + text[29])
                msg.delete({ timeout: 5000 });
            } else {
                const msg = await message.channel.send(text[28] + bulkAmount + text[29])
                msg.delete({ timeout: 5000 });
            }


        } else {
            message.reply(text[30])
        }
    }
}
