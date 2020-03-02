/*－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
　ファイル名：clsHRHint.js
　処理名称　：バルーンヒント
　機能　　　：共通コントロール
　作成日　　：2018.08.03 hata
－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
　修正者｜　修正日付　｜　修正概要　
－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
　    　｜            ｜
－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
*/

/*-------------------------------------------------------------------
ここから非公開用
---------------------------------------------------------------------*/
var c_intMargin = 10;   //メッセージ周りの余白(px)
//メッセージ表示位置
var c_intAuto = 0;
var c_intTop = 1;
var c_intBottom = 2;
var c_intLeft = 3;
var c_intRight = 4;
$(function () {
    /* 初期化 */
    subBindBalloonHintEvents();
});

/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： subBindBalloonHintEvents
処　　　理　　： バルーンヒントにイベントを割り当てる
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2018.08.03 hata
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function subBindBalloonHintEvents() {
    //UpdatePanel対応時に二重にイベントが登録されるのを防ぐ
    $(".balloonhint")
        .unbind("mouseenter", objFncGetHintMouseEnterEvent)
        .unbind("mouseleave", objFncGetHintMouseLeaveEvent)
        .hover(objFncGetHintMouseEnterEvent, objFncGetHintMouseLeaveEvent);
}
var objFncGetHintMouseEnterEvent = function (e) {
    /**********************
    マウスオーバー時の処理
    **********************/
    var strToolTip = this.getAttribute("balloonhint");
    var strHtml = "";
    if (strToolTip == null || strToolTip == "") {
        //ツールチップは表示しない
        return false;
    }
    if (this.getAttribute("disabled")) {
        //disabledの時はツールチップを表示しない
        return false;
    }

    //ツールチップ表示用のボックスを生み出す
    strHtml += "<div class='hintbody'>";
    strHtml += "<span class='hintmsg'>";
    strHtml += "<span class='hinttitle'>ヒント</span>";
    strHtml += strToolTip;
    strHtml += "</span>";
    strHtml += "</div>";
    $("body").prepend(strHtml);

    /*--------------
    メッセージ表示
    ----------------*/
    var intImgWidth = $(this).outerWidth(); //バルーンヒントの幅(px)
    var intImgHeight = $(this).outerHeight(); //バルーンヒントの高さ(px)

    //メッセージコンテナとメッセージ表示部分を誌?
    var objHintBody = $("body > div.hintbody");  //メッセージコンテナ
    if (objHintBody == null) {
        return false;
    }
    if (objHintBody.length <= 0) {
        return false;
    }
    var objMsg = objHintBody.find("span.hintmsg");
    if (objMsg == null) {
        return false;
    }
    if (objMsg.length <= 0) {
        return false;
    }
    //メッセージボックスのtopとleftをいったん初期化する
    objMsg.css("left", "");
    objMsg.css("top", "");

    //メッセージからマウスアウトしたときにも、メッセージを消すように設定
    objMsg.hover(null, function () {
        //ヒントを削除
        subRemoveHintBody();
    });

    /*** コンテナの幅を調整 ***/
    var objWindow = $(window);
    var intScreenHeight = objWindow.height();
    var intScreenWidth = objWindow.width();
    var intScrollTop = objWindow.scrollTop();
    var intScrollLeft = objWindow.scrollLeft();
    var intLeftPosition = 0;
    var intTopPosition = 0;
    var objOffset = $(this).offset();
    var intImgLeft = objOffset.left;
    var intImgTop = objOffset.top;
    var intImgRight = intImgLeft + intImgWidth;
    var intImgBottom = intImgTop + intImgHeight;
    var intBodyLeft = 0;
    var intBodyWidth = 0;
    var intIncrementL = 0;
    var intIncrementT = 0;
    var bolShowLeft = (intImgLeft + (intImgWidth / 2) - intScrollLeft > (intScreenWidth / 2));

    //-----------------------------------------------
    //表示位置を選べるようにする
    var intPosition = parseInt(this.getAttribute("hintpos"));
    if (isNaN(intPosition)) {
        intPosition = c_intAuto;
    }
    var bolAdjustTop;
    var bolAdjustLeft;
    switch (intPosition) {
        case c_intTop:
            bolAdjustTop = false;
            bolAdjustLeft = true;
            break;

        case c_intBottom:
            bolAdjustTop = false;
            bolAdjustLeft = true;
            break;

        case c_intLeft:
            bolAdjustTop = true;
            bolAdjustLeft = false;
            //常に左側に表示
            bolShowLeft = true;
            break;

        case c_intRight:
            bolAdjustTop = true;
            bolAdjustLeft = false;
            //常に右側に表示
            bolShowLeft = false;
            break;

        default:
            bolAdjustLeft = true;
            bolAdjustTop = true;
            break;
    }
    //-----------------------------------------------
    //アイコンの位置を取得、ツールチップの表示位置を調整する
    if (intImgRight > intScrollLeft + intScreenWidth) {
        //アイコンの右端が画面からはみ出していた場合、画面右端までしかツールチップは表示しない
        intImgRight = intScrollLeft + intScreenWidth - c_intMargin;
    }
    if (intImgLeft < intScrollLeft) {
        //アイコンがスクロール位置より左から開始していた場合、ツールチップは画面左端から表示する
        intImgLeft = intScrollLeft + c_intMargin;
    }
    if (bolAdjustLeft) {
        if (bolShowLeft) {
            //画面中央より右側にアイコンがある場合は、アイコンの左側にメッセージを表示する
            intBodyLeft = intScrollLeft + c_intMargin;
            intBodyWidth = intImgRight - intBodyLeft - c_intMargin;
        } else {
            intBodyLeft = intImgLeft + c_intMargin;
            intBodyWidth = intScreenWidth - (intBodyLeft - intScrollLeft) - c_intMargin;
        }
    } else {
        //常に左または右に表示する場合
        if (bolShowLeft) {
            //アイコンの左側にメッセージを表示する
            intBodyLeft = intScrollLeft + c_intMargin;
            intBodyWidth = intImgLeft - intBodyLeft;
        } else {
            intBodyLeft = intImgRight + c_intMargin;
            intBodyWidth = intScreenWidth - (intBodyLeft - intScrollLeft) - c_intMargin;
        }
    }
    if (intBodyWidth < 0) {
        intBodyWidth = 0;
    }
    intIncrementL = intBodyLeft - objHintBody.offset().left;    //Leftの増減を取得
    intIncrementT = intImgTop - objHintBody.offset().top;    //Topの増減を取得    
    objHintBody.css({ left: parseFloat(objHintBody.css("left")) + intIncrementL + "px",
        top: parseFloat(objHintBody.css("top")) + intIncrementT + "px",
        width: intBodyWidth + "px"
    });
    /*** メッセージ表示部分の位置調整 ***/
    var intMsgWidth = objMsg.outerWidth();   //コンテナ幅調整後のサイズを取得
    var intMsgHeight = objMsg.outerHeight();
    if (intMsgWidth > intBodyWidth) {
        intMsgWidth = intBodyWidth;
    }
    //-----------------------------------------------
    switch (intPosition) {
        case c_intTop:
            //常に上側に表示
            intTopPosition = intImgTop - intMsgHeight - c_intMargin;
            break;

        case c_intBottom:
            //常に下側に表示
            intTopPosition = intImgBottom + c_intMargin;
            break;

        case c_intLeft:
            //常に左側に表示
            intLeftPosition = (intBodyLeft + intBodyWidth) - intMsgWidth;
            break;

        case c_intRight:
            //常に右側に表示
            intLeftPosition = intBodyLeft;
            break;

        default:
            //以降の処理で位置調整をする
            break;
    }
    //-----------------------------------------------
    if (bolAdjustLeft) {
        //左右の位置調整
        if (intMsgWidth + (intBodyLeft - intScrollLeft) + (c_intMargin * 2) >= intScreenWidth) {
            //横がはみ出る場合
            if (bolShowLeft) {
                intLeftPosition = intBodyLeft;
            } else {
                intLeftPosition = (intScreenWidth + intScrollLeft) - intMsgWidth - (c_intMargin * 2);
            }
        } else {
            if (bolShowLeft) {
                intLeftPosition = intImgRight - intMsgWidth - c_intMargin;
            } else {
                intLeftPosition = intBodyLeft;
            }
        }
    }
    if (bolAdjustTop) {
        //上下の位置調整
        if (intMsgHeight + (intImgBottom - intScrollTop) + (c_intMargin * 2) >= intScreenHeight) {
            //下がはみ出る場合,アイコンの上側にメッセージを表示
            intTopPosition = intImgTop - intMsgHeight - c_intMargin;
        } else {
            intTopPosition = intImgBottom + c_intMargin;
        }
        if (intTopPosition < intScrollTop) {
            //上が途切れる場合
            intTopPosition = intScrollTop + c_intMargin;
        }
    }
    //コンテナに対する絶対位置に変換
    intLeftPosition = intLeftPosition - objHintBody.offset().left;
    intTopPosition = intTopPosition - objHintBody.offset().top;
    //メッセージ表示
    objMsg.css({ left: intLeftPosition + "px",
        top: intTopPosition + "px",
        zIndex: 9999,
        opacity: 0.95
    });
    objMsg.stop(true, true).fadeIn(300);

    //不要なオブジェクトを解放
    delete objChildrenControl;
    delete objHintBody;
    delete objMsg;
    delete objOffset;
    delete objWindow;
}

var objFncGetHintMouseLeaveEvent = function (e) {
        /***********************
        マウスアウト時の処理
        **********************/
        if (e != null) {
            if (e.toElement != null) {
                var strClassName = e.toElement.className;
                if (strClassName == "hintmsg" || strClassName == "hinttitle") {
                    //ヒントにまだフォーカスがあるのでヒントは消さない
                    return false;
                }
            }
        }
        //ヒントを削除
        subRemoveHintBody();
    }

/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： subRemoveHintBody
処　　　理　　： メッセージ表示領域を削除する
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2018.08.03 hata
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function subRemoveHintBody() {
    var objMsgBody = $("body > div.hintbody");
    objMsgBody.find("span.hintmsg")
                  .stop(true, true)
                  .css({ zIndex: 0,
                         display: "none"
                  });
    $(objMsgBody).remove();

    //不要なオブジェクトを解放
    delete objMsgBody;
}