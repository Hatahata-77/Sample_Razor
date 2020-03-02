/*－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
　ファイル名：clsHRButton.js
　処理名称　：ラウンドボタンコントロール
　機能　　　：共通コントロール
　作成日　　：2018.08.03 hata
  注        ：jQuery.jsが必須です。先にjQuery.jsを読み込んでください。
－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
　修正者｜　修正日付　｜　修正概要　
－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
　    　｜            ｜
－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－*/



/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： subSetButtonDisabled
処　　　理　　： ボタンの使用可否を設定
引　　　数　　： pstrId - ボタンのID
                 pbolDisabled - 使用不可にする場合：true 使用可にする場合：false
戻　り　値　　： なし
作　成　日　　： 2018.08.03 hata
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function subSetButtonDisabled(pstrId, pbolDisabled) {
    var objThis = $("#" + pstrId);
    if (objThis.length <= 0) {
        return;
    }
    var aryTargetClasses = aryFncGetTargetClassNames(objThis[0].className);
    var i = 0;
    if (pbolDisabled) {
        //使用不可にする
        for (i = 0; i < aryTargetClasses.length; i++) {
            if (aryTargetClasses[i] != null) {
                //状態変更対象のクラス
                objThis.addClass(aryTargetClasses[i] + "_d").removeClass(aryTargetClasses[i] + "_n").removeClass(aryTargetClasses[i] + "_f");
            }
        }
        objThis.addClass("hrbutton_d"); //ボタン系のDisabled共通クラス
        objThis[0].disabled = true;
    } else {
        //使用可能にする
        objThis.removeClass("hrbutton_d"); //ボタン系のDisabled共通クラス
        for (i = 0; i < aryTargetClasses.length; i++) {
            if (aryTargetClasses[i] != null) {
                //状態変更対象のクラス
                objThis.addClass(aryTargetClasses[i] + "_n").removeClass(aryTargetClasses[i] + "_d").removeClass(aryTargetClasses[i] + "_f");
            }
        }
        objThis[0].disabled = false;
    }
    delete aryTargetClasses;
    delete objThis;
}
/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： subBindHRButtonEvents
処　　　理　　： ボタンの初期設定を行う
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2018.08.03 hata
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function subBindHRButtonEvents() {
    $("input.hrbutton, input.hrarrbutton, input.hributton")
        .unbind("mouseenter", objFncGetButtonMouseEnter)
        .unbind("mouseleave", objFncGetButtonMouseLeave)
        .hover(objFncGetButtonMouseEnter, objFncGetButtonMouseLeave);
}
var objFncGetButtonMouseEnter = function (e) {
    /**********************
    マウスオーバー時の処理
    **********************/
    var aryTargetClasses = aryFncGetTargetClassNames(this.className);

    /* マウスを当てたときの色に変更 */
    var objThis = $(this);
    for (var i = 0; i < aryTargetClasses.length; i++) {
        if (aryTargetClasses[i] != null) {
            //状態変更対象のクラス
            objThis.addClass(aryTargetClasses[i] + "_f").removeClass(aryTargetClasses[i] + "_n");
        }
    }
}
var objFncGetButtonMouseLeave = function (e) {
    /**********************
    マウスアウト時の処理
    **********************/
    var aryTargetClasses = aryFncGetTargetClassNames(this.className);

    /* 通常時の色に戻す */
    var objThis = $(this);
    for (var i = 0; i < aryTargetClasses.length; i++) {
        if (aryTargetClasses[i] != null) {
            //状態変更対象のクラス
            objThis.addClass(aryTargetClasses[i] + "_n").removeClass(aryTargetClasses[i] + "_f");
        }
    }
}
    
/*-------------------------------------------------------------------
  ここから非公開用
---------------------------------------------------------------------*/
/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： なし（初期表示）
処　　　理　　： ボタンの初期設定
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2018.08.03 hata
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
$(function () {
    /* disabled状態の要素にもhoverイベントがセットされる */
    subBindHRButtonEvents();
});
/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： aryFncGetTargetClassNames
処　　　理　　： 名前を変更するCSSクラス名を取得する
引　　　数　　： pstrClassName - class属性の値
戻　り　値　　： CSSクラスの配列。CSSクラスの数だけ戻される。
　　　　　　　　 配列の順番は、引数で渡されたクラスに対応している。
　　　　　　　　 内容がnullの場合、そのクラスは名前変更対象外。
作　成　日　　： 2018.08.03 hata
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function aryFncGetTargetClassNames(pstrClassName) {
    //設定されているクラス名を取得
    var aryClassNames = pstrClassName.replace(/(?:^[\x09\x0A\x0C\x0D\x20]+)|(?:[\x09\x0A\x0C\x0D\x20]+$)/g, "").split(/[\x09\x0A\x0C\x0D\x20]+/);
    var aryTargetClass = new Array(aryClassNames.length);

    //状態を表す部分以外を取得する。「hrbutton_s_n」なら「hrbutton_s」までを取り出す。
    for (var i = 0; i < aryClassNames.length; i++) {
        if (aryClassNames[i].indexOf("hrbutton_s_") > -1
                   || aryClassNames[i].indexOf("hrbutton_m_") > -1) {
            //背景位置（hrbutton_s, hrbutton_m の2種類）
            aryTargetClass[i] = aryClassNames[i].substr(0, aryClassNames[i].length - 2);

        } else if (aryClassNames[i].indexOf("hrarrbutton_") > -1) {
            //矢印ボタン
            aryTargetClass[i] = aryClassNames[i].substr(0, aryClassNames[i].length - 2);
        } else if (aryClassNames[i].indexOf("hributton_") > -1) {
            //アイコンボタン
            aryTargetClass[i] = aryClassNames[i].substr(0, aryClassNames[i].length - 2);
        } else {
            //状態の変更に関係ないクラス
            aryTargetClass[i] = null;
        }
    }
    return aryTargetClass;
}