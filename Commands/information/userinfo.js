const Client = require("discord.js");
const config = require("../../config.json");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ["user", "about", "idontcareaboutprivacy"],
    category: "Information",
    description: "📑 Shows the info of a specified user.",
    usage: `${config.prefix}userinfo <user>`,
    permissions: "None",
    run: async (client, message, args, text) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (member.user.presence.status === 'dnd') member.user.presence.status = 'Do Not Disturb';
        if (member.user.presence.status === 'online') member.user.presence.status = 'Online';
        if (member.user.presence.status === 'idle') member.user.presence.status = 'Idle';
        if (member.user.presence.status === 'offline') member.user.presence.status = 'Offline';

        let status = member.user.presence.status;

        if (!member.nickname) member.nickname = "None"

        let badges = await member.user.flags
        badges = await badges.toArray();

        let newbadges = [];
        badges.forEach(m => {
            newbadges.push(m.replace("_", " "))
        })

        if (!newbadges[0]) newbadges = "None"


        const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        const createddate = moment.utc(member.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss");

        if (args[0] && member === message.member) {
            return message.reply(text[21] + args[0] + text[22])
        }


        if (!member.user.avatarURL()) {
            var avatar = member.user.defaultAvatarURL
        } else var avatar = member.user.avatarURL()

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#e5e5e5" : message.guild.me.displayHexColor;

        const embed = new Client.MessageEmbed()
            .setAuthor(member.user.tag, avatar)
            .setTitle(text[23])
            .setThumbnail(avatar)
            .setColor(roleColor)
            .addFields(
                { name: "Joined server at", value: joineddate, inline: true },
                { name: "Joined discord at", value: createddate, inline: true },
                { name: "Role", value: member.roles.highest.name, inline: true },
                { name: "Nickname", value: member.nickname, inline: true },
                { name: "Status", value: member.presence.activities.length, inline: true },
                { name: "badges", value: newbadges, inline: true }

        )
        message.channel.send(embed)


    }
}
