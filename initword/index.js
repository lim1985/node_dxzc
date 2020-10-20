const officegen = require('officegen')
const fs = require('fs')
const path = require("path");
const images = require("images");

// Create an empty Word object:
class initfile {
  static async initimages (imgpath) {
    return new Promise(async (resolve) => {
      let _ss = await images(imgpath)
        .size(600)
        .save(imgpath)
      resolve(_ss)


    })
    //   let _ss=await images(imgpath)
    //   .size(1024)
    //   .save(newimgpath)
    // return _ss
  }
  static async newcreateDocx (id, content) {

    //pageMargins (object) - Set document page margins. The default is { top: 1800, right: 1440, bottom: 1800, left: 1440 }
    // let docx = officegen({
    //     type: 'docx', // We want to create a Microsoft Word document.
    //     ... // Extra options goes here.
    // })
    let docx = officegen(
      {
        type: 'docx',
        pageMargins: { top: 100, right: 100, bottom: 100, left: 100 }
      })
    docx.on('finalize', function (written) {

      console.log(
        'Finish to create a Microsoft Word document.'
      )
      return id
    })
    // Officegen calling this function to report errors:
    docx.on('error', function (err) {
      console.log(err)
    })
    let pObj = docx.createP()

    for (let x = 0; x < content.length; x++) {

      if (content[x].indexOf('uploadfiles') > 0) {
        pObj = docx.createP()
        //   let ss=await  initfile.initimages(path.resolve(__dirname, '..'+content[x]))
        //   console.log(ss);
        console.log(path.resolve(__dirname, '..' + content[x]))
        pObj.addImage(path.resolve(__dirname, '..' + content[x]), { cx: 640, cy: 480 })
      }
      else {
        pObj = docx.createP({ align: 'left', indentFirstLine: '440' })
        pObj.addText(content[x]);
      }
      pObj.addLineBreak()
    }


    // pObj.addText(content);
    let docxId = new Promise((resolve, reject) => {
      let out = fs.createWriteStream(path.resolve(__dirname, '../uploadfiles/files/' + id + '.docx'))
      // fs.createWriteStream('./example.docx')
      docx.on('error', function (err) {
        reject(err)
      })
      out.on('error', function (err) {
        console.log(err)
        reject(err)
      })
      out.on('close', function () {
        resolve(id)
      })
      // Async call to generate the output file:
      docx.generate(out)
    })
    return await docxId;
  }

  static async createDocx (imgpath) {
    let docx = officegen('docx')

    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function (written) {
      console.log(
        'Finish to create a Microsoft Word document.'
      )
    })

    // Officegen calling this function to report errors:
    docx.on('error', function (err) {
      console.log(err)
    })

    // Create a new paragraph:
    let pObj = docx.createP()

    pObj.addText('Simple')
    pObj.addText(' with color', { color: '000088' })
    pObj.addText(' and back color.', { color: '00ffff', back: '000088' })

    pObj = docx.createP()

    pObj.addText('Since ')
    pObj.addText('officegen 0.2.12', {
      back: '00ffff',
      shdType: 'pct12',
      shdColor: 'ff0000'
    }) // Use pattern in the background.
    pObj.addText(' you can do ')
    pObj.addText('more cool ', { highlight: true }) // Highlight!
    pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.

    pObj = docx.createP()

    pObj.addText('Even add ')
    pObj.addText('external link', { link: 'https://github.com' })
    pObj.addText('!')

    pObj = docx.createP()

    pObj.addText('Bold + underline', { bold: true, underline: true })

    pObj = docx.createP({ align: 'center' })

    pObj.addText('Center this text', {
      border: 'dotted',
      borderSize: 12,
      borderColor: '88CCFF'
    })
    // Add an ordered list
    pObj = docx.createListOfNumbers()

    pObj.addText('Ordered Option 1')

    // Add a nested list
    pObj = docx.createNestedOrderedList({
      level: 2
    })

    pObj.addText('Second Level Option 1')

    // Add a nested third level list
    pObj = docx.createNestedOrderedList({
      level: 3
    })

    pObj.addText('Third Level Option 1')

    pObj = docx.createNestedOrderedList({
      level: 2
    })

    pObj.addText('Second Level Option 2')

    pObj = docx.createListOfNumbers()

    pObj.addText('Ordered Option 2')

    pObj.addHorizontalLine()
    pObj = docx.createP()
    pObj.options.align = 'right'

    pObj.addText('Align this text to the right.')

    pObj = docx.createP()

    pObj.addText('Those two lines are in the same paragraph,')
    pObj.addLineBreak()
    pObj.addText('but they are separated by a line break.')
    pObj.addLineBreak()
    docx.putPageBreak()
    pObj.addText('superscript', { superscript: true })
    pObj.addText('subscript', { subscript: true })

    var table = [
      [
        {
          val: 'No.',
          opts: {
            cellColWidth: 4261,
            b: true,
            sz: '48',
            shd: {
              fill: '7F7F7F',
              themeFill: 'text1',
              themeFillTint: '80'
            },
            fontFamily: 'Avenir Book'
          }
        },
        {
          val: 'Title1',
          opts: {
            b: true,
            color: 'A00000',
            align: 'right',
            shd: {
              fill: '92CDDC',
              themeFill: 'text1',
              themeFillTint: '80'
            }
          }
        },
        {
          val: 'Title2',
          opts: {
            align: 'center',
            cellColWidth: 42,
            b: true,
            sz: '48',
            shd: {
              fill: '92CDDC',
              themeFill: 'text1',
              themeFillTint: '80'
            }
          }
        }
      ],
      [1, 'All grown-ups were once children', ''],
      [2, 'there is no harm in putting off a piece of work until another day.', ''],
      [
        3,
        'But when it is a matter of baobabs, that always means a catastrophe.',
        ''
      ],
      [4, 'watch out for the baobabs!', 'END']
    ]

    var tableStyle = {
      tableColWidth: 4261,
      tableSize: 24,
      tableColor: 'ada',
      tableAlign: 'left',
      tableFontFamily: 'Comic Sans MS'
    }

    pObj = docx.createTable(table, tableStyle)
    pObj = docx.createP()

    pObj.addText('Fonts face only.', { font_face: 'Arial' })
    pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })

    docx.putPageBreak()

    docx.putPageBreak()
    pObj = docx.createP()


    // We can even add images:
    console.log(path.resolve(__dirname, '..' + imgpath))
    //   pObj.addImage('../uploadfiles/2020/7/6/6822154806.jpg')
    pObj.addImage(path.resolve(__dirname, '..' + imgpath))
    // pObj.addImage('D:\/www\/www.gov.cn20161206\/UploadFiles\/gif\/2020/6\/202006101943154202.gif')
    // pObj.addImage(path.resolve('D:\www\www.gov.cn20161206\UploadFiles/gif/2020/6/202006101943154202.gif'))
    // Let's generate the Word document into a file:

    let out = fs.createWriteStream('./example.docx')

    out.on('error', function (err) {
      console.log(err)
    })

    // Async call to generate the output file:
    docx.generate(out)
  }
}
module.exports = initfile;