const ApprovalFormModel = require("../ApprovalForm/index");
const moment = require("moment");
class ApprovalFormController {

 static getGroupWithData(data){
        var index = 0;
        var townstreets = {};
        var communityvillages = {};
        return data.reduce(function(ret, item){
            // 如果乡不存在，则创建乡
            if(!(item.townstreetsName in townstreets)){
                var obj = {
                    id: index++,
                    townstreetsCode: item.townstreetsCode,
                    townstreetsName: item.townstreetsName,
                    villageList: []
                };
                townstreets[item.townstreetsName] = obj;
                ret.push(obj);
            }
            var obj = townstreets[item.townstreetsName];
            // 修正 code 为 null 的情况
            if(item.townstreetsCode){
                obj.townstreetsCode = item.townstreetsCode;
            }
            var vcode = item.communityvillageCode;
            if(vcode){
                // 如果村不存在，则创建村
                if(!(vcode in communityvillages)){
                    communityvillages[vcode] = {
                        communityvillageCode: vcode,
                        communityvillageName: item.communityvillageName,
                        gridList: []
                    };
                    obj.villageList.push(communityvillages[vcode]);
                };
                var gridList = communityvillages[vcode].gridList;
                // 添加网点数据
                if(item.gridCode){
                    gridList.push({
                        gridCode: item.gridCode,
                        gridName: item.gridName,
                        gridAlias: item.Gridalias
                    });
                }
            }
            return ret;
        }, []);
    }   
    static async getAllspecialID(ctx)
    {
      let data=ctx.request.query;
      if (JSON.stringify(data) == "{}") {
        ctx.body = {
          code: -1,
          msg: "参数错误"
        };
      } else if (!data.specialcategoryID) {
        ctx.body = {
          code: -1,
          msg: "参数错误"
        };
      }
       else 
      {
        console.log(data)
        let result=await ApprovalFormModel.getAllspecialID(data.specialcategoryID)
        if(!result)
        {
          ctx.body={
            code:-1,
            msg:'查无记录'
          }
        }
        else
        {
          let arr=[]
          let specialarr=[]
          let specialObj={}
          result.forEach(v => {
            
            specialarr.push(v.SpecialID)
            let obj={}
            obj.specialarr=v.specialarr;
            specialObj.SpecialCategoryName=v.SpecialCategoryName;
            obj.SpecialName=v.SpecialName;
            obj.SpecialID=v.SpecialID;
            obj.Description=v.Description;
            specialObj.SpecialCategoryID=v.SpecialCategoryID;
           
            arr.push(obj)
            
          });
          specialObj.specialIds=specialarr;
          specialObj.list=arr;
          // let obj={
          //   specialid:0,
          //   specialName:'',
          //   Description:''
          // }

          // result.map(item=>{
          //   obj.specialid=item.SpecialID;
          //   obj.SpecialCategoryName=item.SpecialCategoryName;
          //   obj.SpecialName=item.SpecialName;
          //   obj.SpecialCategoryID=item.SpecialCategoryID;
          //   obj.SpecialCategoryName=item.SpecialCategoryName;
          // })
          ctx.body={
            code:1,
            specialObj
          }
        }
      }
    }
  //  console.log(getGroupWithData(data.result.rows));
  static async getcontextListbyspecialID(ctx)
  {
    let data=ctx.request.query;
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else if (!data.specialID) {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    }
     else 
    {
      try {
        let result=await ApprovalFormModel.getcontextListbyspecialID(data.specialID)
        console.log(result)
        if(!result)
        {
          ctx.body={
            code:-1,
            msg:'查无记录'
          }
        }
        else
        {
          let textContent=[]
          let imageContent=[]
          let hotlist=[]
          let index=0
          result.reduce(function(ret,item){
          
            item.InputTime=moment(item.InputTime).format("YYYY-MM-DD HH:mm:ss");
            // console.log(JSON.stringify(item.Keyword).indexOf('热门'))
            // console.log(JSON.stringify(item.Keyword))
            
            if(JSON.stringify(item.Keyword).indexOf('热点')>0 && item.DefaultPicUrl&& index<4)
            {
              item.DefaultPicUrl=item.DefaultPicUrl.indexOf('https://')>-1?item.DefaultPicUrl:'http://info.dxzc.gov.cn/uploadfiles/'+item.DefaultPicUrl;
              hotlist.push(item)
              index++
            }
            else
            {
              if(item.DefaultPicUrl)
              {
                console.log(`111`)
                console.log(item.DefaultPicUrl.indexOf('https://'))
                item.DefaultPicUrl=item.DefaultPicUrl.indexOf('https://')>-1?item.DefaultPicUrl:'http://info.dxzc.gov.cn/uploadfiles/'+item.DefaultPicUrl;
                imageContent.push(item)
              }
              else
              {
                textContent.push(item)
              }
            }
            
           
          
          },[])
          ctx.body={
            special:{
              SpecialName:result[0].SpecialName,
              SpecialID:result[0].SpecialID,
              Description:result[0].Description,
            },
             
            result:
            {
              textContent,
              imageContent,
              hotlist

            },
            code:100
          }
        }
      } catch (error) {
          ctx.body={
            error
          }
      }
     
   
    }
  }
  static async getConetentByID(ctx)
  {
    let data=ctx.request.query;
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else if (!data.ID) {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    }
     else 
    {
      try {
        let result=await ApprovalFormModel.getConetentByID(data.ID)
        if(!result)
        {
          ctx.body={
            code:-1,
            msg:'查无记录'
          }
        }
        else
        {
          console.log(result[0])
          result[0].InputTime=moment(result[0].InputTime).format("YYYY-MM-DD HH:mm:ss");
          ctx.body={
            result:result,
            code:100
          }
        }
      } catch (error) {
          ctx.body={
            error
          }
      }
     
   
    }
  }
    static async get_files_attachmentsbyID(ctx)
  {
    let data=ctx.request.query;
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else if (!data.ID) {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    }
     else 
    {
      let result=await ApprovalFormModel.get_files_attachmentsbyID(data.ID);
      if(!result)
      {
        ctx.body={
          code:-1,
          msg:'查无记录'
        }
      }
      else
      {
        console.log(result)
        let imglist=[]
     imglist=   result.rows.map(item=>{
          return {url:item.path.split('.')[1]+'/'+item.name}
        })
        ctx.body={
          imglist
        }
      }
    }
   

  }
  static async GetArticleByItemID(ctx)
  {
    let data=ctx.request.query;
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else if (!data.itemID) {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else {
      let result=await ApprovalFormModel.GetArticleByItemID(data.itemID);
      if(!result)
      {
        ctx.body={
          code:-1,
          msg:'查无记录'
        }
      }
      else
      {
        result.UpdateTime=moment(result.UpdateTime).format("YYYY-MM-DD HH:mm:ss");
        ctx.body={
          result
        }
      }

    }
  }
  static async GettodayContentList(ctx)
  {
    let data=ctx.request.query;
    console.log(data);
    let result = await ApprovalFormModel.GettodayContentList(data.status);
    ctx.body={
      result
    }
  }
  static async GetArticleList(ctx) 
  {
    let data = ctx.request.query;
    console.log(data);
    let pageNo=data.pageNo
    let pageSize=data.pageSize
    // let parameter={pageNo:1,pageSize:10}
    const offset=(pageNo-1) * pageSize     
    const limit=pageSize * 1
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else if (!data.NodeID) {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else {
      let result = await ApprovalFormModel.GetAllArticleList(Object.assign({offset:offset,limit:limit},data));
    //   const result={
    //     pageNo:pageNo*1,
    //     pageSize:pageSize*1,
    //     data:UserPhonelist.rows,
    //     totalCount:UserPhonelist.count,
    //     totalPage:parseInt(UserPhonelist.count/pageSize)
    // }
      ctx.body = {
        result,
        pageNo:pageNo*1,
        pageSize:pageSize*1,
        totalCount:result.count,
        totalPage:parseInt(result.count/pageSize)
      };
    }
  }

  
  static async AddfilesBymobileApp(ctx) {
    let data = ctx.request.body;
    console.log(data);
    let result = await ApprovalFormModel.AddfilesBymobileApp(data);
    console.log(result);
    if (result.fileinfo && result.result.ID > 0) {
      ctx.body = {
        code: 10000,
        msg: "提交成功"
      };
    }
  }
  static async AddnewsByApp(ctx) {
    let data = ctx.request.body;
    console.log(data);
    let result = await ApprovalFormModel.AddnewsByApp(data);
    console.log(result);
    if (result.fileinfo && result.result.ID > 0) {
      ctx.body = {
        code: 10000,
        msg: "提交成功"
      };
    }
    else
    {
      ctx.body = {
        code: -1,
        msg: "提交失败"
      };
    }
  }
  static async GetNodesInfoByDepID(ctx) {
    let data = ctx.request.query;
    console.log(data);
    let result = await ApprovalFormModel.GetNodesInfoByDepID(data.DepID);
    if (!result) {
      ctx.body = {
        code: -1,
        msg: "未找到该部门下的节点"
      };
      return;
    }

    ctx.body = {
      result
    };
  }
  static async GetTopArticleIdAndCommomModel(ctx) {
    let result = await ApprovalFormModel.GetTopArticleIdAndCommomModel();
    ctx.body = {
      result
    };
  }
  static async CreateArticleAndCommomModel(ctx) {
    let data = ctx.request.body;
    console.log(data);
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1
      };
    } else {
      let res = await ApprovalFormModel.CreateArticleAndCommomModel(data);
      ctx.body = {
        res
      };
    }
  }
  static async V1CreateArticleAndCommomModel(ctx) {
    let data = ctx.request.body;
    console.log(data);
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1
      };
    } else {
      console.log(data)
      let res = await ApprovalFormModel.V1CreateArticleAndCommomModel(data);
      ctx.body = {
        data,
         res
      };
    }
  }
  static async GetApprovaformStatus(ctx) {
    const Item = ctx.request.query.itemid;
    console.log(Item);
    let result = await ApprovalFormModel.GetApprovalFormByItemID(Item);
    console.log(result);

    if (
      result.IsApprovalForm == false ||
      result.IsApprovalForm == null ||
      result.ApprovalForm == null
    ) {
      ctx.body = {
        status: -1
      };
    } else {
      ctx.body = {
        status: 1,
        res: result
      };
    }
  }
}

module.exports = ApprovalFormController;
