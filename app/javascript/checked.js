// pages10/20にそれぞれのコードの役割の解説コピーあり随時参照

function check() {                                       //window.addEventListenerで呼び出すようにしているため、ページを読み込むごとに実行される関数
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {        //addEventListenerが重複して追加されることを回避
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      // 以下にクリックした時に行う「何らかの処理」を記述していく
      const postId = post.getAttribute("data-id");　
      const XHR = new XMLHttpRequest();                 //エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行う
      XHR.open("GET", `/posts/${postId}`, true);　      //openメソッドを使用してリクエストの詳細を指定
      XHR.responseType = "json";                        //responseTypeメソッドでレスポンスの形式を指定
      XHR.send();　                                     //sendメソッドを記述することで、はじめてリクエストが行える
      XHR.onload = () => {                             //XMLHttpRequestで定義されているプロパティで、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;　                                // JavaScriptの処理から抜け出すことができます。これはエラーが出た場合に、16行目以降に記述されている処理を行わないようにすることが目的です。
        }
        const item = XHR.response.post;　               //XHR.responseでレスポンスされてきたJSONにアクセスできます。
        if (item.checked === true){                    //コントローラーcheckedアクションで返却したitemは、XHR.response.postで取得できます
          post.setAttribute("data-check", "true");　   //既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセットします。
        }else if (item.checked === false){            //逆に未読であればdata-checkは属性ごと削除します。
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);                               //一定の時間ごとに、自動でcheckを実行する