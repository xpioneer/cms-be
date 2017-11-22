import fs from 'fs'
import db from './db'

let files = fs.readdirSync(__dirname + '/');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

const Obj = {};

for (let f of js_files) {
    let name = f.substring(0, f.length - 3);
    if(name !== 'index' && name !== 'db') {
        Obj[name] = require(__dirname + '/' + f).default;
        console.log(`import model from file ${f}...`);
    }
}

Obj["sync"] = () => { db.sync(); }
Obj["sequelize"] = db.sequelize;

module.exports = Obj;