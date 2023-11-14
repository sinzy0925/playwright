// 左に//を付けるとコメント行になります。プログラムから無視されます。
//npx playwright codegen

const { chromium } = require('playwright');//Chromiumというブラウザを使う

(async () => {
  const browser = await chromium.launch({
    //headless: true  //false 画面あり　true 画面なし
    headless: false //false 画面あり　true 画面なし
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const timeout  = 30000;
  page.setDefaultTimeout(timeout);

  //ここまでは、とりあえず書いておくので、説明しません。

  //プログラムを書いていく場所　スタート

  console.log('goto url gooleのサイトへ行く'); //状況を把握するためにログを出力してます。
  await page.goto('https://www.google.co.jp/');//Googleのサイトへ行きます

  await page.waitForTimeout(1000);
  console.log('検索ボックスへgoogleと入力'); 
  await page.getByRole('combobox', { name: '検索' }).fill('google');

  await page.waitForTimeout(1000);
  console.log('エンターキーを押す'); 
  await page.getByRole('combobox', { name: '検索' }).press('Enter');

  await page.waitForTimeout(1000);
  console.log('スクリーンショットを撮る') 
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  console.log('browser.close()');

  //プログラムを書いていく場所　エンド

  //作ったのと逆順で閉じる
  await page.close();
  await context.close();
  await browser.close();

})();

