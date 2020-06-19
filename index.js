const Discord = require("discord.js");

const Discord = require('discord.js');
const bot = new Discord.Client();

const mongoose = require("mongoose");

const Case = require("./CaseData");

const GD = require("./GuildData");

mongoose.connect("mongodb+srv://Blue:Syntax@ytcluster-uf1vs.mongodb.net/YTCluster?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true}); //This makes it possible to set up mod mail in different servers, feel free to change this to your database.

exports.printMsg = function(prefix) {
    console.log("This is a message from the demo package");


bot.on("message", async (message) => {
    if(message.channel.type == "dm") return;
    if(message.content.startsWith(prefix + "setC")) {
        await GD.findOne({
            ID: message.guild.id
        }, (err, gD) => {
            if(err) console.log(err);
            if(!gD) {
                const newCaseData = new GD({
                    ID: message.guild.id,
                    C: message.channel.id
                });
                newCaseData.save();
            } else {
                gD.C = message.channel.id;
                gD.save();
            }
        });
        message.channel.send("Done");
    }
});

bot.on("message", async (message) => {
    if(message.author.bot) {
        return;
    }
    var GCI = "";
    if(!message.channel.type == "dm") return;
    const args = message.content.slice(prefix.length).split(" ");
    const arg = message.content.slice(args[0].length + prefix.length).split(" ").join(" ");
    var A = message.author.username;
    var D = message.author.discriminator;
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(A +  "|" + message.author.id)
    .setDescription(arg)
    .setFooter(A + "#" + D)
    .setTimestamp()
    await GD.findOne({
        ID: args[0]
    }, (err, gD) => {
        if(err) console.log(err);
        if(!gD) {
            //If you wanna send message here!
            return;
        } else {
            GCI = gD.C;
        }
    });
    if(message.channel.type == "dm") {
        bot.channels.fetch(GCI).then(c => c.send(embed).catch(err => console.log(err)));
    }
});
bot.on("message", (message) => {
    const args = message.content.slice(prefix.length).split(" ");
    const arg = message.content.slice(args[0].length + prefix.length).split(" ").join(" ");
    if(message.content.startsWith("?")) {
    var A = message.author.username;
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(A)
    .setDescription(arg)
    .setTimestamp()
    bot.users.fetch(args[0]).then(user => user.send(embed).catch(err => console.log(err)));
    }
});
}