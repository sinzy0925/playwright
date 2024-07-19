'use strict';
//npx playwright codegen 'https://www.bybit.com/trade/option/usdc/BTC'
// 左に//を付けるとコメント行になります。プログラムから無視されます。
//google console
//npx playwright install 
//エラーが出るので、指示に従う

//LINE Messaging APIを使って、LINE Botから定型文を送信する
//https://blog.kimizuka.org/entry/2023/11/08/232842

//環境変数の代わりに .env ファイルを使用する (dotenv)
//https://maku77.github.io/nodejs/env/dotenv.html


const fs = require( 'fs' );
require('dotenv').config();
let urlpath = 'public/';//'../Dropbox/Attachments/'
//let urlpath = '../Dropbox/Attachments/';
//let urlpath = '../aaa/bbb/';
let express = require("express");
let app = express();
let server = app.listen(8080, function(){
    console.error(["Node.js is listening to localhost:" + server.address().port + '/' + urlpath]);
});
//app.use('~/aaa/bbb', express.static(__dirname + '~/aaa/bbb'));
//app.use('/public', express.static(__dirname + '/public'));
app.use('/'+urlpath, express.static(__dirname + '/'+urlpath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get('/' + urlpath+ 'download', (req, res) => {
  res.download('./' + urlpath + 'zdownload.html');
})

app.get('/' + urlpath + 'del', (req, res) => {
  let deletefiels = ""
  let files2 = fs.readdirSync(urlpath);
  let filter2 = files2.filter(RegExp.prototype.test, /.*\.html$/); // ファイル名一覧から、拡張子で抽出
  //res.send(filter2);
  
  for(let i =0 ; i < filter2.length ; i++){
      //res.send(filter2[i]);
      fs.unlinkSync(urlpath + filter2[i]);
      console.error(filter2[i]);
      deletefiels += '<br>' + filter2[i] + ' is Deleted.';
  }
  res.send(deletefiels);
})



let arrDDMMYY = [];
arrDDMMYY[0] = '26-07-24';
arrDDMMYY[1] = '02-08-24';

let cnt = -1;
let lineCnt = {cntC0:0 , cntC1:0 , cntP0:0 ,cntP1:0};


let lineAlert = [];//5750;
lineAlert[0] = [[0,0,0],[0,0,0]];//C 
lineAlert[1] = [[0,0,0],[0,0,0]];//P 

let arrKenri = [];
arrKenri[0] = [[71,72,73],[72,73,74]];//C
arrKenri[1] = [[61,60,59],[60,59,58]];//P

let arrResult =[];
arrResult = readfile0();
lineAlert = arrResult[0];
arrKenri  = arrResult[1];
arrDDMMYY = arrResult[2];


app.get('/'+urlpath, (req, res) => {
  const files  = fs.readdirSync(urlpath);
  const filter = files.filter(RegExp.prototype.test, /.*\.html$/); // ファイル名一覧から、拡張子で抽出
  let pathtext ='';
  for(let i = 0 ; i < filter.length ; i++){
    if(filter[i].indexOf('down') == -1){
      pathtext += '<br> <a href="' + filter[i] + '">' + filter[i] + '</a>\n';
      if(i == 2 || i == 5 || i == 8){
        pathtext += '<br>'
      }
    }  
  }
  
  res.send(
    'click!'
    + pathtext 
    + '<br> <a href="zdownload.html">データ表示　：全データファイル</a>\n'
    + '<br> <a href="download">ダウンロード：全データファイル</a>\n'
    + '<br> <a href="del" >ファイル削除：全データファイル（ダウンロード後）</a>\n'
    + '<br> <form action="/" method="post">'
      + '<br>パラメータ設定　※注意：ＳＱ日以外は、すべて数値で入力してください！'
      
      + '<br>ＳＱ日０ : ' 
      + '<input type="text" size="4" name="ddmmyy0" value="'+arrDDMMYY[0]+'">'
      + '<br>ＣＡＬＬ 権利行使価格 : '
      + '<input type="text" size="2" name="kenriCd0k0" value="'+arrKenri[0][0][0]+'">'
      + '<input type="text" size="2" name="kenriCd0k0" value="'+arrKenri[0][0][1]+'">'
      + '<input type="text" size="2" name="kenriCd0k0" value="'+arrKenri[0][0][2]+'">'
      + ' Alert '
      + '<input type="text" size="3" name="alertCd0k0" value="'+lineAlert[0][0][0]+'">'
      + '<input type="text" size="3" name="alertCd0k0" value="'+lineAlert[0][0][1]+'">'
      + '<input type="text" size="3" name="alertCd0k0" value="'+lineAlert[0][0][2]+'">'

      + '<br>ＰＵＴ　 権利行使価格 : '
      + '<input type="text" size="2" name="kenriPd0k0" value="'+arrKenri[1][0][0]+'">'
      + '<input type="text" size="2" name="kenriPd0k0" value="'+arrKenri[1][0][1]+'">'
      + '<input type="text" size="2" name="kenriPd0k0" value="'+arrKenri[1][0][2]+'">'
      + ' Alert '
      + '<input type="text" size="3" name="alertPd0k0" value="'+lineAlert[1][0][0]+'">'
      + '<input type="text" size="3" name="alertPd0k0" value="'+lineAlert[1][0][1]+'">'
      + '<input type="text" size="3" name="alertPd0k0" value="'+lineAlert[1][0][2]+'">'

      + '<br>ＳＱ日１ : '
      + '<input type="text" size="4" name="ddmmyy0" value="'+arrDDMMYY[1]+'">'
      + '<br>ＣＡＬＬ 権利行使価格 : '
      + '<input type="text" size="2" name="kenriCd1k0" value="'+arrKenri[0][1][0]+'">'
      + '<input type="text" size="2" name="kenriCd1k0" value="'+arrKenri[0][1][1]+'">'
      + '<input type="text" size="2" name="kenriCd1k0" value="'+arrKenri[0][1][2]+'">'
      + ' Alert '
      + '<input type="text" size="3" name="alertCd1k0" value="'+lineAlert[0][1][0]+'">'
      + '<input type="text" size="3" name="alertCd1k0" value="'+lineAlert[0][1][1]+'">'
      + '<input type="text" size="3" name="alertCd1k0" value="'+lineAlert[0][1][2]+'">'


      + '<br>ＰＵＴ　 権利行使価格 : '
      + '<input type="text" size="2" name="kenriPd1k0" value="'+arrKenri[1][1][0]+'">'
      + '<input type="text" size="2" name="kenriPd1k0" value="'+arrKenri[1][1][1]+'">'
      + '<input type="text" size="2" name="kenriPd1k0" value="'+arrKenri[1][1][2]+'">'
      + ' Alert '
      + '<input type="text" size="3" name="alertPd1k0" value="'+lineAlert[1][1][0]+'">'
      + '<input type="text" size="3" name="alertPd1k0" value="'+lineAlert[1][1][1]+'">'
      + '<input type="text" size="3" name="alertPd1k0" value="'+lineAlert[1][1][2]+'">'

      
      + '<br><input type="submit" value="送信！">'
      + '</form>'
  );
  console.error("")
  console.error("Start app.get()")
  console.error(['AlertC0 ' + lineAlert[0][0]])
  console.error(['AlertC1 ' + lineAlert[0][1]])
  console.error(['AlertP0 ' + lineAlert[1][0]])
  console.error(['AlertP1 ' + lineAlert[1][1]])
  console.error(['KenriC0 ' + arrKenri[0][0]])
  console.error(['KenriC1 ' + arrKenri[0][1]])
  console.error(['KenriP0 ' + arrKenri[1][0]])
  console.error(['KenriP1 ' + arrKenri[1][1]])
  console.error(['DD-MM-YY ' + arrDDMMYY])
  console.error("END app.get()")
})

app.post('/', function (req, res) {
  console.error('')
  console.error('Start app.post("\/")')
  Object.keys(req.body).forEach((key,i) => {
    console.error(['i:'+i,'key:'+key ,'value:'+req.body[key]]);
  });
  console.error('');

  arrDDMMYY[0] = Object.values(req.body)[0][0];
  arrDDMMYY[1] = Object.values(req.body)[0][1];
  
  arrKenri[0][0][0]  = Object.values(req.body)[1][0]
  arrKenri[0][0][1]  = Object.values(req.body)[1][1]
  arrKenri[0][0][2]  = Object.values(req.body)[1][2]

  lineAlert[0][0][0] = Object.values(req.body)[2][0]
  lineAlert[0][0][1] = Object.values(req.body)[2][1]
  lineAlert[0][0][2] = Object.values(req.body)[2][2]

  arrKenri[1][0][0]  = Object.values(req.body)[3][0] 
  arrKenri[1][0][1]  = Object.values(req.body)[3][1] 
  arrKenri[1][0][2]  = Object.values(req.body)[3][2] 

  lineAlert[1][0][0] = Object.values(req.body)[4][0]
  lineAlert[1][0][1] = Object.values(req.body)[4][1]
  lineAlert[1][0][2] = Object.values(req.body)[4][2]

  arrKenri[0][1][0]  = Object.values(req.body)[5][0]
  arrKenri[0][1][1]  = Object.values(req.body)[5][1]
  arrKenri[0][1][2]  = Object.values(req.body)[5][2]

  lineAlert[0][1][0] = Object.values(req.body)[6][0]
  lineAlert[0][1][1] = Object.values(req.body)[6][1]
  lineAlert[0][1][2] = Object.values(req.body)[6][2]

  arrKenri[1][1][0]  = Object.values(req.body)[7][0]
  arrKenri[1][1][1]  = Object.values(req.body)[7][1]
  arrKenri[1][1][2]  = Object.values(req.body)[7][2]

  lineAlert[1][1][0] = Object.values(req.body)[8][0]
  lineAlert[1][1][1] = Object.values(req.body)[8][1]
  lineAlert[1][1][2] = Object.values(req.body)[8][2]

  console.error(['DD-MM-YY',arrDDMMYY]);
  console.error(['KenriC0', arrKenri[0][0]]);
  console.error(['AlertC0',lineAlert[0][0]]);
  console.error(['KenriP0', arrKenri[1][0]]);
  console.error(['AlertP0',lineAlert[1][0]]);
  console.error(['KenriC1', arrKenri[0][1]]);
  console.error(['AlertC1',lineAlert[0][1]]);
  console.error(['KenriP1', arrKenri[1][1]]);
  console.error(['AlertP1',lineAlert[1][1]]);


  //res.json(req.body);

  writefile0(lineAlert,arrKenri,arrDDMMYY);

  console.error('END app.post("\/")')
  res.redirect(301, urlpath)
})






//const { chromium } = require('playwright');//Chromiumというブラウザを使う
const { firefox } = require('playwright');

(async () => {
  //ヘッダー

//ここに無限ループ
for(let loop = 0 ; loop < 2 ; loop++){
  loop = 0;
  //バグ
  //https://github.com/microsoft/playwright/issues/27600
  let ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.81"
  //page = browser.new_page(user_agent=ua)
  //const browser = await chromium.launch({
  const browser = await firefox.launch({
    headless: true  //false 画面あり　true 画面なし
    //headless: false //false 画面あり　true 画面なし
  });
  const context = await browser.newContext();//contextを使う宣言をする
  const page = await context.newPage();            //pageを使う宣言をする
  let timeout  = 30000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);   //デフォルトタイムアウトを30000ミリ秒に設定する。
  await page.setViewportSize({
    width:  1300,
    height: 1800,
  });//ブラウザの大きさを設定する。

  let timeout1 = 3000;

  let res_text = "";



  console.error(["page.goto() Start"]);
  await page.goto('https://www.bybit.com/trade/option/usdc/BTC');
  await page.waitForTimeout(6000);
  cnt++;
  console.error(["page.goto('https://www.bybit.com/trade/option/usdc/BTC');"]);
  console.error(["page.goto() End"]);



  timeout  = 20000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);  


  let arrRes = [];
  for(let l = 0 ; l < 5 ; l++){
    console.error(["loop","l=0-4","l=" + l,"cnt=" + cnt ]);
    for(let j = 0 ; j < arrDDMMYY.length ; j++){  

      //日付をクリック
      await page.waitForTimeout(500);
      //await page.getByText(arrDDMMYY[j]).click();
      await page.locator('._delivery-time_nlm51_18', { hasText: arrDDMMYY[j] }).click();
      await page.waitForTimeout(2000);

      //日付
      let ddmmyy = arrDDMMYY[j]; 
      //console.error("ddmmyy " + ddmmyy);

      //原資産
      let genshi = "0.00";
      genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];

      if(genshi == "0.00"){
        console.error("genshi err");
        await page.waitForTimeout(500);
        genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
      }
      if(genshi == "0.00"){
        break;
      }

      console.error("");
      console.error(["dd-mm-yy:" + ddmmyy , " genshisan:" + genshi]);
      console.error("");



      let dd = ddmmyy.split('-')[0]; 
      let mm = ddmmyy.split('-')[1]; 
      let yy = ddmmyy.split('-')[2];
      if(      mm == '01'){
        mm = 'JAN';
      }else if(mm == '02'){
        mm = 'FEB';
      }else if(mm == '03'){
        mm = 'MAR';
      }else if(mm == '04'){
        mm = 'APR';
      }else if(mm == '05'){
        mm = 'MAY';
      }else if(mm == '06'){
        mm = 'JUN';
      }else if(mm == '07'){
        mm = 'JUL';
      }else if(mm == '08'){
        mm = 'AUG';
      }else if(mm == '09'){
        mm = 'SEP';
      }else if(mm == '10'){
        mm = 'OCT';
      }else if(mm == '11'){
        mm = 'NOV';
      }else if(mm == '12'){
        mm = 'DEC';
      }else{
        mm = 'err'
      }
      dd = parseInt(dd);

        
      await callput(page,dd,mm,yy,j,arrDDMMYY,l,cnt,lineCnt,lineAlert,arrKenri);
      
    

      
    }//for(let j = 0 ; j < arrDDMMYY.length ; j++){
  }//for(let l = 0 ; l < 10 ; l++){

  await page.close();
  await context.close();
  await browser.close();

}//for(let loop = 0 ; loop < 2 ; loop++){

})();

async function callput(page,dd,mm,yy,j,arrDDMMYY,l,cnt,lineCnt,lineAlert,arrKenri){

  let PATH = '';
  let meigara = '';

  //権利行使価格
  let kenri_c = 0 ;//call
  let kenri_p = 0 ;//put
  if(j == 0){
    kenri_c = arrKenri[0][0] ;//call
    kenri_p = arrKenri[0][1] ;//put
  }else{
    kenri_c = arrKenri[1][0] ;//call
    kenri_p = arrKenri[1][1] ;//put
  }
  
  
  let arrKenri_c = [];
  let arrKenri_p = [];
  if(j == 0){
    arrKenri_c[0] = arrKenri[0][0][0] ;//call
    arrKenri_c[1] = arrKenri[0][0][1] ;
    arrKenri_c[2] = arrKenri[0][0][2] ;
    
    arrKenri_p[0] = arrKenri[1][0][0] ;//put
    arrKenri_p[1] = arrKenri[1][0][1] ;
    arrKenri_p[2] = arrKenri[1][0][2] ;  
  }else{
    arrKenri_c[0] = arrKenri[0][1][0] ;//call
    arrKenri_c[1] = arrKenri[0][1][1] ;
    arrKenri_c[2] = arrKenri[0][1][2] ;
    
    arrKenri_p[0] = arrKenri[1][1][0] ;//put
    arrKenri_p[1] = arrKenri[1][1][1] ;
    arrKenri_p[2] = arrKenri[1][1][2] ;  
  }
  //権利行使価格

  //Call
  for(let i = 0 ; i <= 2 ; i++){
    await page.waitForTimeout(500);

    let BTC_C      = dd + mm        + yy + '-' + arrKenri_c[i] ;
    let BTC_C_line = 'BTC-Options\n' + arrDDMMYY[j] + '\n-' + arrKenri_c[i] + '000[C]';


    meigara = arrDDMMYY[j].split('-')[2]  
            + arrDDMMYY[j].split('-')[1]
            + arrDDMMYY[j].split('-')[0]
            + '-' + arrKenri_c[i];

    if(i == 0){
      meigara = 'C' + meigara + 'a' + j;
    }else{
      meigara = 'C' + meigara;
    }

    PATH = urlpath//'../Dropbox/Attachments/' 
         + meigara
         + '.html';
    
    //コール側をクリックできるか確認
    let test1 = await page.$('#BTC-' + BTC_C + '000');

    if(test1 != null){
      try{
        if(i == 0){
          console.error(["Start async function call " + meigara]);
          console.error("");        
        }
      
        await page.waitForTimeout(500);
        await page.locator('#BTC-' + BTC_C + '000' + ' canvas').click({ position: {x: 200,y: 15} });
        await page.waitForTimeout(2000);
        //await page.locator('#BTC-' + BTC_C + '000' + '-C_checked div').first().click();
        //await page.waitForTimeout(1000);
  
        console.error([meigara],['AlertC'+i,lineAlert[0][j][i],'CntC0,1',lineCnt.cntC0,lineCnt.cntC1],["i:0-2 i:" + i],["j:"+ j ],["l:"+ l ],["cnt:"+ cnt]);

        
        //権利行使価格
        let kenri = await page.locator('//*[@id="orderContainer"]/div[2]/div[1]/div/div[2]').innerText(); 
        

        //ymd
        let ymd = new Date().toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo', 
          year: 'numeric', month: '2-digit' ,day: '2-digit',
          hour: '2-digit', minute: '2-digit',second: '2-digit'});
        

        //原資産
        let genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
        genshi  = parseInt(genshi.replace(/,/g, '')) ;

        
        //ボラティリティ
        let vola = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[1]').innerText(); 
        vola = vola.split('\n')[3].split('%')[0]; 

        //価格
        let kakaku = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[2]/div[1]/div/div[1]').innerText(); 
        let sell = parseInt((kakaku.split('\n')[17]).replace(/,/g, '')) ;//売：注文価格
        //resC += (kakaku.split('\n')[18]).replace(/,/g, '') + ',';//売：数量
        //resC += (kakaku.split('\n')[19]).replace(/,/g, '') + ',';//売：合計BTC
        let mark = parseInt((kakaku.split('\n')[16]).replace(/,/g, '')) ;//マーク価格
        let buy  = parseInt((kakaku.split('\n')[11]).replace(/,/g, '')) ;//買：注文価格 
        //resC += (kakaku.split('\n')[12]).replace(/,/g, '') + ',';//買：数量
        //resC += (kakaku.split('\n')[13]).replace(/,/g, '') + ',';//買：合計BTC



        //残り時間
        let nokori  = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[11];
            nokori += (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[12];
        let nokori1 = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[13];
        if(nokori1.indexOf('min') > 0){
          nokori += nokori1;
        }      
        nokori = nokori.split('min')[0];     

        let resC = "";
        resC = genshi +',<font color="red">[,'+ sell +',]</font>,'+ mark +','+ buy +','+ vola +',' 
             + meigara  +  ',<br>,' + ymd + ',' + nokori + ',<br>\n'; 
        
        fs.appendFileSync( PATH , resC );
        fs.appendFileSync( urlpath + 'zdownload.html', resC );

        //console.warn([PATH]);
        console.error([resC]);

        await page.waitForTimeout(500);

        //console.error('lineAlert '+lineAlert[0][j][i]) j==日

        let lineCount = 0;
        if(j == 0){
          lineCount = lineCnt.cntC0
        }else{
          lineCount = lineCnt.cntC1
        }
    
        if(i == 0 && sell > lineAlert[0][j][i] && lineCount < 5){
          let linemsg = '[SELL Alert]>' + lineAlert[0][j][i] + '\n\n'
                      + BTC_C_line 
                      + '\n[Sell]:' + sell 
                      + '\n[原資産]:' + genshi 
                      + '\n' + ymd
                      + '\nCount:' + lineCount;
          await sendline(linemsg);
          console.error(linemsg);
          lineCount++;
          if(j == 0){
            lineCnt.cntC0 = lineCount;
          }else{
            lineCnt.cntC1 = lineCount;
          }
        }


      


      } catch(e) {
          console.error( 'err : ' + e.message );
      }
    }
  }//for(let i = 0 ; i <= 2 ; i++){

  
  //put
  for(let i = 0 ; i <= 2 ; i++){
    await page.waitForTimeout(500);

    let BTC_P      = dd + mm        + yy + '-' + arrKenri_p[i] ;
    let BTC_P_line = 'BTC-Options\n' + arrDDMMYY[j] + '\n-' + arrKenri_p[i] + '000[P]';
    
    meigara = arrDDMMYY[j].split('-')[2]  
            + arrDDMMYY[j].split('-')[1]
            + arrDDMMYY[j].split('-')[0]
            + '-' + arrKenri_p[i];

    if(i == 2){
      meigara = 'P' + meigara + 'a' + j;
    }else{
      meigara = 'P' + meigara;
    }

    PATH = urlpath//'../Dropbox/Attachments/' 
         + meigara
         + '.html';
     

    //put側をクリックできるか確認
    let test1 = await page.$('#BTC-' + BTC_P + '000');

    if(test1 != null){
      try{
        if(i == 0){
          console.error(["Start async function put " + meigara]);
          console.error("");        
        }
      
        await page.waitForTimeout(500);
        await page.locator('#BTC-' + BTC_P + '000' + ' canvas').click({ position: {x: 600,y: 15} });
        await page.waitForTimeout(2000);
        //await page.locator('#BTC-' + BTC_P + '000' + '-P_checked div').first().click();
        //await page.waitForTimeout(1000);
  
        console.error([meigara],['AlertP'+i,lineAlert[1][j][i],'CntP0,1',lineCnt.cntP0,lineCnt.cntP1],["i:0-2 i:" + i ],["j:"+ j ],["l:"+ l ],["cnt:"+ cnt ]);

        
        //権利行使価格
        let kenri = await page.locator('//*[@id="orderContainer"]/div[2]/div[1]/div/div[2]').innerText(); 
        

        //ymd
        let ymd = new Date().toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo', 
          year: 'numeric', month: '2-digit' ,day: '2-digit',
          hour: '2-digit', minute: '2-digit',second: '2-digit'});
        

        //原資産
        let genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
        genshi  = parseInt(genshi.replace(/,/g, '')) ;

        
        //ボラティリティ
        let vola = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[1]').innerText(); 
        vola = vola.split('\n')[3].split('%')[0]; 

        //価格
        let kakaku = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[2]/div[1]/div/div[1]').innerText(); 
        let sell = parseInt((kakaku.split('\n')[17]).replace(/,/g, '')) ;//売：注文価格
        //resC += (kakaku.split('\n')[18]).replace(/,/g, '') + ',';//売：数量
        //resC += (kakaku.split('\n')[19]).replace(/,/g, '') + ',';//売：合計BTC
        let mark = parseInt((kakaku.split('\n')[16]).replace(/,/g, '')) ;//マーク価格
        let buy  = parseInt((kakaku.split('\n')[11]).replace(/,/g, '')) ;//買：注文価格 
        //resC += (kakaku.split('\n')[12]).replace(/,/g, '') + ',';//買：数量
        //resC += (kakaku.split('\n')[13]).replace(/,/g, '') + ',';//買：合計BTC



        //残り時間
        let nokori  = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[11];
            nokori += (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[12];
        let nokori1 = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[13];
        if(nokori1.indexOf('min') > 0){
          nokori += nokori1;
        }      
        nokori = nokori.split('min')[0] ;     

        let resC = "";
        resC = genshi +',<font color="red">[,'+ sell +',]</font>,'+ mark +','+ buy +','+ vola + ',' 
             + meigara + ',<br>,' + ymd + ',' + nokori + ',<br>\n'; 
        
        fs.appendFileSync( PATH, resC );
        fs.appendFileSync( urlpath + 'zdownload.html', resC );

        //console.warn([PATH]);
        console.error([resC]);

        await page.waitForTimeout(500);

        let lineCount = 0;
        if(j == 0){
          lineCount = lineCnt.cntP0
        }else{
          lineCount = lineCnt.cntP1
        }

        if(i == 0 && sell > lineAlert[1][j][i] && lineCount < 5){
          let linemsg = '[SELL Alert]>' + lineAlert[1][j][i] + '\n\n'
                      + BTC_P_line
                      + '\n[Sell]:' + sell 
                      + '\n[原資産]:' + genshi 
                      + '\n' + ymd
                      + '\nCount:' + lineCount;
          await sendline(linemsg);
          console.error(linemsg);
          lineCount++;
          if(j == 0){
            lineCnt.cntP0 = lineCount;
          }else{
            lineCnt.cntP1 = lineCount;
          }
        }
    
    
      


      } catch(e) {
          console.error( 'err : ' + e.message );
      }
    }


  }//for(let i = 0 ; i <= 2 ; i++){


}//async function callput(page,dd,mm,yy){

async function sendline(linemsg) {
  //LINE Messaging APIを使って、LINE Botから定型文を送信する
  //https://blog.kimizuka.org/entry/2023/11/08/232842

  const line = require('@line/bot-sdk');
  const { CHANNEL_SECRET, CHANNEL_TOKEN } = process.env;
  const config = {
      channelSecret: CHANNEL_SECRET,
      channelAccessToken: CHANNEL_TOKEN
  };
  const client = new line.Client(config);
  const messages = [{
    type: 'text',
    text: '[Bybit]\n[USDCオプション]\n'+ linemsg
  }];

  try {
    await client.broadcast(messages);
  } catch (error) {
    console.log(`${ error.statusMessage }`);
    console.log(error.originalError.response.data);
  }
}

function readfile0() {
  console.error("")
  console.error("Start readfile0()")
  let lineAlert = [];
  let arrKenri  = [];
  let arrDDMMYY = [];
  lineAlert[0] = [[0,0,0],[0,0,0]];//C ;
  lineAlert[1] = [[0,0,0],[0,0,0]];//P ;
  arrKenri[0]  = [[0,0,0],[0,0,0]];//C ;
  arrKenri[1]  = [[0,0,0],[0,0,0]];//P ;
  try{
    let ac0 = fs.readFileSync(urlpath+"paramAlertC0.csv", 'utf-8');
    let ac1 = fs.readFileSync(urlpath+"paramAlertC1.csv", 'utf-8');
    let ap0 = fs.readFileSync(urlpath+"paramAlertP0.csv", 'utf-8');
    let ap1 = fs.readFileSync(urlpath+"paramAlertP1.csv", 'utf-8');
    let kc0 = fs.readFileSync(urlpath+"paramKenriC0.csv", 'utf-8');
    let kc1 = fs.readFileSync(urlpath+"paramKenriC1.csv", 'utf-8');
    let kp0 = fs.readFileSync(urlpath+"paramKenriP0.csv", 'utf-8');
    let kp1 = fs.readFileSync(urlpath+"paramKenriP1.csv", 'utf-8');
    let dmy = fs.readFileSync(urlpath+"paramDDMMYY.csv" , 'utf-8');
    console.error([ac0],[ac1]);
    console.error([ap0],[ap1]);
    console.error([kc0],[kc1])
    console.error([kp0],[kp1])
    console.error([dmy])
  
  
    let ac00  = ac0.split('\r')[0].split(',');
    let ac01  = ac1.split('\r')[0].split(',');
    let ap00  = ap0.split('\r')[0].split(',');
    let ap01  = ap1.split('\r')[0].split(',');
    lineAlert[0][0] = [ac00[0],ac00[1],ac00[2]];
    lineAlert[0][1] = [ac01[0],ac01[1],ac01[2]];
    lineAlert[1][0] = [ap00[0],ap00[1],ap00[2]];
    lineAlert[1][1] = [ap01[0],ap01[1],ap01[2]];
  
  
    let kc00 = kc0.split('\r')[0].split(',');
    let kc01 = kc1.split('\r')[0].split(',');
    let kp00 = kp0.split('\r')[0].split(',');
    let kp01 = kp1.split('\r')[0].split(',');
    arrKenri[0][0] = [kc00[0],kc00[1],kc00[2]];
    arrKenri[0][1] = [kc01[0],kc01[1],kc01[2]];
    arrKenri[1][0] = [kp00[0],kp00[1],kp00[2]];
    arrKenri[1][1] = [kp01[0],kp01[1],kp01[2]];
  
  
    let dmy1  = dmy.split('\r')[0].split(',');
    arrDDMMYY[0]    = dmy1[0];
    arrDDMMYY[1]    = dmy1[1];

    console.error(lineAlert[0][0],lineAlert[0][1])
    console.error(lineAlert[1][0],lineAlert[1][1])
    console.error(arrKenri[0][0],arrKenri[0][1])
    console.error(arrKenri[1][0],arrKenri[1][1])
    console.error(arrDDMMYY)
  
  }catch(e){
    console.error(e)
  }
  
  console.error("End readfile0()")
  return [lineAlert,arrKenri,arrDDMMYY];
}

function writefile0(lineAlert,arrKenri,arrDDMMYY) {
  console.error("")
  console.error("Start writefile0(lineAlert,arrKenri,arrDDMMYY) ")
  let lac0 = '';
  let lac1 = '';
  let kec0 = '';
  let kec1 = '';
  for(let j = 0 ; j <= 1 ; j++){
    for(let i = 0 ; i <= 2 ; i++){
      if(j == 0){
        lac0 += lineAlert[0][j][i] + ','
        kec0 += arrKenri[0][j][i]  + ','  
      }else{
        lac1 += lineAlert[0][j][i] + ','
        kec1 += arrKenri[0][j][i]  + ','  
      }
    }
    
  }

  let lap0 = '';
  let lap1 = '';
  let kep0 = '';
  let kep1 = '';
  for(let j = 0 ; j <= 1 ; j++){
    for(let i = 0 ; i <= 2 ; i++){
      if(j == 0){
        lap0 += lineAlert[1][j][i] + ','
        kep0 += arrKenri[1][j][i]  + ','  
      }else{
        lap1 += lineAlert[1][j][i] + ','
        kep1 += arrKenri[1][j][i]  + ','  

      }
    }
    
  }

  fs.writeFileSync(urlpath+"paramDDMMYY.csv" , arrDDMMYY[0]+','+arrDDMMYY[1]);
  fs.writeFileSync(urlpath+"paramAlertC0.csv", lac0);
  fs.writeFileSync(urlpath+"paramAlertC1.csv", lac1);
  fs.writeFileSync(urlpath+"paramAlertP0.csv", lap0);
  fs.writeFileSync(urlpath+"paramAlertP1.csv", lap1);
  fs.writeFileSync(urlpath+"paramKenriC0.csv", kec0);
  fs.writeFileSync(urlpath+"paramKenriC1.csv", kec1);
  fs.writeFileSync(urlpath+"paramKenriP0.csv", kep0);
  fs.writeFileSync(urlpath+"paramKenriP1.csv", kep1);

  console.error(["write "+urlpath+"paramDDMMYY.csv" , arrDDMMYY[0]+','+arrDDMMYY[1]])
  console.error(["write "+urlpath+"paramAlertC0.csv", lac0])
  console.error(["write "+urlpath+"paramAlertC1.csv", lac1])
  console.error(["write "+urlpath+"paramAlertP0.csv", lap0])
  console.error(["write "+urlpath+"paramAlertP1.csv", lap1])
  console.error(["write "+urlpath+"paramKenriC0.csv", kec0])
  console.error(["write "+urlpath+"paramKenriC1.csv", kec1])
  console.error(["write "+urlpath+"paramKenriP0.csv", kep0])
  console.error(["write "+urlpath+"paramKenriP1.csv", kep1])

  console.error("END writefile0(lineAlert,arrKenri,arrDDMMYY) ")

}