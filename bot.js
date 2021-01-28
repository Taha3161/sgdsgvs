const Discord = require("discord.js"); //
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json"); //
const chalk = require("chalk"); //
const moment = require("moment"); //
var Jimp = require("jimp"); //
const { Client, Util } = require("discord.js"); //
const fs = require("fs"); //
const db = require("quick.db"); //
const express = require("express"); //
require("./util/eventLoader.js")(client); //
const path = require("path"); //
const snekfetch = require("snekfetch"); //
//

var prefix = ayarlar.prefix; //
//
const log = message => {
  //
  console.log(`${message}`); //
};

client.commands = new Discord.Collection(); //
client.aliases = new Discord.Collection(); //
fs.readdir("./komutlar/", (err, files) => {
  //
  if (err) console.error(err); //
  log(`${files.length} komut yüklenecek.`); //
  files.forEach(f => {
    //
    let props = require(`./komutlar/${f}`); //
    log(`Yüklenen komut: ${props.help.name}.`); //
    client.commands.set(props.help.name, props); //
    props.conf.aliases.forEach(alias => {
      //
      client.aliases.set(alias, props.help.name); //
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add("801197466623803432"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
  member.setNickname(`♰ İsim | Yaş`);
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "801197552052994058"
  );
  const uregister = `<@${member.id}>`;
  const register = "<@&801197463485677598>";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  var kontrol;
  if (kurulus < 1296000000)
    kontrol =
      "<a:renkler:801362593099808799> Hesap Durumu: Güvenilir Değil <:unlem:801366339306127370>";
  if (kurulus > 1296000000)
    kontrol =
      "<a:renkler:801362593099808799> Hesap Durumu: Güvenilir Gözüküyor <:tik:801366318389526589>";
  moment.locale("tr");
  const strigalog = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
    .setDescription(
      "<a:a_:801362598972227584> **Hoşgeldin! <@" +
        member +
        "> Seninle `" +
        member.guild.memberCount +
        "`Kişiyiz. <a:beyazx:801362593892794389>\n\n<a:hyper:801362590097604648> Müsait olduğunda Confirmation Odalarından Birine Geçip Kaydını Yaptırabilirsin. <a:hyper:801362590097604648> \n\n<a:ekic:801368235604967444> <@&801197463485677598> seninle ilgilenicektir. <a:ekic:801368235604967444> \n\n<a:kitap:801369255840579624> Hesabın Oluşturulma Tarihi: " +
        moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +
        " <a:kitap:801369255840579624> \n\n" +
        kontrol +
        "\n\n<:partner:801369224949268490> Tagımızı alarak ♰ bize destek olabilirsin.** <:partner:801369224949268490>\n"
    ).setImage("https://cdn.discordapp.com/attachments/801197552052994058/803214222355595264/ezgif-2-1cfd7dcbec81.gif");
  kanal.send(strigalog);
  kanal.send(register);
  kanal.send(uregister);
});
//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     STG

//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG

client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(7, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    const kytsz = member.guild.roles.cache.find(
      r => r.id === "801197466623803432"
    );
    var rol = member.guild.roles.cache.get("801370722945073180"); // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
    var kayıtsız = member.guild.roles.cache.get(kytsz); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
    member.roles.add(rol);
    member.roles.remove(kytsz);

    member.user.send(
      "Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır."
    );
    setTimeout(() => {}, 1000);
  } else {
  }
});
//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG

//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("801126842983252029"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = "♰"; // Buraya Ekip Tag
  var ekipRolü = "801197463901437995"; // Buraya Ekip Rolünün ID
  var logKanali = "801197588359282708"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.cache.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`)
        );
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(
        uye.roles.cache.filter(
          rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              `${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`
            )
        );
    } catch (err) {
      console.error(err);
    }
  }
});

//----------------------TAG-KONTROL----------------------\\     STG

client.on("guildMemberAdd", member => {
  let sunucuid = "801126842983252029"; //Buraya sunucunuzun IDsini yazın
  let tag = "♰"; //Buraya tagınızı yazın
  let rol = "801127056842293288"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache
    .get(sunucuid)
    .channels.cache.find(x => x.name == "auto-tag-role"); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (member.user.username.includes(tag)) {
    member.roles.add(rol);
    const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`
      )
      .setTimestamp();
    client.channels.cache.get("801197588359282708").send(tagalma);
  }
});

//-----------------------TAG-KONTROL----------------------\\     STG
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "Tag") {
    msg.reply("Buyur Tagımız Kanka```♰```");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "tag") {
    msg.reply("Buyur Tagımız Kanka```♰```");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "TAG") {
    msg.reply("Buyur Tagımız Kanka```♰```");
  }
});
client.on("ready", () => {
  client.channels.get("801197540745150494").join();
  //main dosyaya atılacak
});
