const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");
const json2csv = require('json2csv').parse;
const select = require ('puppeteer-select');
const readline = require('readline');

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");
var urls=[];
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('BollywoodMovieDetail.csv')
});

lineReader.on('line', function (line) {
  var s = line.split(',"');
      if(s[1]!=undefined)
      {
          s1 = s[1].split('"');
          console.log(s1[0]);
          urls.push(s1[0]);
       }
});
// stream = fs.open('moviename.csv', 'r',function(err,data)
// {
//   line = data.readLine();
//   while(line) {
//     //casper.echo(line);
    
//     line = stream.readLine();
//     var s = line.split(',"');
//     if(s[1]!=undefined)
//     {
//         s1 = s[1].split('",');
//         console.log(s1[0]);
//         urls.pish(s1[0]);
//     }
  
//   }
   
// });
var movieq,dir,loc,url,base;
(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    for (let i = 0; i < urls.length; i++) {
      url = urls[i];
      base="https://www.google.com/search?q=";
        dir = "bollymovie/"
        movieq = base + url + " movie";
        loc = dir + url +".json";
        //console.log(loc);

        
    var page = await browser.newPage();
    // enter url in page
    console.log(movieq);
    await page.goto(`${movieq}`);
    await page.waitFor(5000);
    //page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.evaluate(() => { if(document.querySelector('span.aKcFGd')!=undefined)
    {
      document.querySelector('span.aKcFGd').click();

     
      
      
    }
  });
  await page.waitFor(3000);
    //const element = await select(page).getElement(`span.aKcFGd`);
    await page.screenshot({path: 'buddy-screenshot.png'});
    //console.log(element);
    // if(element!=null)
    // {
    //     console.log(element.innerHTML);
    //     await element.click();
    //     await navigationPromise;
    //     await page.screenshot({path: 'buddy-screenshot.png'});
        
    // }
    // else
    // {
    //   continue;
    // }
    

    // await page.evaluate(() => {
    //         var example = document.querySelectorAll(`pre.T7nuU`);
    //         console.log(example.length);
    //         for(var i=0;i<example.length;i++)
    //         {
    //             console.log(example[i].text+"\n");
    //             fs.write("movie/d3.csv", example[i].text+"\n", 'a');
    //         }
            
        
    // });
    //page.waitForNavigation({ waitUntil: 'networkidle2' });

  //   await page.evaluate(async () => {
  //     await new Promise((resolve, reject) => {
  //         var totalHeight = 0;
  //         var distance = 10000;
  //         var timer = setInterval(() => {
  //             var scrollHeight = document.querySelector('div.U1vjCc').scrollHeight;
  //             document.querySelector('div.U1vjCc').scrollBy(0, distance);
  //             totalHeight += distance;

  //             if(totalHeight >= scrollHeight){
  //                 clearInterval(timer);
  //                 resolve();
  //             }
  //         }, 100);
  //     });
  // });
    let reviewdata = await page.evaluate(() => {
      let reviews = [];
      // get the hotel elements
      let review = document.querySelectorAll('pre.T7nuU');
      // get the hotel data
      var j=1001;
      review.forEach((rev) => {
          let revJson = {};
          loc = "movie/"+j+".csv";
          j++;
          console.log(loc);
          try {
              revJson.review = rev.innerText;
              revJson.label = 0;
              //fs.write(loc, rev.innerText+"\n", 'a');
          }
          catch (exception){

          }
          reviews.push(revJson);

      });
      return reviews;
  });
//   const fields = [
//     'review',
//     'label'
// ];
// let csv = json2csv({ data: reviewdata, fields });
// fs.writeFile(loc, csv);
  json = JSON.stringify(reviewdata);
  fs.writeFile(loc, json, 'utf8',function(err,data)
  {

  }); 
  console.dir(reviewdata);
  page.close();
  //await page.goto(`${url}`);
  //await page.waitForNavigation({ waitUntil: 'networkidle2' });
}
    debugger;
    // console.log(news);
    await browser.close();
    // Writing the news inside a json file
    // fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    // console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();