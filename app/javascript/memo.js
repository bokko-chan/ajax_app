function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {                          //クリック時イベント定義、アロー関数  (引数,...)=>{...関数の本体...}
    const formData = new FormData(document.getElementById("form"));  //フォームに入力された値を取得 new FormData(フォームの要素);
    const XHR = new XMLHttpRequest();                                //非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true);                                //ﾘｸｴｽﾄ初期化(どのようなﾘｸｴｽﾄをするのか指定する) XHR.open( URL , ウィンドウ名 , オプション)
    XHR.responseType = "json";                                       //レスポンス形式を定義 json指定
    XHR.send(formData);                                              //フォームに入力された情報を送信
    XHR.onload = () => {                                             //リクエスト完了時イベント定義(HTMLのメモ部分を描画する処理)、アロー関数
      //200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {                                       //正常終了のHTTPコード200(成功レスポンス)の場合以外は別の処理を行う
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;                                //itemは、レスポンスとして返却されたメモのレコードデータを取得しています
      const list = document.getElementById("list");                  //listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");           //formTextを取得する理由は、メモの入力フォームをリセットするため(リセット対象の要素であるcontentという要素を取得)
      //メモとして描画する部分のHTMLを定義
      const HTML = `                                                 
        <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
      list.insertAdjacentHTML("afterend", HTML);                     //list要素に対しinsertAdjacentHTMLでHTMLを追加.第一引数にafterendを指定で、要素listの直後に挿入できる
      formText.value = "";                                           //メモの入力フォームに入力されたままの文字をリセット
    };
    e.preventDefault();                                              //投稿後非同期で投稿文表示された後、リロードすると同じ投稿がされてしまう(コントローラーcreateアクションとの)重複を防ぐため
  });
}

window.addEventListener("load", memo);