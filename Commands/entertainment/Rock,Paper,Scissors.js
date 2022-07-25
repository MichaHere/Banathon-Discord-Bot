const { Message } = require("discord.js");
const Client = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "rockpaperscissors",
    aliases: ["rps"],
    category: "Entertainment",
    description: ":rock: Play a game of rock paper scissors.",
    usage: `${config.prefix}rps <optional: choice>`,
    permissions: "None",
    run: async (client, message, args, text) => {

        if (!message.author.avatarURL()) {
            var avatar = message.author.defaultAvatarURL
        } else var avatar = message.author.avatarURL()

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#e5e5e5" : message.guild.me.displayHexColor;

        const embed = new Client.MessageEmbed()
                .setTitle(text[7])
                .setFooter(text[8] + message.author.username, avatar)
                .setColor(roleColor)


        var choices = ["🪨", "📄", "✂"]
        randomChoice = choices[Math.floor(Math.random() * choices.length)];

        var IWin = ["Calculated!", "I have won this game", "I win, try next time", "Luck was on my side!", "This was my win!", "I win!",
                    "I have won the game", "I win, this is fun!", "Thanks for playing this game with me!", "this was my win", "Won again!",
                    "You suck.", "Is this all you have?", "This game is too easy.", "G.G.", "Wow, that was hard!", "Are you sweating already?"]
        var youWin = ["You have won, but I won't lose next time", "You have won the game!", "It's your luck this time", "You've won!",
                    "You win, thanks for playing with me", "I lose, but I won't lose again!", "This was your win!", "Are you kidding me?",
                    "Sooo, lets play again?", "My... My... Are you smart?", "Can you maybe teach me?", "You have won?", "O.K."]
        var draw = ["It's a draw, maybe next time", "Pfff, close call", "Let's play again!", "Next game I will win!", "It's a draw, wanna play again?",
                    "It's a tie", "It's a tie! Your good at this game", "Let's play one more time!", "OH. NO.", "How did you know what I was going to do?",
                    "Thats... Draw..?", "Let me try again.", "Yoo, we match.", "So, how was your day?", "Are you kidding me?", "What is this?", "How..."]

        if (!args[0]) {
            var embedMsg = await message.channel.send(embed
                .setDescription(text[9]
                ))
            embedMsg.react("🪨")
            embedMsg.react("📄")
            embedMsg.react("✂")

            client.on("messageReactionAdd", async (reaction, user) => {
                if (reaction.message === embedMsg && reaction.emoji.name === "🪨") {
                    if (user.bot) return;
                    var score
                    if (randomChoice === "🪨") score = draw[Math.floor(Math.random() * draw.length)]
                    if (randomChoice === "📄") score = IWin[Math.floor(Math.random() * IWin.length)]
                    if (randomChoice === "✂") score = youWin[Math.floor(Math.random() * youWin.length)]
                    embedMsg.edit(embed
                        .setDescription(`🪨 vs ${randomChoice}\n\n${score}`))
                    embedMsg.reactions.removeAll()

                }
                if (reaction.message === embedMsg && reaction.emoji.name === "📄") {
                    if (user.bot) return;
                    var score
                    if (randomChoice === "🪨") score = youWin[Math.floor(Math.random() * youWin.length)]
                    if (randomChoice === "📄") score = draw[Math.floor(Math.random() * draw.length)]
                    if (randomChoice === "✂") score = IWin[Math.floor(Math.random() * IWin.length)]
                    embedMsg.edit(embed
                        .setDescription(`📄 vs ${randomChoice}\n\n${score}`))
                    embedMsg.reactions.removeAll()

                }
                if (reaction.message === embedMsg && reaction.emoji.name === "✂") {
                    if (user.bot) return;
                    var score
                    if (randomChoice === "🪨") score = IWin[Math.floor(Math.random() * IWin.length)]
                    if (randomChoice === "📄") score = youWin[Math.floor(Math.random() * youWin.length)]
                    if (randomChoice === "✂") score = draw[Math.floor(Math.random() * draw.length)]
                    embedMsg.edit(embed
                        .setDescription(`✂ vs ${randomChoice}\n\n${score}`))
                    embedMsg.reactions.removeAll()

                }
            })
        } else {
            if (args[0].toLowerCase() === "rock") {
                var score
                if (randomChoice === "🪨") score = draw[Math.floor(Math.random() * draw.length)]
                if (randomChoice === "📄") score = IWin[Math.floor(Math.random() * IWin.length)]
                if (randomChoice === "✂") score = youWin[Math.floor(Math.random() * youWin.length)]
                message.channel.send(embed
                    .setDescription(`🪨 vs ${randomChoice}\n\n${score}`))

            } else if (args[0].toLowerCase() === "paper") {
                var score
                if (randomChoice === "🪨") score = youWin[Math.floor(Math.random() * youWin.length)]
                if (randomChoice === "📄") score = draw[Math.floor(Math.random() * draw.length)]
                if (randomChoice === "✂") score = IWin[Math.floor(Math.random() * IWin.length)]
                message.channel.send(embed
                    .setDescription(`📄 vs ${randomChoice}\n\n${score}`))

            }else if (args[0].toLowerCase() === "scissors") {
                var score
                if (randomChoice === "🪨") score = IWin[Math.floor(Math.random() * IWin.length)]
                if (randomChoice === "📄") score = youWin[Math.floor(Math.random() * youWin.length)]
                if (randomChoice === "✂") score = draw[Math.floor(Math.random() * draw.length)]
                message.channel.send(embed
                    .setDescription(`✂ vs ${randomChoice}\n\n${score}`))
            } else {
                message.reply(text[10] + args[0] + text[11])
            }


        }
    }
}
