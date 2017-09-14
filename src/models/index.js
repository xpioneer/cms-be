import fs from 'fs'
import DB from './db'

let files = fs.readdirSync(__dirname + '/');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

const Obj = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    Obj[name] = require(__dirname + '/' + f).default;
}

Obj["sync"] = () => { DB.sync(); }

// export default Obj
module.exports = Obj;