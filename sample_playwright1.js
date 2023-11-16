// 左に//を付けるとコメント行になります。プログラムから無視されます。
//npx playwright codegen

const { chromium } = require('playwright');//Chromiumというブラウザを使う

(async () => {
  const browser = await chromium.launch({
    //headless: true  //false 画面あり　true 画面なし
    headless: false //false 画面あり　true 画面なし
  });
  const context = await browser.newContext();//contextを使う宣言をする
  const page = await context.newPage();            //pageを使う宣言をする
  const timeout  = 30000;                    //timeoutを30000ミリ秒に設定する
  page.setDefaultTimeout(timeout);   //デフォルトタイムアウトを30000ミリ秒に設定する。
  await page.setViewportSize({
    width:  750,
    height: 550,
  });//ブラウザの大きさを設定する。

//ここまでは、とりあえず書いておくので、説明しません。

//ブロックでコメントする場合/*　*/で囲う
/*
いろいろ書いてますが、ブラウザにさせることは、以下の５つです。
①https://www.google.co.jp/へ行く
②検索窓に、googleと入れる
③Enterキーを押す
④スクリーンショットを撮る
⑤ブラウザを閉じる
*/

//プログラムを書いていく場所　スタート

  //timeout1を3000ミリ秒(3秒)に設定する。
  //この後この変数を使いまわす。
  let timeout1 = 3000;

  //状況を把握するために黒い画面にログを出力します。　
  //ログ内容：①https://www.google.co.jp/へ行く
  console.log('①https://www.google.co.jp/へ行く'); 
  await page.waitForTimeout(timeout1);//timeout1の時間待つ
  await page.goto('https://www.google.co.jp/');//Googleのサイトへ行きます
  //①https://www.google.co.jp/へ行く

  console.log('②検索窓に、googleと入れる');//ログ内容：③検索窓に、googleと入れる
  await page.waitForTimeout(timeout1);//timeout1の時間待つ
  await page.getByRole('combobox', { name: '検索' }).fill('google');
  //②検索窓に、googleと入れる

  console.log('③Enterキーを押す');//ログ内容：③Enterキーを押す
  await page.waitForTimeout(timeout1);//timeout1の時間待つ
  await page.getByRole('combobox', { name: '検索' }).press('Enter');
  //③Enterキーを押す

  console.log('④スクリーンショットを撮る'); //ログ内容：④スクリーンショットを撮る
  await page.waitForTimeout(timeout1);//timeout1の時間待つ
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  //④スクリーンショットを撮る。フルページで。

  console.log('⑤ブラウザを閉じる。プログラム終わり');//ログ内容：⑤ブラウザを閉じる。プログラム終わり
  await page.waitForTimeout(timeout1);//timeout1の時間待つ

//プログラムを書いていく場所　エンド

//ブロックでコメントする場合/*　*/で囲う
/*
  console.log('プログラム終了');//ログ内容：プログラム終了
  console.log('プログラム終了');//ログ内容：プログラム終了
*/

  //作ったのと逆順で閉じる
  await page.close();
  await context.close();
  await browser.close();
  //⑤ブラウザを閉じる

})();

