// const mySecret = process.env['token']
const express = require('express');
const app = express();
const port = 3000;
const { MessageAttachment } = require('discord.js');
const config = require("./config.json")
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000)
const Discord = require("discord.js");
const client = new Discord.Client(
  {
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
  });

const db = require("quick.db")

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 5 * 1000 * 60);

// const db = require('pro.db')
const prefix = "-"

let righa = "<:emoji_9:1115249326818599003>"
let snow0 = "<:emoji_178:1110189860167356506>"
let snow97 = "<a:emoji_8:1115247633670344745>"
let snowsh = "<:emoji_10:1115252072317730817>"
let snowgg = "<:emoji_15:1115270278797332601>"
let snowbnk = "<:emoji_10:1115253411584167986>"
let flwss = "<:emoji_13:1115258462415364126>"
let bnksh = "<:emoji_14:1115259184305426442>"
let snow24 = "<:emoji_11:1115255717818011678>"
let snower = "<:emoji_16:1115646539222745179>"

client.on("ready", () =>{

console.log(`${client.user.tag} Is Available`);
//client.user.setActivity("", {type: "WATCHING"})


}).setMaxListeners(0)


client.on ('messageCreate',async snow => {

  if(snow.content.startsWith(prefix + "راتب")){

    if(!snow.member.roles.cache.some(r => r.id === config.staff))   return;
    //الرتبة الي تعطي الرواتب   

    let role = snow.mentions.roles.first()

    if(!role) return snow.channel.send({content: `**__${snow0} -عـزيـزي المـوظـف يـرجـى تـحـديـد الـرتـبـة المـصـروف لـهـا الـراتـب ${snow97} .
- وشـكـرآ__**`})

    let amount = snow.content.split(' ')[2]

    if(!amount) return snow.channel.send({content: `**__  – عـزيـزي المـوظـف يـرجـى تـحـديـد المـبـلـغ المـرغـوب صـرفـة ${snow97} 
- وشـكـرآ__**`})

    if(isNaN(amount)) return snow.channel.send({content: `**__${snow0}  – عـزيـزي المـوظـف يـرجـى الـتـأكـد مـن صـحـة الـصـرف ${snow97} .
- وشـكـرآ __**`})

    snow.guild.members.cache.forEach(async member => {

     if(member.roles.cache.some(r => r.id === role.id)){

       db.add(`money_${member.id}`,amount)
     }
      
    })

    let embed = new Discord.MessageEmbed()

    .setTitle(`**${snow.guild.name}**`)
    .setColor("#ffff00")
    .setDescription(`**__ – عـزيـزي الـعـضـو ${snow0} .

- تـم صـرف راتـب هـذا الـشـهـر ل رتـبـة ( ${role} ) وقـدرة ( ${amount} ) مـع تـمـنـيـاتـنـا لـك بـالـتـوفـيـق .

( وزارة المالية )__**`)
      .setImage(config.line)

    snow.channel.send({embeds: [embed]})
    
  }
  
})


client.on('messageCreate',async snow => {
  if(snow.content.startsWith(prefix + "تصفير-الكل")){

    if(!snow.member.roles.cache.some(r => r.id === config.staff2)) return;
//الرتبة الي تصفر البنك
   snow.guild.members.cache.forEach(async member => {
     db.delete(`money_${member.id}`)
     db.delete(`mone_${member.id}`)
   })
    let embed = new Discord.MessageEmbed()

    .setTitle(`**${snow.guild.name}**`)
    .setColor("#ffff00")
    .setDescription(`**__ – عـزيـزي المـسـؤول .

${snow} - تـم تـصـفـيـر جـمـيـع الأمـوال مـن بـنـك ${snow.guild.name} بـالـكـامـل ${snow97} .

- مـع تـمـنـيـاتـنـا لـك بـالـتـوفـيـق -__**`)
      .setImage(config.line)

    snow.channel.send({embeds: [embed]})
  }
})

client.on('messageCreate',async snow => {
  if(snow.channel.id !== config.channel) return;
//شات الإعلانات
  if(snow.author.bot) return;

  db.subtract(`money_${snow.author.id}`,400)
let embed = new Discord.MessageEmbed()

    .setTitle(`**${snow.guild.name}**`)
    .setColor("#ffff00")
    .setDescription(`**__ ${righa} - مـصـرف الـراجـحـي .

 ${snowsh}  - عـزيـزي الـعـضـو .

${righa} – تـم سـحـب مـبـلـغ ( 400 ) مـن حـسـابـك الـبـنـكـي رسـوم الإعـلان فـي جـريـدة الـدولـة مـع تـمـنـيـاتـنـا لـك بـالـتـوفـيـق ${snowgg} .

${snowbnk} - وزارة المـالـيـة .__**`)

    snow.author.send({embeds: [embed]})
  
})


client.on('messageCreate', async snow => {


  if(snow.content.startsWith(prefix + "رحله")){

if(!snow.member.roles.cache.some(r => r.id === config.staff3)) return;
//الرتبة حقت الرحلات
  if(snow.channel.id !== config.channel2) return;
//شات الرحلات
    let user = snow.mentions.users.first()

    if(!user) return snow.channel.send({content: `**__ ${snow} - عـزيـزي الإداري يـرجـى الـتـأكـد مـن الـفـحـص بـالـشـكـل الـصـحـيـح __**`})

    db.subtract(`money_${user.id}`,500)
    
 return snow.channel.send({content: `**__ ${snow} - تم فحص العضو ينجاح ${snow97} .__**`})
    
    let u = snow.guild.members.cache.get(user.id)

    let embed = new Discord.MessageEmbed()

    .setTitle(`**${snow.guild.name}**`)
    .setColor("#ffff00")
    .setDescription(`**__${righa} - مـصـرف الـراجـحـي .

${snowsh} - عـزيـزي الـعـضـو .

${righa} – تـم سـحـب ( 500 ) رسـوم ركـوب الـطـائـرة فـي مـطـار ${snow.guild.name} مـع تـمـنـيـاتـنـا لـك بـرحـلـة ممـتـعـة .

${snowbnk} - وزارة المـالـيـة .__**`)

    u.send({embeds: [embed]})
  }
})



client.on("messageCreate", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
      let args = message.content.split("")
    let user = message.mentions.users.first() || message.author;

  if (message.content.startsWith(prefix + `فلوس`)) {
    let money = await db.get(`money_${user.id}`)
        let mone = await db.get(`mone_${user.id}`)
if(!money){
  money = 0;
}
    if(!mone){
  mone = 0;
}
           let embed = new Discord.MessageEmbed()
.setColor('#BFA13B')
.setDescription(`**__ ${righa} – أهـلآ بـك فـي مـصـرف الـراجـحـي .

 ${snowsh} - عـزيـزي المـواطـن رصـيـدك الـحـالـي .


${flwss} - الــكــاش : ( ${mone} ) .


${bnksh} - الـبـنـك : ( ${money} ) .


${snow24} - إجـمـالـي الـرصـيـد : ( ${mone + money} ) .

${snowbnk} - وزارة المـالـيـة .__**`)
                 .setThumbnail('https://media.discordapp.net/attachments/1083801424732880966/1115257684220977213/emoji_215.png')

      .setImage(config.line)
    
      message.channel.send({embeds: [embed]})
    
  }
});


client.on("messageCreate", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
      let args = message.content.split("")
    let user = message.mentions.users.first() 

if (command == prefix + `تصفير`) {
if(!user) return message.reply(`**__ ${snowbnk} – عـزيـزي المـوظـف 
${righa} - يـرجـى تـحـديـد الـعـضـو المـرغـوب فـي تـصـفـيـر حـسـابـة الـبـنـكـي .__**`)
if(!message.member.roles.cache.has('1097587324612776096')) //الرتبة الي تقدر تصفر الاعضاء     
return;
      message.reply(`**__ ${snowbnk} – عـزيـزي المـوظـف .
${righa} - تـم تـصـفـيـر حـسـاب الـعـضـو الـبـنـكـي بـنـجـاح .__**`)
   await db.set(`money_${user.id}`, 0)
    
  }
});

client.on("messageCreate", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
      let args = message.content.split(" ")

    let user = message.mentions.users.first()
  if (command == prefix + `تحويل`) {
if(!user) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snower} - يـرجـى تـحـديـد الـشـخـص المـرغـوب فـي الـتـحـويـل لـة .__**`)
    if(user.id == message.author.id) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snowsh} - يـرجـى الـتـأكـد مـن صـحـة الـعـمـلـيـة .__**`)

    let money = await db.get(`money_${message.author.id}`)
    if(money < args[2]) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو  
${snower} - نـعـتـذر عـن إتـمـام الـعـمـلـيـة لـعـدم وجـود الـرصـيـد الـكـافـي .__**`)
        if(user.bot) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snower} - يـرجـى الـتـأكـد مـن صـحـة الـعـمـلـيـة .__**`)
        if(user.bot) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snower} - يـرجـى الـتـأكـد مـن صـحـة الـعـمـلـيـة .__**`)
if(isNaN(args[2])) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snower} - يـرجـى الـتـأكـد مـن صـحـة الـعـمـلـيـة .__**`)
      message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو .

${snow97} - تـم الـتـحـويـل بـنـجـاح .__**`)
   await db.add(`money_${user.id}`, args[2] - 0)
   await db.add(`money_${message.author.id}`, - args[2])
    
  }
});

client.on("messageCreate", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
      let args = message.content.split(" ")
  if (command == prefix + `سحب`) {
    let money = await db.get(`money_${message.author.id}`)
    if(money < args[1]) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snower} - نـعـتـذر عـن إتـمـام الـعـمـلـيـة لـعـدم وجـود الـرصـيـد الـكـافـي .__**`)
if(isNaN(args[1])) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو  
${snower} - يـرجـى الـتـأكـد مـن صـحـة الـعـمـلـيـة .__**`)
      message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو .
${snow97} - تـم الـسـحـب بـنـجـاح .__**`)
   await db.add(`mone_${message.author.id}`, args[1] - 0)
   await db.add(`money_${message.author.id}`, - args[1])
    
  }
});
///////////////
client.on("messageCreate", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
      let args = message.content.split(" ")
  if (command == prefix + `ايداع`) {
    let mone = await db.get(`mone_${message.author.id}`)
    if(mone < args[1]) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو  
${snower} - نـعـتـذر عـن إتـمـام الـعـمـلـيـة لـعـدم وجـود الـرصـيـد الـكـافـي .__**`)
if(isNaN(args[1])) return message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو 
${snower} - يـرجـى الـتـأكـد مـن صـحـة الـعـمـلـيـة .__**`)
      message.reply(`**__ ${snowsh} – عـزيـزي الـعـضـو .

${snowsh} - تـم الأيـداع بـنـجـاح .__**`)
   await db.add(`money_${message.author.id}`, args[1] - 0)
   await db.add(`mone_${message.author.id}`, - args[1])
    
  }
});



///////

client.on("messageCreate", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let args = message.content.split(" ");
  let user = message.mentions.users.first();
  
  if (command == prefix + `تفعيل`) {
    if(!message.member.roles.cache.has('761196993661632599')) //الرتبة الي تقدر تصفر الاعضاء     
      return;
    if (!user) return message.reply('**__<a:emoji_5:1107665982387920906> -تحتاج إلى ذكر مستخدم لتفعيل حسابه .__**');
    message.channel.send({content: `**__ ${snow0} - تم تفعيل حساب العضو بنجاح ${snow97} .__**`});
    await db.add(`money_${user.id}`, 5000);
  }
});

client.login(process.env.token);