const fs = require("fs");
// const gm = require('gm');
const XLSX = require("xlsx");
const path = require("path");
const nodemailer = require("nodemailer");
const ApprovalFormModel = require("../ApprovalForm/index");
const images = require("images");
const request = require('request');
var moment = require("moment");
const { resolve } = require("path");
class Readfiles {
  static async GoMail(ctx) {
    // console.log(ctx.request.query);
    let emailBody = ctx.request.query;
    let title = emailBody.title;
    let email = emailBody.邮箱;
    let totalmoney = await Readfiles.returnFloat(emailBody.实发金额);

    console.log(totalmoney);
    console.log(emailBody);
    return new Promise(resolve => {
      var smtpConfig = {
        host: "smtp.qq.com",
        port: 587,
        secure: false, // use SSL
        auth: {
          user: "80168611@qq.com", //邮箱账号
          pass: "sanhbffnprwbbgcc" //邮箱密码
        }
      };
      // // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport(smtpConfig);
      //邮箱内容体
      let emailhtml = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                </head>
                <body>
                        <table  border="1">
                            <tr>                   
                          
                                <th>序号</th>
                                <th>姓名</th>
                                <th>职务工资(岗位工资)</th>
                                <th>级别工资(技术等级工资)</th>
                                <th>月基本工资合计</th>
                                <th>津补贴</th>
                                <th>车补</th>
                                <th>工资调整</th>
                                <th>文明单位奖金</th>
                                <th>综治奖金</th>
                                <th>绩效奖金</th>
                                <th>第十三月工资</th>
                                <th>应发金额</th>
                                <th>住房公积金缴费额</th>
                                <th>养老保险缴费额</th>
                                <th>职业年金缴费额</th>
                                <th>医疗保险缴费额</th>
                                <th>医疗补贴</th>
                                <th>扣缴费小计</th>
                                <th>实发金额</th>
                                </tr>
                                <tr>
                                    <td>
                                    ${emailBody["序号"]}
                                    </td>
                                    <td>
                                    ${emailBody.姓名}
                                    </td>
                                    <td>
                                    ${emailBody["职务工资(岗位工资)"]}
                                                                                     
                                    </td>
                                    <td>
                                    ${emailBody["级别工资(技术等级工资)"]}
                                    </td>
                                    <td>                                    
                                    ${emailBody.月基本工资合计}
                                    </td>
                                    <td>
                                    ${emailBody.津补贴}
                                    </td>
                                    <td>
                                    ${emailBody.车补}
                                    </td>
                                    <td>
                                    ${emailBody.工资调整}
                                    </td>
                                    <td>
                                    ${emailBody.文明单位奖金}
                                    </td>
                                    <td>
                                    ${emailBody.综治奖金}
                                    </td>
                                    <td>
                                    ${emailBody.绩效奖金}
                                    </td>
                                    <td>
                                    ${emailBody.第十三月工资}
                                    </td>
                                    <td>
                                    ${emailBody.应发金额}
                                    </td>
                                    <td>
                                    ${emailBody.住房公积金缴费额}
                                    </td>
                                    <td>
                                    ${emailBody.养老保险缴费额}
                                    </td>
                                    <td>
                                    ${emailBody.职业年金缴费额}
                                    </td>
                                    <td>
                                    ${emailBody.医疗保险缴费额}
                                    </td>
                                    <td>
                                    ${emailBody.医疗补贴}
                                    </td>
                                    <td>
                                    ${emailBody.扣缴费小计}
                                    </td>
                                    <td>
                                    ${totalmoney}
                                    </td>
                                </tr>
                        </table>
                </body>
                </html>
                `;
      //  console.log(emailhtml)
      var mailOptions = {
        from: "<80168611@qq.com>", // sender address
        to: email, //email, // list of receivers
        subject: title, // Subject line
        //text: 'Hello world ?', // plaintext body
        html: emailhtml // html body
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }
        resolve(info.response);
        console.log(info);
        console.log("Message sent: " + info.response);
        console.log("Finish send mail:" + Date.now());
        console.log(Date.now() - start);
      });
      transporter.close();
    });
  }
  static async returnFloat(value) {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (xsd.length > 1) {
      if (xsd[1].length < 2) {
        value = value.toString() + "0";
      }
      return value;
    }
  }

  static async t(ctx) {
    return new Promise(resolve => {
      let s = ctx;
      resolve(s);
      console.log(ctx);
    });
  }
  static async A(ctx) {
    return new Promise(resolve => {
      let s = ctx;
      resolve(s);
      console.log(ctx);
    });
  }

  static async readxlsx(filename) {
    return new Promise(resove => {
      setTimeout(() => {
        let FSstreme = fs.readFileSync(__dirname + "\\files\\" + filename);
        //  console.log(__dirname+"\\files\\"+filename)

        var wb = XLSX.read(FSstreme, { type: "buffer" });
        resove(wb);
      }, 1000);
    });
  }
  static getStat(path) {
    return new Promise((resolve, reject) => {
   
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false);
        } else {
          resolve(stats);
        }
      });
    });
  }
  static initfilesdir() {
    var myDate = new Date();
    var myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    var mydate = myDate.getDate();

    return "./uploadfiles/" + myYear + "/" + myMonth + "/" + mydate + "";
  }
  // static async formatImages(images,file,filePath,newfilePath)
  // {
  //     if((file.size/1024)>1024)
  //     {
  //        setTimeout(() => {
  //         images(filePath)
  //           .size(1024)
  //           .save(newfilePath)
  //        }, 100);
  //        content=`<p>${intors}</p><p style="text-align: center;"><img src="${localhost}${newfilePath}" width="680"/></p><p>${imgtext}</p>`
  //     }
  // }
  static singlefileUpload(ctx) {
    return new Promise(async (resolve, reject) => {
      let file = ctx.request.files.file;
      let _filetext = ctx.request.body.filetext;
      let _filewords = ctx.request.body.filewords;
      let fileExt = ctx.request.body.fileExt;
      let _filename = ctx.request.body.fileName;
      let _size = file.size / 1024;
      // files.append("file", file);
      // files.append("filetext", fileText);
      // files.append("filewords", filewords);
      // files.append("fileExt", fileExt);
      let _extension = fileExt  
      let _localhost = "https://wx.daxiang.gov.cn/";
      let dirname = Readfiles.initfilesdir();
      let _dirstatus = await Readfiles.getStat(dirname);
      console.log(_dirstatus)
      if (!_dirstatus) {
        //判断是否有目录

        fs.mkdir(dirname, { recursive: true }, err => {
          if (err) throw err;
        });
      }
      let targetfilePath="";
      let _content = "";
      let _fileType = file.type.split("/")[0];     
      let _filePath=""
      console.log(file)
        
          if(file)
          {
            console.log(_fileType)
              if(_fileType!=='application')
              {
                   _filename =_filename+'.'+fileExt
                  let _newfilename =_filename + "_lim" + "." +fileExt
               
                  const reader = fs.createReadStream(file.path);
                 _filePath = path.join(dirname) + `\\${_filename}`;
                  let _newfilePath = path.join(dirname) + `\\${_newfilename}`;              
                  const upStream = fs.createWriteStream(_filePath);
                  await reader.pipe(upStream);
                  // await ApprovalFormModel.addFiles({real_file:_newfilePath,localhost:localhost,caption:imgtext,size:files.size / 1024,path:dirname,name:_filename,GeneralID:GeneralID,extension:files.type.split('\/')[1]})
                  targetfilePath = _filePath;
                  if (file.size / 1024 >= 1024) {
                    setTimeout(async () => {
                      await images(_filePath)
                        .size(1024)
                        .save(_newfilePath);
                    }, 1000);
                    targetfilePath = _newfilePath;                 
                  }
                  _content = `<p style="text-align: center;"><img src="${_localhost}${targetfilePath}" width="680"/></p><p style="text-align: center;">${_filetext}</p>`;
                }
                else
                {
                  console.log(`到这里了`)
                   _filename =_filename+'.'+fileExt
                  const reader = fs.createReadStream(file.path);
                   _filePath = path.join(dirname) + `\\${_filename}`;
                  const upStream = fs.createWriteStream(_filePath);
                  await reader.pipe(upStream);
                  targetfilePath = _filePath;
                  _content = `<p align="center"><a href="${_localhost}${targetfilePath}">${file.name.split('.')[0]}</a></p>
                  <p style="text-align: center;">${_filetext}</p>`;
                }
                
                  let _file = {
                    fileType:_fileType,
                    realfile_Name:file.name.split('.')[0],
                    localhost: _localhost,                  
                    filetext:_filetext,
                    filewords:_filewords,
                    extension: _extension,
                    name: _filename,
                    real_file: targetfilePath,
                    filepath: _filePath,
                    size: _size,
                    path: dirname,
                    content: _content,
                    caption: _filetext
                  };
                  resolve({ isok: true, _file });
                
              }  
    });
  }
  static getRandomNum() {
    let Min = 10000000000;
    let Max = 99999999999;
    let sayle=  Readfiles.Getfilesname()
    let Range =sayle * Max - Min ;
    let Rand = Math.random();
    return Min + Math.round(Rand * Range);
  }
  static Getfilesname() {
    var myDate = new Date();
    var myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    var mydate = myDate.getDate();
    var myHour = myDate.getHours();
    var myMinute = myDate.getMinutes();
    var mySecond = myDate.getSeconds();
    var mytMilliSecond = myDate.getMilliseconds();
    return (    
      myYear +
      myMonth +
      mydate +
      myHour +
      myMinute +
      mySecond +
      mytMilliSecond *1
    );
  }
  static async initimages(imgpath,newimgpath)
  {
    return new Promise(async(resolve)=>{
      let _ss=await images(imgpath)
        .size(1024)
        .save(newimgpath)
        resolve(_ss)
    })
      //   let _ss=await images(imgpath)
      //   .size(1024)
      //   .save(newimgpath)
      // return _ss
  }
  static async  createFileisok(upStream,reader){
    return new Promise(async(resolve,reject)=>{
      let res=  await reader.pipe(upStream)
      resolve(res)
      })     
  }
   static async downloadFile(imgPath,callback)
   {
     console.log(imgPath)
    // let imgpath='http://info.dxzc.gov.cn/UploadFiles/2020/7/2020715222520.png'
    let fileName = path.basename(imgPath);

     console.log(fileName)
    let dirname= Readfiles.initfilesdir()+'/'
    let fileDownloadPath =  Readfiles.initfilesdir()+'/'+fileName;

     console.log(fileDownloadPath);
    let exist = fs.existsSync(fileDownloadPath);
    let _ismkdir=false
    if(!exist)
    {
        // 创建目录
        _ismkdir=new Promise((resolve,reject)=>{
          fs.mkdir(dirname, { recursive: true }, async err =>{
                if (err)
                {
                  reject(err)
                  throw err;                      
                }
                else
                {
                  resolve(true)
                }
            })
        })   

        if(await _ismkdir)
        {
          setTimeout(() => {
            let writeStream = fs.createWriteStream(fileDownloadPath);
            let readStream = request(imgPath);
           

            readStream.pipe(writeStream);
            readStream.on('end', function ()
             {
              readStream.end();
              callback(fileDownloadPath, 'success');
              // console.log(`文件下载成功${fileDownloadPath}`);
             });
          
            readStream.on('error', function (error) {
              writeStream.end();
              fs.unlinkSync(fileDownloadPath);
              // console.log(`错误信息:${error}`);
              // 下载失败的，重新下载TODO
              readStream.end();
              callback(null, 'fail');
              // setTimeout(() => {
              //   bagpipe.push(downloadFile, imgPath, function (err,data) {
              //   });
              // }, 5000);
            })
            writeStream.on("finish", function () {
              readStream.end();
              writeStream.end();
            })
            .on('error',function(err){
              readStream.end();
              writeStream.end();
              // console.log(`文件写入失败}`);
            });
          }, 800);
          
        }
        else
          {
            console.log('this file is existed');
          }
        }
        else
        {
         // let filesurl=imgPath.match(/[\d\/]+/)
         callback(fileDownloadPath, 'success');
        }

	
	}
        
 
  static singleImageUpload(ctx)
  {
    return new Promise(async (resolve, reject) => {
  
      let files = ctx.request.files.file;   
      let fileName=''     
      let _size = files.size / 1024;
      let _GeneralID = ctx.request.body.GeneralID;    
      let _extension = files.type.split("/")[1]; 
      let imgtext = ctx.request.body.imgtext;    
       //  let _localhost = "http://172.20.8.28:3002/";
      let _localhost = "https://wx.daxiang.gov.cn/";
      let dirname = Readfiles.initfilesdir();

      let _content = "";
     // let fileType = files.type.split("/")[0];
      fileName=files.name==='blob'?Readfiles.getRandomNum():files.name
    //  files.name=='blob'?fileName=Readfiles.getRandomNum():fileName=file.name
       
      if (!files.length)
       {
        let _filename =
          files.type.split("/")[1] == "jpeg"
            ? fileName + "." + "jpg"
            : fileName + "." + "png";
        let _newfilename =
          files.type.split("/")[1] == "jpeg"
            ? fileName + "_lim" + "." + "jpg"
            : fileName + "_lim" + "." + "png";
        const reader = fs.createReadStream(files.path,{start:0});
    
        let _dirstatus = await Readfiles.getStat(dirname);
        let _filePath = path.join(dirname) + `\\${_filename}`;
        let _newfilePath = path.join(dirname) + `\\${_newfilename}`;
        let _ismkdir=false
   
        if (!_dirstatus) 
        {
          _ismkdir=new Promise((resolve,reject)=>{
            fs.mkdir(dirname, { recursive: true }, async err =>{
                  if (err)
                  {
                    throw err;                      
                  }
                  else
                  {
                    resolve(true)
                  }
              })
          })           
        }
        else
        {
          _ismkdir=true
        }        
         // console.log(await _ismkdir);
          if(await _ismkdir)
          {
              const upStream = fs.createWriteStream(_filePath);   
              let [_fileerr,_filedata]=  await Readfiles.createFileisok(upStream,reader).then(data=>[null, data]).catch(err=> [err, null])
            
              let targetfilePath
              if(_filedata)
              {
                targetfilePath=_filePath
                console.log(`有文件`)
                console.log(files.size / 1024 >= 1024)
                if (files.size / 1024 >= 1024) 
                {              
                    setTimeout(async () => {
                      await images(_filePath)
                        .size(1024)
                        .save(_newfilePath);
                    }, 1000);
                    targetfilePath = _newfilePath;
                  
          // defaultPic=`${localhost}${_newfilePath}`
                }
                console.log(targetfilePath)
               _content = `<p style="text-align: center;"><img src="${_localhost}${targetfilePath}" width="680"/></p><p>${imgtext}</p>`;
              let imgs = {
                localhost: _localhost,
                GeneralID: _GeneralID,
                extension: _extension,
                name: _filename,
                real_file: targetfilePath,
                _filePath,
                size: _size,
                path: dirname,
                content: _content,
                caption: imgtext
             };
              resolve({ isok: true, imgs });
         }
              else
              {
                reject({isok:false})
                console.log(`有错误文件`)
              }
         }           
    }
  })
}
          //判断是否有目录
        //   let ismkdir= new Promise((resolve)=>{
        //   fs.mkdir(dirname, { recursive: true }, async err =>{
        //     if (err)
        //     {
        //       throw err;                      
        //     }
        //     else
        //     {
        //       console.log('ok!');
        //       console.log(_filePath)
        //       resolve(true)
        //       // const upStream = fs.createWriteStream(_filePath);      
        //       // let [_filedata,_fileerr]=  await Readfiles.createFileisok(upStream,reader).then(data=>[null, data]).catch(err=> [err, null])
        //       // console.log(_filedata)
        //       // console.log(_fileerr)
        //       // let createFileisok=()=>{
        //       //   return new Promise(async(resolve,reject)=>{
        //       //   let res=  await reader.pipe(upStream)
        //       //   resolve(res)
        //       //   })                
        //       // }            
        //     }      
        //   });
        // }) 
        //    let ismkdir=()=>{
        //      return new Promise(resolve=>{
        //          fs.mkdir(dirname, { recursive: true }, async err =>{
        //         if (err)
        //         {
        //           throw err;                      
        //         }
        //         else
        //         {
        //           resolve(true)
        //         }
        //      })
        //    })            
        // }
        // console.log(await ismkdir())
        // else
        // {       
          // const upStream = fs.createWriteStream(_filePath);
          // let [_data,_err]=  await Readfiles.createFileisok(upStream,reader).then(data=>[null, data]).catch(err=> [err, null])
          //    console.log(_data)
          //    console.log(_err)
         // createFileisok= await reader.pipe(upStream);         
        //  let createFileisok=()=>{
        //   return new Promise(async(resolve,reject)=>{
        //   let res=  await reader.pipe(upStream) 
        //   resolve(res)
        //   })                
        // } 
       
        // }
        // await ApprovalFormModel.addFiles({real_file:_newfilePath,localhost:localhost,caption:imgtext,size:files.size / 1024,path:dirname,name:_filename,GeneralID:GeneralID,extension:files.type.split('\/')[1]})
       // console.log(createFileisok.path)
      //  console.log(createFileisok)
    
      // let [filedata,fileErr]=await createFileisok().then(data=> [data,null]).catch(err=>[null,err])
      // console.log(filedata)
      // console.log(fileErr)
        // if(!filedata)
        // {       
        // console.log(`失败了`)
        // }
        // else
        // {
        //   console.log(`成功了`)
        //   let targetfilePath = _filePath;
        //   let imagesisok='还没开始'
        // if (files.size / 1024 >= 1024) 
        // {
      
        //  // imagesisok =await Readfiles.initimages(_filePath,_newfilePath);
          
        //   setTimeout(async () => {
        //    imagesisok=  await images(_filePath)
        //       .size(1024)
        //       .save(_newfilePath);
        //   }, 1000);
        //   targetfilePath = _newfilePath;
        //   // defaultPic=`${localhost}${_newfilePath}`
       
        // }
        // console.log(`转换成功了`)
     
        // _content = `<p style="text-align: center;"><img src="${_localhost}${targetfilePath}" width="680"/></p><p>${imgtext}</p>`;
        // let imgs = {
        //   localhost: _localhost,
        //   GeneralID: _GeneralID,
        //   extension: _extension,
        //   name: _filename,
        //   real_file: targetfilePath,
        //   _filePath,
        //   size: _size,
        //   path: dirname,
        //   content: _content,
        //   caption: imgtext
        // };
        // resolve({ isok: true, imgs });
        // }
        
     
 
  static async newUploads(ctx) {
    return new Promise(async (resolve, reject) => {
      let files = ctx.request.files.file;
      let intors = ctx.request.body.intors;
      let title = ctx.request.body.title;
      let imgtext = ctx.request.body.imgtext;
      let GeneralID = ctx.request.body.GeneralID;
      let UserName = ctx.request.body.UserName;
      let NodeID = ctx.request.body.NodeID;
      let InputTime = moment().format("YYYY-MM-DD HH:mm:ss");
      let dirname = Readfiles.initfilesdir();
      let defaultPic = "";
      let content = "";
      let localhost = "https://wx.daxiang.gov.cn/";
      if (!files.length) {
        // console.log(files[i])
        let _filename =
          files.type.split("/")[1] == "jpeg"
            ? files.name + "." + "jpg"
            : files.name + "." + "png";
        let _newfilename =
          files.type.split("/")[1] == "jpeg"
            ? files.name + "_lim" + "." + "jpg"
            : files.name + "_lim" + "." + "png";
        const reader = fs.createReadStream(files.path);
        let _dirstatus = await Readfiles.getStat(dirname);
        let _filePath = path.join(dirname) + `\\${_filename}`;
        let _newfilePath = path.join(dirname) + `\\${_newfilename}`;
        if (!_dirstatus) {
          //判断是否有目录
          fs.mkdir(dirname, { recursive: true }, err => {
            if (err) throw err;
          });
        }
        const upStream = fs.createWriteStream(_filePath);
        await reader.pipe(upStream);
        await ApprovalFormModel.addFiles({
          real_file: _newfilePath,
          localhost: localhost,
          caption: imgtext,
          size: files.size / 1024,
          path: dirname,
          name: _filename,
          GeneralID: GeneralID,
          extension: files.type.split("/")[1]
        });
        let targetfilePath = _filePath;
        if (files.size / 1024 > 1024) {
          setTimeout(async () => {
            await images(_filePath)
              .size(1024)
              .save(_newfilePath);
          }, 200);
          targetfilePath = _newfilePath;
          // defaultPic=`${localhost}${_newfilePath}`
          // content=`<p>${intors}</p><p style="text-align: center;"><img src="${localhost}${_newfilePath}" width="680"/></p><p>${imgtext}</p>`
        }
        defaultPic = `${localhost}${targetfilePath}`;
        content = `<p style="text-align: center;"><img src="${localhost}${targetfilePath}" width="680"/></p><p>${imgtext}</p>`;
        resolve({ isok: true, content });
      }
    });
  }

  static async uploads(ctx) {
    return new Promise(async (resolve, reject) => {
      let files = ctx.request.files.file;
      let intors = ctx.request.body.intors;
      let title = ctx.request.body.title;
      let imgtext = ctx.request.body.imgtext;
      let GeneralID = ctx.request.body.GeneralID;
      let UserName = ctx.request.body.UserName;
      let NodeID = ctx.request.body.NodeID;
      let InputTime = moment().format("YYYY-MM-DD HH:mm:ss");
      let dirname = Readfiles.initfilesdir();
      let defaultPic = "";
      let content = `<p>${intors}</p>`;
      let localhost = "https://wx.daxiang.gov.cn/";

      if (!files.length) {
        // console.log(files[i])
        let _filename =
          files.type.split("/")[1] == "jpeg"
            ? files.name + "." + "jpg"
            : files.name + "." + "png";
        let _newfilename =
          files.type.split("/")[1] == "jpeg"
            ? files.name + "_lim" + "." + "jpg"
            : files.name + "_lim" + "." + "png";
        const reader = fs.createReadStream(files.path);
        let _dirstatus = await Readfiles.getStat(dirname);
        let _filePath = path.join(dirname) + `\\${_filename}`;
        let _newfilePath = path.join(dirname) + `\\${_newfilename}`;
        if (!_dirstatus) {
          //判断是否有目录
          fs.mkdir(dirname, { recursive: true }, err => {
            if (err) throw err;
          });
        }
        const upStream = fs.createWriteStream(_filePath);
        await reader.pipe(upStream);
        await ApprovalFormModel.addFiles({
          real_file: _newfilePath,
          localhost: localhost,
          caption: imgtext,
          size: files.size / 1024,
          path: dirname,
          name: _filename,
          GeneralID: GeneralID,
          extension: files.type.split("/")[1]
        });

        let targetfilePath = _filePath;
        if (files.size / 1024 > 1024) {
          setTimeout(async () => {
            await images(_filePath)
              .size(1024)
              .save(_newfilePath);
          }, 200);
          targetfilePath = _newfilePath;
          // defaultPic=`${localhost}${_newfilePath}`
          // content=`<p>${intors}</p><p style="text-align: center;"><img src="${localhost}${_newfilePath}" width="680"/></p><p>${imgtext}</p>`
        }
        defaultPic = `${localhost}${targetfilePath}`;
        content += `<p style="text-align: center;"><img src="${localhost}${targetfilePath}" width="680"/></p><p>${imgtext}</p>`;
      } else {
        for (let i = 0; i < files.length; i++) {
          let filename =
            files[i].type.split("/")[1] == "jpeg"
              ? files[i].name + "." + "jpg"
              : files[i].name + "." + "png";
          let _newfilename =
            files[i].type.split("/")[1] == "jpeg"
              ? files[i].name + "_lim" + "." + "jpg"
              : files[i].name + "_lim" + "." + "png";
          const reader = fs.createReadStream(files[i].path);
          let dirstatus = await Readfiles.getStat(dirname);
          let filePath = path.join(dirname) + `\\${filename}`;
          let _newfilePath = path.join(dirname) + `\\${_newfilename}`;
          if (!dirstatus) {
            //判断是否有目录
            fs.mkdir(dirname, { recursive: true }, err => {
              if (err) throw err;
            });
          }

          const upStream = fs.createWriteStream(filePath);
          await reader.pipe(upStream);

          await ApprovalFormModel.addFiles({
            real_file: _newfilePath,
            localhost: localhost,
            caption: imgtext.split("@@@")[i],
            size: files[i].size / 1024,
            path: dirname,
            name: filename,
            GeneralID: GeneralID,
            extension: files[i].type.split("/")[1]
          });
          let targetfilePath = filePath;
          if (files[i].size / 1024 > 1024) {
            //图片大于1M 的情况就压缩
            setTimeout(async () => {
              await images(filePath)
                .size(1024)
                .save(_newfilePath);
            }, 300);
            targetfilePath = _newfilePath;
          }
          content += `<p style="text-align: center;"><img style="text-align: center;" src="${localhost}${targetfilePath}" width="680"/></p><p>${
            imgtext.split("@@@")[i]
          }</p>`;
          if (i == 0) {
            defaultPic = `${localhost}${targetfilePath}`; //默认图片
            console.log(`0000000000000`);
            console.log(defaultPic);
          }
        }
      }

      let CommomModel = {
        Hits: 0,
        DayHits: 0,
        WeekHits: 0,
        MonthHits: 0,
        ShowCommentLink: 0,
        TitleHashKey: 4404120156978810509,
        NodeID: NodeID,
        GeneralID: GeneralID,
        ModelID: 1,
        ItemID: GeneralID,
        TableName: "PE_U_Article",
        Title: title,
        Inputer: UserName,
        LinkType: 0,
        UpdateTime: InputTime,
        CreateTime: InputTime,
        Status: 1,
        InputTime: InputTime,
        SGType: 0,
        SGDataId: 0,
        EliteLevel: 0,
        Priority: 0,
        CommentAudited: 0,
        CommentUnAudited: 0,
        SigninType: 0,
        ClientType: 1,
        DefaultPicUrl: defaultPic
      };
      let Article = {
        Content: content,
        ID: GeneralID,
        Intro: intors,
        Keyword: 0,
        OpenType: 0,
        siteUrl: ""
      };
      console.log(`-1-1--1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-`);

      let result = await ApprovalFormModel.CreateArticleAndCommomModel({
        A: Article,
        C: CommomModel
      });
      console.log(result);
      resolve(result);

      //   console.log(result)
    });
  }
  static async uploadfiles(ctx) {
    return new Promise(resove => {
      //  const file = ctx.request.body.files;
      let file = ctx.request.files.file;
      let filename = ctx.request.body.filename;
      //   console.log(file);
      //             console.log(filename);
      //    console.log(file.path)
      const reader = fs.createReadStream(file.path);
      // console.log(reader)
      let filePath = path.join(__dirname, "\\files") + `\\${filename}`;
      //    console.log(filePath)
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      let data = {
        isupload: true,
        filename: filename
      };
      resove(data);
    });
  }
  // let table=await Readfiles.readxlsx(filename)
  // console.log(table)
  // let tables=await  Readfiles.readxlsx(filename)
  // console.log(tables)
  // return ctx.body={
  //     code:1,
  //     message:'成功了',
  //     name:filename
  // }

  //     return ctx.body = {
  //         tables
  //     }
  // console.log(files)
  // console.log(files.File.path)
  // 创建可读流
  // const reader = fs.createReadStream(files.File.path);
  // let filePath = path.join(__dirname, '/files') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);
  // return ctx.body = "上传成功！";

  // // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // resove(file)
}
module.exports = Readfiles;
