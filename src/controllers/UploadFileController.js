/*qinfeng*/
import Fs from 'fs';
import Path from 'path';
import TOOLS from '../utils/tools';
import ArticleService from '../services/ArticleService';

const { DateF, Guid } = TOOLS;

const filePath = './' + 'uploads/' + DateF(Date.now()).replace(/-/g, '');

function uploading(file){
    return new Promise((resolve, reject)=>{
        let path = file.path;
        try{
            Fs.readFile(path, function(err, data){
                let name = file.name;
                let type = file.type.split('/').reverse()[0];
                let newName = Guid() + '.' + type;
                let newPath = filePath + '/' + newName;
                let exists = Fs.existsSync(filePath);
                console.log(exists)
                if (!exists) {
                    Fs.mkdir(filePath, err => {
                        console.log(err)
                        if(err){
                            reject(err);
                        } else {
                            Fs.writeFile(newPath, data, e => {
                                if(e){
                                    reject(e);
                                }else{
                                    resolve({path: newPath, name: name, new_name: newName});
                                }
                            });
                        }
                    });
                }else {
                    Fs.writeFile(newPath, data, err => {
                        if(err){
                            reject(err);
                        }else{
                            resolve({path: newPath, name: name, new_name: newName});
                        }
                    });
                }
            });
        }catch(e){
            reject(e);
        }finally{
            Fs.unlinkSync(path);
        }
    });
}

class TestController {

    static async upload (ctx) {
        let files = ctx.request.fields['file'],
            file = files && files[0];
        if(file){
            let result = await uploading(file);
            ctx.Json({data: result});
        }else{
            ctx.Json({data: '请上传文件！'});
        }
    }

}

export default TestController;

