const Client = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "coinflip",
    aliases: ["cf", "coin", "imbored"],
    category: "Entertainment",
    description: ":coin: Flip a vcoin!",
    usage: `${config.prefix}coinflip`,
    permissions: "None",
    run: async (client, message, args, text) => {
        const msg = await message.channel.send(text[3])

        let cFlip = [text[4], text[5], text[4], text[5]]
        let result = cFlip[Math.floor(Math.random() * cFlip.length)];

        setTimeout(() => {
            msg.edit(text[6] + result)
        }, 1000)

    }
}
