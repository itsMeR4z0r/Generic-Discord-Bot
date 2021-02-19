const fs = require('fs')


function createFiles(){
    if(!fs.existsSync('.env')){
        let string = 'DISCORD_KEY = xxxx\n'
        string += 'PREFIX = !\n'    
        string += 'BOT_STATUS = Bot Status'    
        fs.writeFileSync('.env', string);
    }    
}

function createFolders(){
    if(!fs.existsSync('./commands')){
        fs.mkdirSync('./commands')
    }
}

function createAll(){
    createFolders()
    createFiles()
}

module.exports = {
    createAll,
    createFiles,
    createFolders
}