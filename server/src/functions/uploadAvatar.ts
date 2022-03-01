
import { FileUpload, GraphQLUpload } from "graphql-upload";
import fs from 'fs'
import { createWriteStream } from "fs";


export async function getFileExtension(file:FileUpload){
    return (await file).filename.split('.').pop();
}

export async function uploadAvatar(path:string,file:FileUpload){
    const fileData = await file;
    const relativePath = "./" + path;

    await new Promise<void>((resolve, reject) => {
        fileData
            .createReadStream()
            .pipe(createWriteStream(relativePath))
            .on("finish", () => resolve())
            .on("error", () => reject());
    });

    return path;
}

export async function unlinkAvatar(userAvatarPath: string){
    const relativeAvatarPath = "./"+userAvatarPath;
    await new Promise((resolve, reject) =>{
        fs.unlink(relativeAvatarPath,(err)=>{
            if(err) reject(err);
            resolve(true);
        });
    })
}


