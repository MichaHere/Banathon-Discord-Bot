const config = require("../../config.json")
const Client = require("discord.js");

module.exports = {
    name: "8ball",
    aliases: ["8b", "ball", "8bll", "8bal", "bal"],
    category: "Entertainment",
    description: "✨ Ask the 8ball any question.",
    usage: `${config.prefix}8ball <question>`,
    permissions: "None",
    run: async (client, message, args, text) => {
        if (!args[0]) return message.channel.send(text[0])

        let responses = ["As I see it, yes.",
                        "Ask again later.",
                        "Better not tell you now.",
                        "Cannot predict now.",
                        "Concentrate and ask again.",
                        "Don’t count on it.",
                        "It is certain.",
                        "It is decidedly so.",
                        "Most likely.",
                        "My reply is no.",
                        "My sources say no.",
                        "Outlook not so good.",
                        "Outlook good.",
                        "Reply hazy, try again.",
                        "Signs point to yes.",
                        "Very doubtful.",
                        "Without a doubt.",
                        "Yes.",
                        "Yes – definitely.",
                        "As I see it, yes.",
                        "You may rely on it",
                        "Uhmmm, let me think about this.",
                        "What did you say? I didn't hear you.",
                        "Sooooo, how was your day?",
                        "...",
                        "O.K.",
                        "Why are you asking",
                        "ASHuihASIUFdhASLfhdAUIShfdoASd",
                        ":heart_eyes:"];

        let result = Math.floor((Math.random() * responses.length));
        let question = args.join(" ");

        const ballEmbed = new Client.MessageEmbed()
        .setDescription(text[1] + question + text[2] + responses[result])
        .setColor([54, 57, 63])

        message.channel.send(ballEmbed)

    }
}
