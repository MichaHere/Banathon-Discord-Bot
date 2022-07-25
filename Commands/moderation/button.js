const  { Client, Message, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "button",
    aliases: ["butt"],
    category: "Moderation",
    description: "💬 Returns whatever you want the bot to say.",
    usage: `${config.prefix}button <text>`,
    permissions: "Manage Messages",
    run: async (client, message, args, text) => {

      console.log(MessageButton)

      // const row = new MessageActionRow()
      //   .addComponents(
      //     new MessageButton()
      //       .setCustomId('yes')
      //       .setEmoji('✅')
      //       .setLabel('Yes')
      //       .setStyle('SUCCESS')
      //   )
      //   .addComponents(
      //     new MessageButton()
      //       .setCustomId('no')
      //       .setEmoji('🇽')
      //       .setLabel('No')
      //       .setStyle('DANGER')
      //   )


      await message.channel.send("Message with a button!");
    }
}
