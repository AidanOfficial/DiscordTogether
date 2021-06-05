//here the event starts
module.exports = client => {
    console.log(`You have been disconnected at ${new Date()}.`.red);
    client.channels.cache.get('850513779409551406').send(`<:Wifi_Offline:790986736045916192> **| <@850495735065739295> is <:Wifi_Offline:790986736045916192>. View the console for more information.`);
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
