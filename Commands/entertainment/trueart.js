const { Message } = require("discord.js");
const Client = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "trueart",
    aliases: ["ta", "realart"],
    category: "Entertainment",
    description: ":art: What art truly is.",
    usage: `${config.prefix}trueart`,
    permissions: "None",
    run: async (client, message, args, text) => {
        const arts = ["https://cdn.discordapp.com/attachments/860541906974801930/860544388677238804/banana_art.png", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthemiamireporter.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fthis-art-is-bananas.jpg"]

        var tmpnum = Math.random()
        if (tmpnum < 0.860544388677238804) {
            message.channel.send(arts[1])
        }
        else {
            message.channel.send(arts[0])
        }
    }
}
