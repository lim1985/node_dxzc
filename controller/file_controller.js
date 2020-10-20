const initfile = require("../initword/index");

const Readfiles = require("../Readfiles/index");




class initfileController {
  static async downloadfile(ctx)
  {
    let data=ctx.request.query;;
    // console.log(imgpath)
    // /UploadFiles/2020/7/20207169448.jpg
  //  console.log(data.imgpath)
  let result=new Promise(async resolve=>{
   await Readfiles.downloadFile(data.imgpath,(res,err)=>{
  
      console.log(`-------------`)
      console.log(res.split('.')[1])     
      resolve({status:err,imgurl:res.split('.')[1]+'.'+res.split('.')[2]}) 
   })
  })
 
  
    ctx.body={
     res: await result
     
    }

  }
  static async createWord(ctx)
  {
    const data=ctx.request.body;
      console.log(data)

      let result=await initfile.newcreateDocx(data.id,data.plist)
      ctx.body={
        status:200,
        id:result
      }
    // console.log(imgpath)
    // /UploadFiles/2020/7/20207169448.jpg
  //  console.log(data.imgpath)
  //  let result=new Promise(async resolve=>{
  //  await initfile.newcreateDocx(data.imgpath,(res,err)=>{
  
  //     console.log(`-------------`)
  //     console.log(res.split('.')[1])
     
  //     resolve({status:err,imgurl:res.split('.')[1]+'.'+res.split('.')[2]}) 
  //  })
  
  //  })
  
  
  // //  await initfile.createDocx(res)
  //   ctx.body={
  //    res:await result
     
  //   }


  }
}

module.exports = initfileController;
