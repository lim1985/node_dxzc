const crypto = require("crypto");
const hash = crypto.createHash("md5");
var querystring = require("querystring");
var uuid = require("node-uuid");
const http = require("http");
console.log(uuid.v1());
console.log(
  uuid
    .v4()
    .toString()
    .replace(/\-/g, "")
);
const db = require("../config/db");
const gov = db.gov;
const shaoYangchannelModel = gov.import("../schema/shaoYangchannel");
const ArticleModel = gov.import("../schema/PE_U_Article.js");
// http://59.230.210.31:8091/cms/encrypt    参数：key  ，jsopMap
// http://59.230.210.31:8091/cms/decode
const userID = "ad143c458e104ce6be88626f2cd5b525";
const strategyCode = "dxzc";
const key = "dxzc1234"; //密钥
class ToShaoYangClass {
  // http://59.230.210.31:8888/website-webapp/rest/manuscript/addManuscript
  //strategyCode=dxzc 参数1
  //data= 参数2
  static async IsSend(s) {
    let result = await ArticleModel.update(
      { IsSendShaoYang: true },
      {
        where: {
          ID: s.ID
        }
      }
    );
    if (result[0] == 1) {
      return true;
    }
  }
  static async selectChennelByNodeID(data) {
    let result = await shaoYangchannelModel.findOne({
      attributes: [
        "websiteName",
        "websiteId",
        "channelName",
        "nodeid",
        "channelkey",
        "channelId",
        "outwebSite"
      ],
      where: {
        nodeid: data.NodeId
      },
      order: [["channelId", "DESC"]]
    });
    return result;
  }
  static add(datas) {
    //http://59.230.210.31:8888/website-webapp/rest/manuscript/addManuscript
    var contents = querystring.stringify({
      strategyCode: strategyCode,
      data: datas,
      encryptType: 1
    });
    console.log(contents);
    var options = {
      host: "59.230.210.31",
      port: "8888",
      path: "/website-webapp/rest/manuscript/addManuscript",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": contents.length
      }
    };
    return new Promise((resolve, reject) => {
      var req = http.request(options, function(res) {
        res.setEncoding("utf8");
        // res.on('data',function(data){
        //     console.log("data:",data);   //一段html代码
        //     resolve({data:data});
        // });
        res.on("data", result => {
          console.log(result);
          //console.log(statusStr(result));
          resolve({ data: result });
        });
        res.on("end", function() {});
      });
      req.on("error", function(err) {
        console.error(err);
        reject(err);
      });
      req.write(contents);
      req.end();
    });
  }

  static decode(data) {
    var content = querystring.stringify({
      key: key,
      msg: data
    });
    var options = {
      host: "59.230.210.31",
      port: "8091",
      path: "/cms/decode?" + content,
      method: "get"
      // headers:{
      //     'Content-Type':'application/x-www-form-urlencoded',
      //     'Content-Length':contents.length
      // }
    };
    return new Promise((resolve, reject) => {
      //   console.log(uuid.v4().toString().replace(/\-/g,""))
      var req = http.request(options, function(res) {
        res.setEncoding("utf-8");
        res.on("data", result => {
          // console.log(result);
          // console.log(statusStr(result));
          resolve(JSON.parse(result));
        });
        res.on("end", function() {});
      });
      req.on("error", function(reject) {
        console.error(reject);
      });
      req.end();
    });
  }
  static encrypt(s) {
    s.manuscriptId = uuid
      .v4()
      .toString()
      .replace(/\-/g, "");
    s.userId = userID;
    let _datas = querystring.stringify({
      key: key,
      jsopMap: JSON.stringify(s)
    });
    var options = {
      host: "59.230.210.31",
      port: "8091",
      path: "/cms/encrypt",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": _datas.length
      }
    };
    return new Promise((resolve, reject) => {
      var req = http.request(options, function(res) {
        res.setEncoding("utf8");
        // res.on('data',function(data){
        //     console.log("data:",data);   //一段html代码
        //     resolve({data:data});
        // });
        res.on("data", result => {
          console.log(result);
          //console.log(statusStr(result));
          resolve({ data: result });
        });
        res.on("end", function() {});
      });
      req.on("error", function(err) {
        console.error(err);
        reject(err);
      });
      req.write(_datas);
      req.end();
    });
  }
}
module.exports = ToShaoYangClass;
// let _uuid=uuid.v4().toString().replace(/\-/g,"")
// let strategyCode = "dxzc";
// let key = "dxzc1234";//密钥
// let params={
//     "manuscriptId":_uuid,
//     "title":"新增稿件带图片测试4",
//     "subTitle":"新增稿件带图片测试4",
//     "keyword": "",
//     "memo": "摘要"
// }
//     // decodeURI()方法相当于java.net.URLDecoder.decode(URIString, "UTF-8");
//     // encodeURI()方法相当于java.net.URLEncoder.encode(URIString, "UTF-8");
//     //	data += java.net.URLEncoder.encode(k) + "=" + java.net.URLEncoder.encode(map.get(k), "UTF-8") + "&";
//     initdata(key,params)

// params.put("manuscriptId", uuid);
// 		params.put("title", "新增稿件带图片测试4");
// 		params.put("subTitle", "新增稿件带图片测试4");
// 		params.put("keyword", "");
//         params.put("memo", "摘要");
// function strToUtf8Bytes(str) {
//     const utf8 = [];
//     for (let ii = 0; ii < str.length; ii++) {
//     let charCode = str.charCodeAt(ii);
//     if (charCode < 0x80) utf8.push(charCode);
//     else if (charCode < 0x800) {
//         utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
//     } else if (charCode < 0xd800 || charCode >= 0xe000) {
//         utf8.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
//     } else {
//         ii++;
//         // Surrogate pair:
//         // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
//         // splitting the 20 bits of 0x0-0xFFFFF into two halves
//         charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
//         utf8.push(
//         0xf0 | (charCode >> 18),
//         0x80 | ((charCode >> 12) & 0x3f),
//         0x80 | ((charCode >> 6) & 0x3f),
//         0x80 | (charCode & 0x3f),
//         );
//     }
//     }
//     //兼容汉字，ASCII码表最大的值为127，大于127的值为特殊字符
//     for(let jj=0;jj<utf8.length;jj++){
//         var code = utf8[jj];
//         if(code>127){
//             utf8[jj] = code - 256;
//         }
//     }
//     return utf8;
// }
// function stringToBytes (str) {

//     var ch, st, re = [];
//     for (var i = 0; i < str.length; i++ ) {
//         ch = str.charCodeAt(i);  // get char
//         st = [];                 // set up "stack"

//        do {
//             st.push( ch & 0xFF );  // push byte to stack
//             ch = ch >> 8;          // shift value down by 1 byte
//         }

//         while ( ch );
//         // add stack contents to result
//         // done because chars have "wrong" endianness
//         re = re.concat( st.reverse() );
//     }
//     // return an array of bytes
//     return re;
// }
// private static Key getKey(byte[] arrBTmp) throws Exception {
//     // 创建一个空的8位字节数组（默认值为0）
//     byte[] arrB = new byte[8];
//     // 将原始字节数组转换为8位
//     for(int i = 0; i < arrBTmp.length && i < arrB.length; i++) {
//         arrB[i] = arrBTmp[i];
//     }
//     // 生成密钥
//     Key key = new SecretKeySpec(arrB, "DES");
//     return key;
// }
//  function getkey(_byteArr)
//  {
//     let _arr=new Array(8)
//     for(let i=0;i<_byteArr.length && i<_arr.length;i++)
//     {
//         _arr[i]=_byteArr[i]
//     }

//  }

// public static String encrypt(String strIn, String secretkey) throws Exception {
//     Key key = getKey(secretkey.getBytes("utf-8"));
//     Cipher cipher = Cipher.getInstance("DES");
//     cipher.init(Cipher.ENCRYPT_MODE, key);
//     return byteArr2HexStr(cipher.doFinal(strIn.getBytes("utf-8")));
// }
//加密
// function encrypt(strin,secrekey)
// {
//   let key=  strToUtf8Bytes(secrekey)

// }
//      function initdata(key,_params)
// {
//     let params=''
//     let _data=''
//     for(let x in _params)
//     {
//        _data+=encodeURI(x)+'='+encodeURI(_params[x])+'&';
//     }
//     console.log(_data)
//     try {
//             if(_data!='')
//             {
//                 // let md5Sign = function (data) {
//                 //     var md5 = crypto.createHash('md5').update(data, 'utf-8').digest('hex');
//                 //     return md5;
//                 // }

//              const hash = crypto.createHash('md5').update(strToUtf8Bytes(_data, 'utf-8').toString())
//               let _byte = hash.digest('hex');
//            //  console.log(strToUtf8Bytes(_data))
//            console.log(`----------------------`)
//            console.log(strToUtf8Bytes(_data))

//                  let _tobyte=stringToBytes(_byte);

//               //  byteArr2HexStr(_tobyte)
//               params = byteArr2HexStr(_tobyte) + "@@@"
//             }

//     } catch (error) {
//             console.log(error)
//     }
//     function byteArr2HexStr(arrb)
//     {
//          let ilen=arrb.length;
//          let sb =new Array(ilen*2)
//          console.log(sb)
//          for(let i=0;i<ilen;i++)
//          {
//              let intTemp=arrb[i]
//              while(intTemp<0)
//              {
//                  intTemp=intTemp+256;
//              }
//              if(intTemp<16)
//              {
//                  sb.push('0')
//              }
//             // console.log(intTemp)
//             let hexString = intTemp.toString(16);

//             sb.push(hexString)
//          }
//          return sb.toString()
//     }
// public static String byteArr2HexStr(byte[] arrB) throws Exception {
//     int iLen = arrB.length;
//     // 每个byte用两个字符才能表示，所以字符串的长度是数组长度的两倍
//     StringBuffer sb = new StringBuffer(iLen * 2);
//     for(int i = 0; i < iLen; i++) {
//         int intTmp = arrB[i];
//         // 把负数转换为正数
//         while(intTmp < 0) {
//             intTmp = intTmp + 256;
//         }
//         // 小于0F的数需要在前面补0
//         if(intTmp < 16) {
//             sb.append("0");
//         }
//         sb.append(Integer.toString(intTmp, 16));
//     }
//     return sb.toString();
// }
//   let md5='';
//   hash.update(data.title)
//    let mymd5=hash.digest('hex');
// if (!data.equals("")) {
//     data = data.substring(0, data.length() - 1);
//     MessageDigest md = MessageDigest.getInstance("MD5");
//     md.update(data.getBytes("UTF-8"));
//     byte[] digestByte = md.digest();
//     params = DesUtils.byteArr2HexStr(digestByte) + "@@@" + DesUtils.encrypt(data, key);
// }

// }
