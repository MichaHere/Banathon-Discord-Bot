const { Client, RichEmbed, Collection, Role } = require("discord.js");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Client({
    disableEveryone: true,
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});


client.commands = new Collection();
client.aliases = new Collection();



["command"].forEach(handler => {
    require(`./Handler/${handler}`)(client);
});

const text_original = [
    "`✨` The magical 8ball `can't see your question`", "**Question:** ", "\n**Answer:** ", //8ball
    ':coin: Flipping...', "Heads", "Tails", `:coin: You got `, //coinflip
    "Rock Paper Scissors", 'playing with: ', "Pick your choice:\nYou can choose to react with:\n:rock: to play rock\n📄 to play paper\n✂ to play scissors", "you can not use ", " for this command❗", //rock,paper,scissors
    "Bot info", " info", "you need the manage messages permission for this command❗", //bot
    "help <command>```Use the command above to show information about a specific command.\n\nIf find a bug or you need help with the bot click [here](https://discord.gg/9dNH9vD6Ja)\n\nIf you react to the message you can show a command category.\n\n**React with:**\n❓ For information commands.\n🔧 For moderation commands.\n🎉 For entertainment commands.", "❗Command `", "` does not exist", ", info help", ", mod help", ", fun help", //help
    `member `, ` is not found❗`, "User Info:", //userinfo
    "🎲 You need `a higher amount to delete`,\n🎐 You can't fly into the ground", "🎐 You've tried to fly past `the limit of 100 messages`", "You can't delete massages older than two weeks❗", "`📩` 1 message `has been deleted.`", "`📩` ", " messages `have been deleted`", "you need the manage messages permission for this command❗", //clear
    "Do you want a title?", "Your embed is empty❗", "What do you want to set as title?", //embed
    "What do you want me to say:question:" //random
]

const text = [
    text_original
]

client.on("ready", () => {
    console.log(client.user.username + " is connected to discord")

    client.user.setActivity(`${config.prefix}help 🖍`, { type: 'PLAYING' })

});

//Client Events:

client.on("guildMemberAdd", (member) => {
    console.log(`+${member.username} joint ${member.guild.name}`)
})

client.on("guildMemberRemove", (member) => {
    console.log(`-${member.username} left ${member.guild.name}`)
})

client.on("guildCreate", (guild) => {
    console.log(`|+${client.user.username} joint server: ${guild.name}`)
})

client.on("guildDelete", (guild) => {
    console.log(`|-${client.user.username} got kicked out of server: ${guild.name}`)
})

client.on("message", async (message) => {
    var activateCommand = true

    const prefix = config.prefix

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (activateCommand === true) {
        if (command)
        command.run(client, message, args, text[0]);
    }


})

client.login(config["test-token"]);
