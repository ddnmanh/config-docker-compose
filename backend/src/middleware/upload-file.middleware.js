
import multer from 'multer';
import path from 'path';
import fs from 'fs'; 
import CryptoJS from 'crypto-js';

export default class UploadFile {
    constructor(name_file_in_form_data = 'lisicify_file', num_file = 1, path_save = ['uploads/undified_request']) {
        
        this.fileIndex = 0; 
        
        this.diskStorageAvatar = multer.diskStorage({
            destination: (req, file, callback) => { 
                
                const path_for_this_file = path_save[this.fileIndex] ? path_save[this.fileIndex] : path_save[0];
                this.fileIndex++;

                const url = path.join(process.cwd(), `${process.env.EXPRESS_PATH_STATIC}/${path_for_this_file}`);
                
                fs.mkdirSync(url, { recursive: true }); 

                req.path_folder_saved = req.path_folder_saved ? [...req.path_folder_saved, `/${path_for_this_file}`] : [`/${path_for_this_file}`];
                
                callback(null, url);   
            },

            filename: (req, file, callback) => { 
                // Make another with file in here  
                
                let match = ["image/png", "image/jpeg", "audio/mpeg"]; // .png, .jpeg, .mp3
            
                if (match.indexOf(file.mimetype) === -1) {
                    return callback(`The file upload is invalid. Only allowed to upload image jpeg or png!`, null);
                } else {
                    let name_file_encypt = CryptoJS.SHA256(file.originalname).toString(); // encrypt filename without extension filename
            
                    let extend_file = file.originalname.split('.')[file.originalname.split('.').length-1]; // get extend name of file upload
            
                    let file_name_modified = `${Date.now()}-my-app-name-${name_file_encypt}.${extend_file}`;
                
                    req.filename_saved = req.filename_saved ? [...req.filename_saved, file_name_modified] : [file_name_modified];
            
                    return callback(null, file_name_modified);
                }
            } 
        });

        this.saveFile = multer({storage: this.diskStorageAvatar}).array(name_file_in_form_data, num_file); // image is filename from client
    } 

    async upload(req, res) {
        return new Promise((resolve, reject) => {
            this.saveFile(req, res, (error) => {  
                if (error) reject({path_file_saved: null, form_data: req.body}); 

                resolve({
                    path_file_saved: req.path_folder_saved.map((folder_path, index) => {
                        return folder_path +'/'+ req.filename_saved[index];
                    }), 
                    form_data: req.body
                });
            });
        });
    }
}