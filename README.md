# playwright

このファイルは、README.mdです。
https://github.com/sinzy0925/playwright
に必要なものは、全て置いてあります。

nodejsとplaywrightを使って
JASRACのWEBサイトから、スクレイピング（プログラムでWEBの情報を取得すること）で、
作品コード、作品タイトル、アーティスト名、作詞者、作曲者
を文字列として取得する方法について説明します。
興味のある人向けに作りましたが、如何せん説明が下手なので、伝わるかどうか、はてな？？です。
これが、理解できて自分で違うWEBサイトから何か情報を取得したくなったら、あなたもプログラマーの仲間入りです。
（ほとんどの人にとっては、必要ない操作だと思います。
　stand.fmという音声配信アプリで必要になる作業を自動化するツールの解説です。）

いきなり全てを自分で書こうとすると、非常に困難です。
以下のステップでやってみましょう。

【事前準備】
1 nodejsのインストール
　https://nodejs.org/en　←ここへアクセスします。
　画面の左側のLTSをクリックして、ダウンロードしてインストールしましょう。
　インストールは、Next押していけば、なんとなくＯＫ！
　01nodejs_install.bat　をダブルクリックしても上記サイトに行けます。

2 コマンドプロンプトを表示させる
　windowsキー + R を押し、「ファイル名を指定して実行」画面の入力欄（名前）に半角で、
　cmdと入力し、ＯＫをクリックすると黒い画面が表示されます。
　その画面で、cd %USERPROFILE%　と入力し、enterする。
　今、表示されているのが、あなたのユーザープロファイルです。
　私の場合は、　C:\Users\yoshinagashinji　です。
　人によって             yoshinagashinji　が、違うはずです。

3 https://github.com/sinzy0925/playwright にアクセスして、playwright-main.zipをダウンロードする。
　https://github.com/sinzy0925/playwright 画面の中央より少し右あたりに
　緑色の <>CODE というところがありますので、クリックします。
　少し下にDownload ZIP が表示されるので、そこをクリックすれば、ダウンロードできます。
　githubからダウンロードした、 playwright-main.zip を解凍し、
　playwright-mainをあなたのユーザープロファイルの下にコピーする。

　ユーザープロファイルが　C:\Users\yoshinagashinji　なら、左の文字列をエクスプローラの上にある、
　フォルダの位置が分かる窓に貼り付けます。
　今、表示してるのが、あなたのユーザープロファイルの位置です。ここへplaywright-mainのフォルダを貼り付けます。
　私の場合は、　C:\Users\yoshinagashinji\playwright-main になります。

4 playwrightのインストール
　上記２で表示した黒い画面に以下の文字列を貼り付けてEnterを押します。
　npm i -D playwright

　分からない場合は、04playwright_install.bat　をダブルクリックすれば、インストールされます。
　（同じことをやってます。）




※前回分かりにくかったと思う、点の復習。
https://github.com/sinzy0925/playwright にアクセスして、
playwright-main.zipをダウンロードする。
ダウンロードしたplaywright-main.zipの中身を自分のユーザープロファイルへコピーする方法。

playwright-main.zipをダブルクリックし、出てきたフォルダをコピーします。
ダウンロードフォルダへ戻り、貼り付けします。すると、ダウンロードフォルダに
playwright-main.zip　と、　playwright-mainフォルダがある状態になります。

その中にある、xcopy_playwrght.batダブルクリックすると、
C:\Users\yoshinagashinji\playwright-mainにデータがコピーされます。
　　　　　yoshinagashinjiは人によって違います。

エクスプローラーの検索窓の左の箱に　%USERPROFILE%　を入れて、Enterを押してください。
そこが、あなたのユーザープロファイルです。そこに、playwright-mainフォルダがありまので、
ダブルクリックして、開いてください。



【アプリの作り方】
5 サンプルアプリを見てみよう
　C:\Users\yoshinagashinji\playwright-mainを開きます。
　　　　　　yoshinagashinjiは人によって違います。
　
　sample_playwright.jsと
　sample_playwright1.jsがありますが同じものです。
　sample_playwright1.jsをダブルクリックすると、メモ帳が開きます。
　//プログラムを書いていく場所　スタート
　//プログラムを書いていく場所　エンド
　の間を確認しましょう。

いろいろ書いてますが、ブラウザにさせることは、以下の５つです。
①https://www.google.co.jp/へ行く
②検索窓に、googleと入れる
③Enterキーを押す
④スクリーンショットを撮る
⑤ブラウザを閉じる

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

  console.log('②検索窓に、googleと入れる');//ログ内容：②検索窓に、googleと入れる
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

こんな流れで、プログラムが動くと理解して、動作を確認しましょう。
05start_sample_playwrght1.bat　をダブルクリックして、
どのように動くか、実際に確認しましょう。



　//プログラムを書いていく場所　スタート
　ここに書かれている命令を全部消す。
　//プログラムを書いていく場所　エンド

　スタートからエンドまでの命令を全部消してください。
　後ほど、以下５で出力される、プログラムをコピーして貼り付けましょう。
　消すのが怖い人は、以下のように/* と*/で無視して欲しいところを囲っても良いです。
　代わりに、自分が実行して欲しいプログラムは、/* と*/に挟まれていない場所に書いてね

　//プログラムを書いていく場所　スタート
　/*  　
　書かれている命令
　*/
　自分のプログラムをここへ書く
　//プログラムを書いていく場所　エンド


6 操作記録ができるブラウザで、webサイトにアクセスする方法を調べる方法を知る。
　npx playwright codegen　を黒い画面で実行するか、
　06npx_playwright_codegen.bat をダブルクリックすれば、ブラウザが起動します。
　少し時間がかかります。
　このブラウザで操作した内容は、ほとんどプログラムコードとして、出力されます。
　録音して再生する見たいな感じです。

7 webサイトでの操作方法を知る
　上記４で立ち上がった、ブラウザの検索窓に、以下のJASRACのURLを貼り付けて、
　Enterを押します。
　https://www2.jasrac.or.jp/eJwid/
　
　画面の一番下の、上記の内容に了承して検索に進むをクリックする。

　検索画面が表示されるので、以下の文字を「作品コード（完全一致）」に貼り付け、
　Enterを押します。
　002-3537-7

　新しいタブができて、そちらに検索結果が表示されます。

　この画面に表示されているのは、作品コード、作品タイトル、下の方にアーティスト名だけです。

　作詞者、作曲者が表示されてませんので、管理状況(利用分野)の所に「配信」があるので、
　「〇」であることを確認して、クリックします。

　すぐ下に、配信　この利用分野は、JASRACが著作権を管理しています。と表示されていればOKです。

　その下に、作詞、作曲が誰か書かれています。

　これで、作品コード、作品タイトル、アーティスト名、作詞者、作曲者が分かりました。

　ここまで操作した内容を、コピーします。

　コピーするのは、？？？画面の？？？から？？？までです。

　コピーした内容を上記３で確認したサンプルアプリの
　//プログラムを書いていく場所　スタート
　//プログラムを書いていく場所　エンド
　の間を一旦消して、そこに、貼り付けます。
　貼り付けて、保存してください。

　※作業結果を確認します。
　07start_sample_playwrght1.bat
　をダブルクリックして画面の動きを確認しましょう。

　最後に、管理状況(利用分野)の所に「配信」をクリックしたつもりですが、クリックされていません。
　プログラムから上手く認識されないようです。
　このような場合の対策は、こんな感じです。
　これは、データを取得する際にも活用するので、要チェックです。
　A．押したい場所のxpathを調べる。
　　xpathの調べ方
　B．xpathの使い方：「配信」をクリックする
　　動画で見てね

8 webサイトのデータを取得する。
　上記５で、欲しい情報（作品コード、作品タイトル、アーティスト名、作詞者、作曲者）は、
　画面に全て表示されました。この画面で、情報を取りに行きます。
　取りたい情報がある場所のxpathを調べて、そのxpathのデータを取得します。
　文字で説明が難しいので、動画で見てね

9 他のWEBサイトから、欲しいデータを取るロジックを自分で考えてみましょう！
　その先には、プログラマーになるためのヒントがあるはず！
　こちらのURLにたくさんの情報があるので、参考に