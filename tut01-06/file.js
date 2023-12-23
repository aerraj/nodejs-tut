const fs= require("fs");


//sync
// fs.writeFileSync('./text.txt','Hey There')
// async
// fs.writeFile('./text.txt','Hey maina',err=>{})

// const read=fs.readFileSync('./contact.txt','utf-8')
// console.log(read)

// fs.readFile('./contact.txt','utf-8',(err,result)=>{
//     if(err)
//     console.log("error",err)
//     else
//     console.log(result)
// })
// fs.appendFileSync("./text.txt", `User is ${Date.now()}  `)
console.log(fs.statSync('./text.txt'));

