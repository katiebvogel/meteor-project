import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';
import fs from 'file-system';
import S3FS from 's3fs';
// import downloader from 's3-download';

Meteor.startup(() => {
  AWS.config.update({
    accessKeyId: 'AKIAIFL53HKHV6NO37LA',
    secretAccessKey: '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',
    'region': 'us-east-1'
  });
  // var data = JSON.parse(json);
  var s3client = new AWS.S3({
    accessKeyId: 'AKIAIFL53HKHV6NO37LA',
    secretAccessKey: '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'
  });
  var downloader = require('s3-download')(s3client);

  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  var params = {
    Bucket: 'bucket.evereve.com',
    Key: 'products.json'
  };
  var sessionParams = {
    maxPartSize: '20MB',
    totalObjectSize: '19MB'
  };

var d = downloader.download(params, sessionParams);
d.on('errror', function(err) {
  console.log('error', err);
});
d.on('downloaded', function(data) {
  console.log('success', data);
});
//
// var w = fs.createWriteStream('./file.json');
// d.pipe(w);
// s3.getObject(params, function (err, data) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     var objectData = data.Body.toString('utf-8');
//   }
// });

// var file = fs.createWriteStream('./file.json');
// s3.getObject(params).createReadStream().pipe(file);

//
//   s3.getObject(params, function (err, data) {
//     if (err) {
//       console.log('error is here', err);
//     } else {
//     // var objectData = fs.createReadStream(data.Body.toString('utf-8'));
//     // var encodedObject = encodeURIComponent(objectData);
//     var myData = data.Body.toString();
//     var chunkSize = 1024;
//     var fileSize = myData.length;
//     var chunks = Math.ceil(fileSize/chunkSize, chunkSize);
//     var chunk = 0;
//     console.log('file size:', fileSize);
//     console.log('chunks...', chunks);
//     while (chunk <= chunks) {
//       var offset = chunk*chunkSize;
//       console.log('current chunk:', chunk);
//       var pieceOfData = myData.slice(offset, offset + chunkSize);
//       var myFile = './file.json';
//       fs.readFile(pieceOfData, function read(err, data) {
//         if (err) {
//           console.log('error in the readfile', err);
//         } else {
//           console.log('success reading?', );
//         }
//       });
//       chunk++;
//     };
//   };
// });




// function updateId() {
// var myData = '/Users/katherinevogel/Desktop/everData.json';
//   for (var i = 0; i < myData.length; i++) {
//     product = myData[i];
//     var currentId = '_id';
//     var newId = i.toString();
//     product.currentId = newId;
//     console.log('product info: ', product);
//   };
// };

function newData(myFile, myData) {
  var myData = '/Users/katherinevogel/Desktop/everData.json';
  fs.readFile('/Users/katherinevogel/Desktop/everData.json', 'utf-8', function (err, data) {
    if (err) throw err;
    var parseData = JSON.parse(data);
    for (var i = 0; i < parseData.length; i++) {
      var product = parseData[i];
      var newId = i.toString();
      product._id = newId;
      // console.log('product: ', product);
    }
    var newData = JSON.stringify(parseData);
    fs.writeFile ('/Users/katherinevogel/Codespace/meteor-project/file.json', newData, function(err) {
      if (err) throw err;
      console.log('completed');
    });
  });
}

newData();

// var myFile = './file.json';
// function changeData(myFile, myData) {
//   var myData = '/Users/katherinevogel/Desktop/everData.json';
//   fs.readFile('/Users/katherinevogel/Desktop/everData.json', 'utf-8', function (err, data) {
//     if (err) throw err;
//     fs.writeFile ('/Users/katherinevogel/Codespace/meteor-project/file.json', data, function(err) {
//       if (err) throw err;
//       console.log('completed');
//     });
//   });
// }
//
// changeData();


//
// var write = function(stuff) { fs.writeFile('Users/katherinevogel/Codespace/meteor-project/file.json', stuff, function (err) {
//   if (err) {
//     console.log('error writing your file');
//   } else {
//     console.log('success writing file');
//   }
// });
// };







});
