// 左に//を付けるとコメント行になります。プログラムから無視されます。
//google console
//npx playwright install 
//エラーが出るので、指示に従う

//npx playwright codegen

//const { chromium } = require('playwright');//Chromiumというブラウザを使う
const { firefox } = require('playwright');

(async () => {
  //ヘッダー
  console.log("OP,BTC-YMD-$,YMD,Genshisan,IV%,Sell,S-Cnt,S-Cnt2,Mark,Buy,B-Cnt,B-Cnt2,Time");

//ここに無限ループ
for(let loop = 0 ; loop < 2 ; loop++){
  loop = 0;
  //バグ
  //https://github.com/microsoft/playwright/issues/27600
  ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.81"
  //page = browser.new_page(user_agent=ua)
  //const browser = await chromium.launch({
  const browser = await firefox.launch({
    headless: true  //false 画面あり　true 画面なし
    //headless: false //false 画面あり　true 画面なし
  });
  const context = await browser.newContext();//contextを使う宣言をする
  const page = await context.newPage(user_agent=ua);            //pageを使う宣言をする
  let timeout  = 30000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);   //デフォルトタイムアウトを30000ミリ秒に設定する。
  await page.setViewportSize({
    width:  1200,
    height: 1800,
  });//ブラウザの大きさを設定する。

  let timeout1 = 3000;

  let res_text = "";



  await page.goto('https://www.bybit.com/trade/option/usdc/BTC');
  await page.waitForTimeout(5000);

  timeout  = 20000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);  

  let arrDDMMYY = [];
/*
  arrDDMMYY[0] = '//*[@id="quote-select-options"]/div[1]/div[2]';
  arrDDMMYY[1] = '//*[@id="quote-select-options"]/div[1]/div[3]';
  arrDDMMYY[2] = '//*[@id="quote-select-options"]/div[1]/div[4]';
  arrDDMMYY[3] = '//*[@id="quote-select-options"]/div[1]/div[5]';
  arrDDMMYY[4] = '//*[@id="quote-select-options"]/div[1]/div[6]';
*/
  arrDDMMYY[0] = '//*[@id="quote-select-options"]/div[1]/div[6]';

  let arrRes = [];
  for(let j = 0 ; j < arrDDMMYY.length ; j++){  

    //日付をクリック
    await page.waitForTimeout(100);
    await page.locator(arrDDMMYY[j]).click();
    await page.waitForTimeout(500);

    //日付
    let ddmmyy = await page.locator(arrDDMMYY[j]).innerText(); 
    await page.waitForTimeout(500);

    //原資産
    let genshi = "0.00";
    genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];

    if(genshi == "0.00"){
      console.error("genshi err");
      await page.waitForTimeout(500);
      genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
    }

    console.error("");
    console.error("dd-mm-yy " + ddmmyy + " genshisan " + genshi);

    //権利行使価格
    let arrKenrikoushi = [];
    arrKenrikoushi[0] = (parseInt(genshi.split(',')[0]) - 0 )*1000 ;
    arrKenrikoushi[1] = (parseInt(genshi.split(',')[0]) - 1 )*1000 ;
    arrKenrikoushi[2] = (parseInt(genshi.split(',')[0]) - 2 )*1000 ;
    arrKenrikoushi[3] = (parseInt(genshi.split(',')[0]) - 3 )*1000 ;
    arrKenrikoushi[4] = (parseInt(genshi.split(',')[0]) - 4 )*1000 ;
    arrKenrikoushi[5] = (parseInt(genshi.split(',')[0]) - 5 )*1000 ;
    arrKenrikoushi[6] = (parseInt(genshi.split(',')[0]) - 6 )*1000 ;
    arrKenrikoushi[7] = (parseInt(genshi.split(',')[0]) - 7 )*1000 ;
    arrKenrikoushi[8] = (parseInt(genshi.split(',')[0]) - 8 )*1000 ;

    arrKenrikoushi[9] = (parseInt(genshi.split(',')[0]) - 0 )*1000 ;

    arrKenrikoushi[10] = (parseInt(genshi.split(',')[0]) + 0 )*1000 ;
    arrKenrikoushi[11] = (parseInt(genshi.split(',')[0]) + 1 )*1000 ;
    arrKenrikoushi[12] = (parseInt(genshi.split(',')[0]) + 2 )*1000 ;
    arrKenrikoushi[13] = (parseInt(genshi.split(',')[0]) + 3 )*1000 ;
    arrKenrikoushi[14] = (parseInt(genshi.split(',')[0]) + 4 )*1000 ;
    arrKenrikoushi[15] = (parseInt(genshi.split(',')[0]) + 5 )*1000 ;
    arrKenrikoushi[16] = (parseInt(genshi.split(',')[0]) + 6 )*1000 ;
    arrKenrikoushi[17] = (parseInt(genshi.split(',')[0]) + 7 )*1000 ;
    arrKenrikoushi[18] = (parseInt(genshi.split(',')[0]) + 8 )*1000 ;

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

    for(let k = 0 ; k <= 5 ; k++){
      await page.waitForTimeout(500);
      await call(page,arrKenrikoushi,dd,mm,yy);
  
      await page.waitForTimeout(500);
      await put(page,arrKenrikoushi,dd,mm,yy);  
    }


    
  }//for(let j = 0 ; j < arrDDMMYY.length ; j++){

  await page.close();
  await context.close();
  await browser.close();

}//for(let loop = 0 ; loop < 2 ; loop++){

})();

async function call(page,arrKenrikoushi,dd,mm,yy){

  for(let i = 18 ; i >= 10 ; i--){
    let BTC_C = '#BTC-' + dd + mm + yy + '-' + arrKenrikoushi[i] ;

    //コール側をクリックできるか確認
    let test1 = await page.$(BTC_C);

    if(test1 != null){
      try{
        if(i == 18){
          console.error("");
          console.error("Start async function call(page,arrKenrikoushi,dd,mm,yy)");
          console.error("");        
        }
      
        await page.locator(BTC_C + ' canvas').click({ position: {x: 325,y: 25} });
        await page.waitForTimeout(500);
        await page.locator(BTC_C + '-C_checked div').first().click();
        await page.waitForTimeout(500);

      
        for(let j = 0 ; j <= 1 ; j++){
          console.error("C-" + BTC_C + " i 18-10 now : " + i + " j = " + j);

          let resC = "OP,";
          
          //権利行使価格
          res_text = await page.locator('//*[@id="orderContainer"]/div[2]/div[1]/div/div[2]').innerText(); 
          resC += res_text + ','; 

          //ymd
          ymd = new Date().toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo', 
            year: 'numeric', month: '2-digit' ,day: '2-digit',
            hour: '2-digit', minute: '2-digit',second: '2-digit'});
          resC += ymd + ',';

          //原資産
          genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
          resC += genshi.replace(/,/g, '') + ',';

          
          //ボラティリティ
          res_text = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[1]').innerText(); 
          resC += res_text.split('\n')[3] + ','; 

          //価格
          res_text = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[2]/div[1]/div/div[1]').innerText(); 

          resC += (res_text.split('\n')[17]).replace(/,/g, '') + ',';//売：注文価格
          resC += (res_text.split('\n')[18]).replace(/,/g, '') + ',';//売：数量
          resC += (res_text.split('\n')[19]).replace(/,/g, '') + ',';//売：合計BTC
          //res += (res_text.split('\n')[14] + ',';//↑
          //res += (res_text.split('\n')[15] + ',';//％
          resC += (res_text.split('\n')[16]).replace(/,/g, '') + ',';//マーク価格
          resC += (res_text.split('\n')[11]).replace(/,/g, '') + ',';//買：注文価格 
          resC += (res_text.split('\n')[12]).replace(/,/g, '') + ',';//買：数量
          resC += (res_text.split('\n')[13]).replace(/,/g, '') + ',';//買：合計BTC

          //残り時間
          res_text = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[11];
          res_text += (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[12];
          res_txt1 = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[13];
          if(res_txt1.indexOf('min') > 0){
            res_text += res_txt1;
          }      
          resC += res_text.split('min')[0] + 'min,';     

          console.warn(resC);
          console.log(resC);
          if(j == 0){
            await page.waitForTimeout(1000);
          }        
      
        }//for(let j = 0 ; j <= 1 ; j++){


      } catch(e) {
          console.error( 'err : ' + e.message );
      }
    }


  }//for(let i = 18 ; i >= 10 ; i--){


}//async function call(page,arrKenrikoushi,dd,mm,yy){

async function put(page,arrKenrikoushi,dd,mm,yy){
////////////8
  for(let i = 8 ; i >= 0 ; i--){  
    let BTC_P = '#BTC-' + dd + mm + yy + '-' + arrKenrikoushi[i] ;

    //プット側をクリックできるか確認
    let test1 = await page.$(BTC_P);

    if(test1 != null){
      try{
        if(i == 8){
          console.error("");
          console.error("Start async function put(page,arrKenrikoushi,dd,mm,yy)");
          console.error("");  
        }
            
        await page.locator(BTC_P + ' canvas').click({ position: {x: 925,y: 25} });
        await page.waitForTimeout(500);
        await page.locator(BTC_P + '-P_checked div').first().click();
        await page.waitForTimeout(500);


        for(let j = 0 ; j <= 1 ; j++){
          console.error("P-" + BTC_P + " i 8-0 now : " + i + " j = " + j);

          let resP = "OP,";

          //権利行使価格
          res_text = await page.locator('//*[@id="orderContainer"]/div[2]/div[1]/div/div[2]').innerText(); 
          resP += res_text + ','; 

          //ymd
          let ymd = new Date().toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo', 
            year: 'numeric', month: '2-digit' ,day: '2-digit',
            hour: '2-digit', minute: '2-digit',second: '2-digit'});

          resP += ymd + ',';

          //原資産
          genshi = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[3];
          resP += genshi.replace(/,/g, '') + ',';

          //ボラティリティ
          res_text = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[1]').innerText(); 
          resP += res_text.split('\n')[3] + ','; 

          //価格
          res_text = await page.locator('//*[@id="orderContainer"]/div[2]/div[2]/div[2]/div[1]/div/div[1]').innerText(); 

          resP += (res_text.split('\n')[17]).replace(/,/g, '') + ',';//売：注文価格
          resP += (res_text.split('\n')[18]).replace(/,/g, '') + ',';//売：数量
          resP += (res_text.split('\n')[19]).replace(/,/g, '') + ',';//売：合計BTC
          //res += (res_text.split('\n')[14] + ',';//↑
          //res += (res_text.split('\n')[15] + ',';//％
          resP += (res_text.split('\n')[16]).replace(/,/g, '') + ',';//マーク価格
          resP += (res_text.split('\n')[11]).replace(/,/g, '') + ',';//買：注文価格 
          resP += (res_text.split('\n')[12]).replace(/,/g, '') + ',';//買：数量
          resP += (res_text.split('\n')[13]).replace(/,/g, '') + ',';//買：合計BTC

          //残り時間
          res_text = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[11];
          res_text += (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[12];
          let res_txt1 = (await page.locator('//*[@id="quote_list"]').innerText()).split(' ')[13];
          if(res_txt1.indexOf('min') > 0){
            res_text += res_txt1;
          }    
          resP += res_text.split('min')[0] + 'min,'; 

          console.warn(resP);
          console.log(resP);
          if(j == 0){
            await page.waitForTimeout(1000);
          }

        }


      } catch(e) {
        console.error( 'err : ' + e.message );
      } 
    }

  }//for

}//async function put(arrKenrikoushi,dd,mm,yy){
