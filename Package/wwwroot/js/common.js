// JScript ファイル
/*－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
*　フォーム名：common.js
*　処理名称　：
*　機能　　　：
*　作成者　　：Kwon Tae Kang 2006/09/21
*　注　　　　：
*－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
*　修正者｜　修正日付　｜　修正概要　
*－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
*　大廻　｜ 2011.09.07 ｜V6よりコピー、AjaxclscmnMethod廃止対応
*　谷口　｜ 2012.01.27 ｜西暦を和暦に変換関数追加
*　牧田　｜ 2014.02.28 ｜処理中パネルの表示幅を可変に変更
*　菅田　｜ 2014.07.28 ｜Focus-Hで使っているHRMessageを追加
*　片山　｜ 2015.03.13 ｜replaceが先頭しかできていない不具合を修正
*　牧田　｜ 2015.06.05 ｜サーバーに渡す文字列の置換文字を追加
*　四橋　｜ 2015.07.16 ｜共通Ajax関数をＶ７より移設
*　片山　｜ 2015.07.16 ｜URLエンコードを変換を追加
*　菅田　｜ 2015.09.03 ｜HRMessageを元にHRMessage2を追加
*　大霜　｜ 2017.01.04 ｜新元号対応
*　大霜　｜ 2017.03.10 ｜cmnFncSeirekiToWareki_Nengetuメソッド追加
*　脇本　｜ 2019.02.01 ｜画面サイズをモニターの最大にするメソッド追加
*　牧田　｜ 2019.03.20 ｜ajaxSyncのerrorの処理を変更
*　谷奥　｜ 2019.04.01 ｜改元対応
*－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－－
*/
/*====================================================================
Function List
================ Common Message (alert / confirm)  ===============
//	- bolFncMessageConfirm :  指定されたエラーNo、置き換え文字列の確認ボックスを表示する。2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- subMessageAlert :  指定されたエラーNo、置き換え文字列の警告ボックスを表示する。2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	================ Common Session =================
//	- subSetSession : セッションを登録する。2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- FncGetSession :　セッション値を取得する。2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- FncGetGlobalUser : GlobalUserのセッション値を取得する。2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- subRemoveSession : セッションを破棄する。2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- bolFncIsTimeOut : セッションタイムアウトを確認する。 2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
================ Common Function ===============
- cmnFncTrim : 文字列のスペースを取り除く
- cmnFncRTrim : 文字列の前のスペースを取り除く
- cmnFncLTrim : 文字列の後のスペースを取り除く
- cmnFncZeroSuppress : 文字列の先頭ゼロを取り除く（ゼロのみの場合、最後の１桁を残す）
- cmnFncNumCheck : 入力されたデータをチェック(数字のみ) -- 戻り値 : 無
- cmnFncNumCheck2 : 入力されたデータをチェック(数字のみ) -- 戻り値 : 有
- cmnFncComma : 入力された数字 3桁ごとにコンマ追加(数字だけ入力受ける時使用)
- cmnFncReplace : 入力されたデータの中で特定文字を置き換え
- cmnFncChkZenHan : 入力されたデータに半角、全角が含まれるか？をチェック
- cmnFncHanfromZen : 半角文字列を全角文字列に変換する
- isStringCustom : 対象文章の中で比較対象以外のものがあるかどうか
- inVaidString : 対象文章の中で比較対象があるのかチェック
- isArrayCustom : 対象文章と複数の比較対象以外のものがあるかどうか
- DecimalNumber : 
- cmnFncisDate : 日付の整合性ﾁｪｯｸ
- cmnFncisTime : 時間の整合性ﾁｪｯｸ
- cmnFncSeirekiToWareki : 西暦を和暦に変換  //2012.01.27 ADD taniguchi
================ FSP Speard  ===============
- cmnFncSheetSetAtt : スプレッドのセル属性をセットします。
- cmnFncSheetSeletedLine : 選択したラインの背景色をセットする。
- cmnFncSheetSetValue : スプレットの選択したCellのデータをセット(Cellの状態がreadonlyの場合)
- cmnFncSheetGetValue : スプレットの選択したCellのデータを取得(Cellの状態がreadonlyの場合)
- cmnFncSheetRowUpDown : スプレットの選択したROWを下上に移動する。
- cmnSubSetActiveCell : 指定されたrow,colをアクティブにし、画面の左端にする
- cmnFncSheetGetMultValue : 該当スプレットの中から条件に当たる複数rowのcol値をリターン
- cmnSubSheetToolTip : スプレットの選択したCellのツールチップを設定する。
- cmnSubSheetRowDisplay : スプレットのRowの表示・非表示
- cmnFncMoveMultipleSelectionRows : スプレットの選択したROW(複数行指定可)を上下に移動する。
- cmnFncConditionalExpression : cmnFncMoveMultipleSelectionRows() の for文の条件を処理し、BOOL値を返す
================ Label  ===============
- cmnFncGetLabel :ラベルオブジェクトのデータを取得
- cmnFncSetLabel :ラベルオブジェクトのデータを設定
================ Combo Box  ===============
- cmnFncClearCombo : 既存のコンボボックス内容を削除
- cmnFncComboAdd : コンボボックスに新しいデータ追加
- cmnFncComboSetSelected : 渡したデータと一致すれば選択状態にする
- cmnFncComboGetValue : 現在選択されているコンボボックスのデータを取得
- cmnFncComboGetText : 現在選択されているコンボボックスの表示名を取得
================ Check Box  ===============
- cmnFncSetChecked : 渡したデータでチェックボックスにon/offする.
- cmnFncGetChecked : チェックボックス値を取得 (off : "0"  / on : "1")
================ Radio Button  ===============
- cmnFncRadioGetChecked : 選択されたラジオボタンのインデックス番号(選択されなかったときは 0を返す。)
- cmnFncRadioSetChecked : 
- cmnFncRadioInit : Radio Button 初期化
================ Object Common  ===============
- cmnFncobjDisable : オブジェクトのEnable/Disableを設定
- cmnFncobjVisible : オブジェクトのvisibleを設定(見えることだけ)
- cmnFncobjDisplay : オブジェクトのvisibleを設定(物理的な空間まで)
- cmnFncMaxlen : Text Box 等の最大入力値を設定する。
- cmnSubToolTip : オブジェクトのツールチップを設定する。(ASPのWEB.UIWEBContorls用)
- cmnFncobjColor : オブジェクトの色(背景色/ForeColor)を設定
================ DataSet  ===============
- cmnFncdsGetValue : DataSetで該当のキーの値のデータを取得
- cmnFncdsSetValue : DataSetで該当のキーの値のデータをセットする。
================ Window OPen (Pop window/Modal window ...)  ===============
- cmnFncOpenModal : モーダルウィンドウ(showModalDialog)
- cmnFncOpenModeless ：Modelessウィンドウ(showModelessDialog)
- cmnFncOpenPopup : ポップアップウィンドウ
================ URL Get Paramter  ===============
- ParamValue : Javascript User Class
- cmnFncGetParameter : URL QueryのGet Parameter値を取得
- cmnFncGetParamValue : URL QueryのGet Parameter値で渡したキーの値を取得
================ テーブル関連  ===============
//	- bolFncIsLocked : 参照モードを確認する 2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- cmnFncGetNendo : 渡って来た日付より年度を取得する 2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
//	- cmnSubSetLog : System Logを登録する。 2011.09.07_DEL ohsako AjaxclscmnMethod廃止対応
- subError： エラー時処理（TreeViewのエラー回避）
- strFncHttpPathSet : Httpパスに変換する
	
================ UI関連  ===============
- HRMessage : 個別にメッセージボックスを表示させる
	
================ 共通Ajax関数  ===============
- HRAjax : 共通Ajax関数
	
====================================================================*/

//ﾎﾟｯﾌﾟｱｯﾌﾟ画面表示の設定
var strShowModalDefConfig = ";resizable: No; status: No;help: No;";

var cmn_strRow = "r";

(function ()
{
    if (window.addEventListener)
    {
        window.addEventListener("load", subAddTabIndexToBody, false);
    } else if (window.attachEvent)
    {
        window.attachEvent("onload", subAddTabIndexToBody)
    }
    /*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
    関　数　名　: subAddTabIndexToBody
    処　　　理　: bodyタグにtabindex=-1をセットする
    引　　　数　: なし
    戻　り　値　: なし
    作　成　日　: 2012.12.04 ohsako
    －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
    function subAddTabIndexToBody()
    {
        var i;
        var strTabIndex;
        var attr;
        var bolExist = false;
        var aryBody = document.getElementsByTagName("body");
        if (aryBody)
        {
            for (i = 0; i < aryBody.length; i++)
            {
                //getAttributeだとIE6,7は常に0を返してくるので使いません。
                attr = aryBody[i].getAttributeNode("tabindex");
                bolExist = attr ? attr.specified : false;
                if (!bolExist)
                {
                    //IE6, 7ではsetAttributeで「tabIndex」と
                    //IE8以降とその他ブラウザでは「tabindex」と記述しないと認識してくれないので
                    //setAttributeは使いません。
                    aryBody[i].tabIndex = -1;
                }
            }
        }
    }
})();

// arrayにindexOfを追加
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (searchElement /*, fromIndex */)
    {
        "use strict";

        if (this == null)
        {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;

        if (len === 0)
        {
            return -1;
        }

        var n = 0;

        if (arguments.length > 0)
        {
            n = Number(arguments[1]);

            if (n != n)
            { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity)
            {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        if (n >= len)
        {
            return -1;
        }

        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

        for (; k < len; k++)
        {
            if (k in t && t[k] === searchElement)
            {
                return k;
            }
        }
        return -1;
    }
}

//2017.01.04 Add Ohshimo S  元号が増える際、↓に追加してください。
var c_arrGengo = new Array();
var c_arrSNendo = new Array();
var c_arrENendo = new Array();
//元号
c_arrGengo[0] = "明治";
c_arrGengo[1] = "大正";
c_arrGengo[2] = "昭和";
c_arrGengo[3] = "平成";
//2019.04.01 Add Tanioku S
c_arrGengo[4] = "令和";
//2019.04.01 Add Tanioku E
//元号開始年
c_arrSNendo[0] = "18680908";
c_arrSNendo[1] = "19120730";
c_arrSNendo[2] = "19261225";
c_arrSNendo[3] = "19890108";
//2019.04.01 Add Tanioku S
c_arrSNendo[4] = "20190501";
//2019.04.01 Add Tanioku E
//元号終了年
c_arrENendo[0] = "19120729";
c_arrENendo[1] = "19261224";
c_arrENendo[2] = "19890107";
//2019.04.01 Upd Tanioku S
//c_arrENendo[3] = "99999999";
c_arrENendo[3] = "20190430";
//2019.04.01 Upd Tanioku E
//2019.04.01 Add Tanioku S
c_arrENendo[4] = "99999999";
//2019.04.01 Add Tanioku E
//2017.01.04 Add Ohshimo E


//2011.09.07_DEL_S ohsako Ajax廃止対応
//    /*
//    －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//       関　数　名　　： bolFncMessageConfirm
//       処　　　理　　： 指定されたエラーNo、置き換え文字列の確認ボックスを表示する。
//       引　　　数　　： intMsgNo : Integer メッセージ番号
//                        strRepMsg : String 置き換え文字列
//       戻　り　値　　： OKが選択された:true　キャンセルが選択された:false
//       作　成　日　　： 2006.08.25  Omoda
//    －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//    */
//    function bolFncMessageConfirm(intMsgNo,strRepMsg){
//        var response = AjaxclscmnMethod.strFncMessageConfirm(intMsgNo,strRepMsg);
//        
//        var bolRes = confirm(response.value);
//        
//        return bolRes;
//    }


//    /*
//    －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//       関　数　名　　： subMessageAlert
//       処　　　理　　： 指定されたエラーNo、置き換え文字列の警告ボックスを表示する。
//       引　　　数　　： intMsgNo : Integer メッセージ番号
//                        strRepMsg : String 置き換え文字列
//       戻　り　値　　： 
//       作　成　日　　： 2006.09.01  Omoda
//    －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//    */
//    function subMessageAlert(intMsgNo,strRepMsg){
//	    var response = AjaxclscmnMethod.strFncMessageConfirm(intMsgNo,strRepMsg);
//        
//        alert(response.value);
//    }


//    /*-----------------------------------------------
//	関　数　名　　： subSetSession
//	処　　　理　　： セッションを登録する。
//	引　　　数　　： 
//	                sSession : 該当セッション名
//	                sKey : 該当セッションキー ("ID|NAME|AGE"形式, [key]|[key] )
//	                sVal : 該当セッションデータ ("001|山下|18"形式, [value]|[value] )
//	戻　り　値　　： なし
//    作　成　日　　： 権(グォン) 2006/10/20
//    修　正　日　　： 
//    -------------------------------------------------*/
//    function subSetSession(sSession, sKey, sVal) {
//    
//        //Ajax Call セッション及びセッション値を登録
//        AjaxclscmnMethod.subSetSession(sSession,sKey,sVal);
//        return false;
//    }
//    
//    
//    /*-----------------------------------------------
//	関　数　名　　： FncGetSession
//	処　　　理　　： セッション値を取得する。
//	引　　　数　　： sSession : 該当セッション名
//	戻　り　値　　： hashtable
//    作　成　日　　： 権(グォン) 2006/10/20
//    修　正　日　　： 
//    -------------------------------------------------*/    
//    function FncGetSession(sSession) {
//        var response = AjaxclscmnMethod.htFncGetSession(sSession);
//        //Ajax Call セッション及びセッション値を取得
//        return response.value;
//    }    

//    /*-----------------------------------------------
//	関　数　名　　： FncGetGlobalUser
//	処　　　理　　： GlobalUserのセッション値を取得する。
//	引　　　数　　： sKey - ユーザコード : Sqt_UsrCD / password : Sqt_Pass / ユーザ区分番号 : User_KBN 
//	                                        / Lisencd : Lisence / ユーザ名 : UsName / ユーザ区分 : UsKBN
//	戻　り　値　　： 
//    作　成　日　　： 権(グォン) 2006/10/20
//    修　正　日　　： 権(グォン) 2006/11/20
//    -------------------------------------------------*/
//    function FncGetGlobalUser(sKey) {
//        var result, response;
////        ユーザコード : Sqt_UsrCD / password : Sqt_Pass / ユーザ区分番号 : UserKBN / Lisencd : Lisence / ユーザ名 : UsName / ユーザ区分 : UsKBN
//        response = AjaxclscmnMethod.strFncGetGlobalUser(sKey);
//        result = response.value;
////        if(result == "" && sKey == "Sqt_UsrCD"){ result = "Ryobi"; }
//        return result;
//    } 
//    
//    /*-----------------------------------------------
//	関　数　名　　： subRemoveSession
//	処　　　理　　： セッションを破棄する。
//	引　　　数　　： sSession : 該当セッション名
//	戻　り　値　　： なし
//    作　成　日　　： 権(グォン) 2006/10/20
//    修　正　日　　： 
//    -------------------------------------------------*/    
//    function subRemoveSession(sSession) {
//        AjaxclscmnMethod.subRemoveSession(sSession);
//        return false;
//    }

//
//    /*-----------------------------------------------
//	関　数　名　　： bolFncIsTimeOut
//	処　　　理　　： セッションタイムアウトを確認する。
//	引　　　数　　： なし
//	戻　り　値　　： false : セッション継続中
//	                 true  : タイムアウト
//    作　成　日　　： 2006/12/06　仙波
//    修　正　日　　： 
//    -------------------------------------------------*/    
//    function bolFncIsTimeOut() {
//        var sto = AjaxclscmnMethod.bolFncIsSessionTimeOut();
//        if (sto != null) {
//            if (sto.value == true) {
//                alert('タイムアウトが発生しました。再度ログインをして下さい。');
//                //if (window.opener != null) {           //2007.01.15 del kimu
//                if (window.external.dialogTop != null) {
//                    window.close();
//                } else {
//                    window.top.location.href = strFncHttpPathSet('webForm_Y/Sys_O/Login.aspx');
//                }
//                return true;
//            }
//        }
//        return false;
//    }
//2011.09.07_DEL_E ohsako 

/*-----------------------------------------------
関　数　名　　： cmnFncTrim
処　　　理　　： 文字列のスペースを取り除く
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/12/09
修　正　日　　： 権(グォン) 2006/12/19
-------------------------------------------------*/
function cmnFncTrim(sVal)
{
    var i, result, index;
    //        sVal = sVal.replace(/^\s*/,'').replace(/\s*$/, '');

    result = "";
    index = 0;

    if (sVal == null || sVal == undefined) { result = ""; return result; }

    // 先頭のスペースを取る
    for (i = 0; i < sVal.length; i++)
    {
        if ((sVal.substring(i, i + 1) != ' ') && (sVal.substring(i, i + 1) != '　'))
        {
            if (index == 0) { result = sVal.substring(i, i + 1); }
            else { result = result + sVal.substring(i, i + 1); }
            index = index + 1;
        }
    }

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncRTrim
処　　　理　　： 文字列の前のスペースを取り除く
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/12/19
修　正　日　　： 
-------------------------------------------------*/
function cmnFncRTrim(sVal)
{
    var i, result;

    result = "";

    // 先頭のスペースを取る
    for (i = 0; i < sVal.length; i++)
    {
        if ((sVal.substring(i, i + 1) != ' ') && (sVal.substring(i, i + 1) != '　'))
        {
            result = sVal.substring(i, sVal.length + 1);
            break;
        }
    }

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncLTrim
処　　　理　　： 文字列の後のスペースを取り除く
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/12/19
修　正　日　　： 
-------------------------------------------------*/
function cmnFncLTrim(sVal)
{
    var i, result;

    result = "";

    // 末尾のスペースを取る
    for (i = sVal.length - 1; i >= 0; i--)
    {
        if ((sVal.substring(i, i + 1) != ' ') && (sVal.substring(i, i + 1) != '　'))
        {
            result = sVal.substring(0, i + 1);
            break;
        }
    }

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncZeroSuppress
処　　　理　　： 文字列の先頭ゼロを取り除く（ゼロのみの場合、最後の１桁を残す）
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 2008.04.14 senba
修　正　日　　： 
-------------------------------------------------*/
function cmnFncZeroSuppress(sVal)
{
    var i, result;

    if (sVal.substring(0, 1) != '0')
    {
        return sVal;
    }

    // 先頭のゼロを取る
    for (i = 0; i < sVal.length - 1; i++)
    {
        if (sVal.substring(i, i + 1) != '0')
        {
            result = sVal.substring(i, sVal.length + 1);
            return result;
        }
    }

    result = sVal.substring(i, i + 1);
    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncNumCheck
処　　　理　　： 入力されたデータをチェック(数字のみ)
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/22
修　正　日　　： 
-------------------------------------------------*/
function cmnFncNumCheck(intNumber)
{

    if (intNumber.length == 0) return false;
    if (isNaN(intNumber)) alert("数値を入力してください。");
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncNumCheck2
処　　　理　　： 入力されたデータをチェック(数字のみ)
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/25
修　正　日　　： 
-------------------------------------------------*/
function cmnFncNumCheck2(intNumber)
{
    var result = "OK";
    if (isNaN(intNumber)) result = "数値を入力してください。";
    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncComma
処　　　理　　： 入力された数字 3桁ごとにコンマ追加(数字だけ入力受ける時使用)
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncComma(intNumber)
{
    var txtNumber = "" + cmnFncReplace(intNumber, ",", "");
    var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    var arrNumber = txtNumber.split('.');


    //        if (isNaN(txtNumber) || txtNumber == "") {
    if (isNaN(txtNumber))
    {
        alert("数値を入力してください。");
        return "";

    } else if (txtNumber == "")
    {
        return "";
    } else
    {

        arrNumber[0] += '.';
        do
        {
            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));

        if (arrNumber.length > 1)
        {
            return arrNumber.join('');
        } else
        {
            return arrNumber[0].split('.')[0];
        }
    }
}

/*-----------------------------------------------
関　数　名　　： cmnFncReplace
処　　　理　　： 入力されたデータの中で特定文字を置き換え
特殊文字の場合
$ : ^$ / \ : ^\ / 空白 : s+ 
引　　　数　　： 
Src : 
sTaget : 
sFillter :
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncReplace(Src, sTaget, sFillter)
{
    var result = "";
    result = "" + Src.replace(eval("/" + sTaget + "/g"), sFillter);

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncChkZenHan
処　　　理　　： 全角/半角文字判定
引　　　数　  ： str チェックする文字列
flg 0:半角文字、1:全角文字
戻　り　値　　： true:含まれている、false:含まれていない
作　成　日　　： 山下　2006/12/07
修　正　日　　： 
-------------------------------------------------*/
function cmnFncChkZenHan(str, flg)
{
    for (var i = 0; i < str.length; i++)
    {
        var c = str.charCodeAt(i);
        // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
        // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
        if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4))
        {
            if (!flg) return true;
        } else
        {
            if (flg) return true;
        }
    }
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncHanfromZen
処　　　理　　： 半角文字列を全角文字列に変換する
引　　　数　  ： sVal String 変換元文字列
戻　り　値　　： 
作　成　日　　： 2007.10.26 kwon
修　正　日　　： 
-------------------------------------------------*/
function cmnFncHanfromZen(sVal)
{
    var han, hanChk, i, c, t, result;

    han =
        {
            "a": "ａ", "b": "ｂ", "c": "ｃ", "d": "ｄ", "e": "ｅ", "f": "ｆ", "g": "ｇ", "h": "ｈ", "i": "ｉ", "j": "ｊ", "k": "ｋ", "l": "ｌ", "m": "ｍ",
            "n": "ｎ", "o": "ｏ", "p": "ｐ", "q": "ｑ", "r": "ｒ", "s": "ｓ", "t": "ｔ", "u": "ｕ", "v": "ｖ", "w": "ｗ", "x": "ｘ", "y": "ｙ", "z": "ｚ",
            "A": "Ａ", "B": "Ｂ", "C": "Ｃ", "D": "Ｄ", "E": "Ｅ", "F": "Ｆ", "G": "Ｇ", "H": "Ｈ", "I": "Ｉ", "J": "Ｊ", "K": "Ｋ", "L": "Ｌ", "M": "Ｍ",
            "N": "Ｎ", "O": "Ｏ", "P": "Ｐ", "Q": "Ｑ", "R": "Ｒ", "S": "Ｓ", "T": "Ｔ", "U": "Ｕ", "V": "Ｖ", "W": "Ｗ", "X": "Ｘ", "Y": "Ｙ", "Z": "Ｚ",
            "!": "！", "\"": "”", "#": "＃", "$": "＄", "%": "％", "&": "＆", "'": "’", "(": "（", ")": "）", "=": "＝", "-": "－", "~": "～", "^": "＾",
            "|": "｜", "\\": "￥", "`": "‘", "@": "＠", "{": "｛", "[": "［", "+": "＋", "*": "＊", ";": "；", ":": "：", "]": "］", "}": "｝", "<": "＜",
            ">": "＞", "?": "？", "_": "＿", ",": "，", ".": "．", "/": "／",
            "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９", "0": "０",
            "ｱ": "ア", "ｲ": "イ", "ｳ": "ウ", "ｴ": "エ", "ｵ": "オ",
            "ｶ": "カ", "ｷ": "キ", "ｸ": "ク", "ｹ": "ケ", "ｺ": "コ",
            "ｻ": "サ", "ｼ": "シ", "ｽ": "ス", "ｾ": "セ", "ｿ": "ソ",
            "ﾀ": "タ", "ﾁ": "チ", "ﾂ": "ツ", "ﾃ": "テ", "ﾄ": "ト",
            "ﾅ": "ナ", "ﾆ": "ニ", "ﾇ": "ヌ", "ﾈ": "ネ", "ﾉ": "ノ",
            "ﾊ": "ハ", "ﾋ": "ヒ", "ﾌ": "フ", "ﾍ": "ヘ", "ﾎ": "ホ",
            "ﾏ": "マ", "ﾐ": "ミ", "ﾑ": "ム", "ﾒ": "メ", "ﾓ": "モ",
            "ﾕ": "ユ", "ﾖ": "ヨ", "ﾜ": "ワ", "ｦ": "ヲ", "ﾝ": "ン",
            "ﾗ": "ラ", "ﾘ": "リ", "ﾙ": "ル", "ﾚ": "レ", "ﾛ": "ロ",
            "ｶﾞ": "ガ", "ｷﾞ": "ギ", "ｸﾞ": "グ", "ｹﾞ": "ゲ", "ｺﾞ": "ゴ",
            "ｻﾞ": "ザ", "ｼﾞ": "ジ", "ｽﾞ": "ズ", "ｾﾞ": "ゼ", "ｿﾞ": "ゾ",
            "ﾀﾞ": "ダ", "ﾁﾞ": "ヂ", "ﾂﾞ": "ヅ", "ﾃﾞ": "デ", "ﾄﾞ": "ド",
            "ﾊﾞ": "バ", "ﾋﾞ": "ビ", "ﾌﾞ": "ブ", "ﾍﾞ": "ベ", "ﾎﾞ": "ボ",
            "ﾊﾟ": "パ", "ﾋﾟ": "ピ", "ﾌﾟ": "プ", "ﾍﾟ": "ペ", "ﾎﾟ": "ポ",
            "ｧ": "ァ", "ｨ": "ィ", "ｩ": "ゥ", "ｪ": "ェ", "ｫ": "ォ",
            "ｯ": "ッ", "ｬ": "ャ", "ｭ": "ュ", "ｮ": "ョ", "ｰ": "ー",
            "ﾞ": "゛", "ﾟ": "゜", " ": "　"
        };

    hanChk =
        {
            "ｶ": "カ", "ｷ": "キ", "ｸ": "ク", "ｹ": "ケ", "ｺ": "コ",
            "ｻ": "サ", "ｼ": "シ", "ｽ": "ス", "ｾ": "セ", "ｿ": "ソ",
            "ﾀ": "タ", "ﾁ": "チ", "ﾂ": "ツ", "ﾃ": "テ", "ﾄ": "ト",
            "ﾊ": "ハ", "ﾋ": "ヒ", "ﾌ": "フ", "ﾍ": "ヘ", "ﾎ": "ホ"
        };


    result = "";

    if (sVal == "" || sVal == null || sVal == undefined)
    {
        return "";
    }

    for (i = 0; i < sVal.length; i++)
    {
        c = sVal.charAt(i);
        if (hanChk[c] != undefined)
        {
            if (i + 1 == sVal.length)
            {
                if (han[c] != undefined)
                {
                    result += han[c];
                } else
                {
                    result += c;
                }
            } else
            {
                t = sVal.charAt(i + 1);
                if (t == "ﾞ" || t == "ﾟ")
                {
                    result += han[c + t];
                    i = i + 1;
                } else
                {
                    if (han[c] != undefined)
                    {
                        result += han[c];
                    } else
                    {
                        result += c;
                    }
                }
            }

        } else
        {
            if (han[c] != undefined)
            {
                result += han[c];
            } else
            {
                result += c;
            }

        }

    }
    return result;

}


/*-----------------------------------------------
関　数　名　　： isStringCustom
処　　　理　　： 対象文章の中で比較対象以外のものがあるかどうか
引　　　数　　： 
sVal : 対象文章
comp : 比較対象
戻　り　値　　： true / false
作　成　日　　： 権(グォン) 2006/12/21
修　正　日　　： 
-------------------------------------------------*/
function isStringCustom(sVal, comp)
{
    //        var comp="1234567890-/.";
    for (i = 0; i < sVal.length; i++)
    {
        if (comp.indexOf(sVal.substring(i, i + 1).toUpperCase()) < 0) { return false; }
    }
    return true;
}

/*-----------------------------------------------
関　数　名　　： inVaidString
処　　　理　　： 対象文章の中で比較対象があるのかチェック
引　　　数　　： 
sVal : 対象文章
comp : 比較対象
戻　り　値　　： true / false
作　成　日　　： 権(グォン) 2007/01/31
修　正　日　　： 
-------------------------------------------------*/
function inVaidString(sVal, comp)
{
    for (i = 0; i < sVal.length; i++)
    {
        if (comp == sVal.substring(i, i + 1)) { return false; }
    }
    return true;
}

//SQL文の入力チェックをビハインドで行わせる為に追加 2008.01.15 Add_ST Hara 
/*-----------------------------------------------
関　数　名　　： inValidString
処　　　理　　： 対象文章の中で比較対象があるのかチェック
引　　　数　　： 
sVal : 対象文章
戻　り　値　　： true / false
作　成　日　　： Hara 2008/01/15
修　正　日　　： 
-------------------------------------------------*/
function inValidString(sVal)
{
    var bolCheck;
    bolCheck = AjaxclsOCmnStrCheck.bolFncStrCheck(sVal);
    if (bolCheck.value == false)
    {
        //禁止文字列が使用された場合、Falseを返す
        return false;
    }
    return true;
}
//SQL文の入力チェックをビハインドで行わせる為に追加 2008.01.15 Add_ED Hara 

/*-----------------------------------------------
関　数　名　　： isArrayCustom
処　　　理　　： 対象文章と複数の比較対象以外のものがあるかどうか
引　　　数　　： 
sVal : 対象文章
comp : 比較対象("D2,D3,...")
戻　り　値　　： true / false
作　成　日　　： 権(グォン) 2007.09.05
修　正　日　　： 
-------------------------------------------------*/
function isArrayCustom(sVal, comp)
{
    var i, buff;

    buff = comp.split(",");

    for (i = 0; i < buff.length; i++)
    {
        if (buff[i] == sVal) { return false; }
    }
    return true;
}

/*-----------------------------------------------
関　数　名　　： DecimalNumber
処　　　理　　： 
引　　　数　　： sVal : 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/12/21
修　正　日　　： 
-------------------------------------------------*/
function DecimalNumber(sVal)
{
    var find = true;
    while (find)
    {
        if (sVal.charAt(0) != "0") { find = false; break; }
        if (sVal.length > 1) { sVal = sVal.substring(1); } else { break; }
    }
    return parseInt(sVal, 10);   //2007.12.26 chg kato parseIntの第二引数に10を追加
}

/*-----------------------------------------------
関　数　名　　： cmnFncisDate
処　　　理　　： 日付の整合性ﾁｪｯｸ
引　　　数　　： sVal : 日付(適用可能形式："20061201","2006-12-01","2006/12/01","2006.12.01")
戻　り　値　　： true / false
作　成　日　　： 権(グォン) 2006/12/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncisDate(sVal)
{
    var resultyear, month, day, thisMonth, nextMonth, maxDay;
    result = false;
    year = month = day = 0;
    sVal = cmnFncTrim(sVal);

    if (sVal == "" || sVal.length < 8) { return false; }
    if (isStringCustom(sVal, "1234567890-/.") && sVal.length == 8)
    {
        year = DecimalNumber(sVal.substring(0, 4));
        month = DecimalNumber(sVal.substring(4, 6));
        day = DecimalNumber(sVal.substring(6));
    } else if (isDateNumber(sVal) && sVal.split("-").length == 3)
    {
        year = DecimalNumber(sVal.split("-")[0]);
        month = DecimalNumber(sVal.split("-")[1]);
        day = DecimalNumber(sVal.split("-")[2]);
    } else if (isDateNumber(sVal) && sVal.split("/").length == 3)
    {
        year = DecimalNumber(sVal.split("/")[0]);
        month = DecimalNumber(sVal.split("/")[1]);
        day = DecimalNumber(sVal.split("/")[2]);
    } else if (isDateNumber(sVal) && sVal.split(".").length == 3)
    {
        year = DecimalNumber(sVal.split(".")[0]);
        month = DecimalNumber(sVal.split(".")[1]);
        day = DecimalNumber(sVal.split(".")[2]);
    }

    if (year >= 1900 && (month >= 1 && month <= 12))
    {
        thisMonth = new Date(year, month - 1, 1);
        nextMonth = new Date(year, month, 1);

        maxDay = (nextMonth - thisMonth) / 1000 / 60 / 60 / 24;

        if (day >= 1 && day <= maxDay) { result = true; }
    }

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncisTime
処　　　理　　： 時間の整合性ﾁｪｯｸ
引　　　数　　： sVal : 時間(適用可能形式："1230","12:30", "123030","12:30:30")
戻　り　値　　： true / false
作　成　日　　： 権(グォン) 2006/12/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncisTime(sVal)
{
    var result, nHour, nMinute, nSecond;

    result = false;
    nHour = nMinute = nSecond = -1;

    sVal = cmnFncTrim(sVal);

    if (sVal == "" || sVal.length < 4) { return false; }
    if (isStringCustom(sVal, "1234567890:") && sVal.split(":").length >= 2)
    {
        nHour = DecimalNumber(sVal.split(":")[0]);
        nMinute = DecimalNumber(sVal.split(":")[1]);

        nSecond = 0;
        if (sVal.split(":").length >= 3) { nSecond = DecimalNumber(sVal.split(":")[2]); }
    } else if (isStringCustom(sVal, "1234567890:") && (sVal.length == 4 || sVal.length == 6))
    {
        nHour = DecimalNumber(sVal.substring(0, 2));
        nMinute = DecimalNumber(sVal.substring(2, 4));

        nSecond = 0;
        if (sVal.length == 6) { nSecond = DecimalNumber(sVal.substring(4)); }
    }

    if (nHour >= 0 && nHour <= 23 && nMinute >= 0 && nMinute <= 59 && nSecond >= 0 && nSecond <= 59)
    {
        result = true;
    }

    return result;
}

//2012.01.27_ADD_S taniguchi
/*-----------------------------------------------
関　数　名　　： cmnFncSeirekiToWareki
処　　　理　　： 西暦を和暦に変換
引　　　数　　： pstrSeireki : 西暦("2012")
戻　り　値　　： 和暦年("平成24年")
作　成　日　　： 2012/01/27　taniguchi
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSeirekiToWareki(pstrSeireki)
{
    //2017.01.04 Upd Ohshimo S
    var strReturn = pstrSeireki;
    //	    if (pstrSeireki > 1988){
    //    	    strReturn = "平成" + (pstrSeireki - 1988) + "年";
    //    	}else if(pstrSeireki > 1925){
    //	        strReturn = "昭和" + (pstrSeireki - 1925) + "年";
    //	    }else if(pstrSeireki > 1911){
    //    	    strReturn = "大正" + (pstrSeireki - 1911) + "年";
    //    	}else if(pstrSeireki > 1867){
    //	        strReturn = "明治" + (pstrSeireki - 1867) + "年";
    //	    }
    //        return strReturn;

    for (i = 0; i < c_arrGengo.length; i++)
    {
        if (pstrSeireki >= c_arrSNendo[i].substring(0, 4) && pstrSeireki < c_arrENendo[i].substring(0, 4))
        {
            strReturn = c_arrGengo[i] + (pstrSeireki - c_arrSNendo[i].substring(0, 4) + 1) + "年";
            return strReturn;
        }
    }
    return strReturn;
    //2017.01.04 Upd Ohshimo E	

}
//2012.01.27_ADD_E taniguchi     

//2017.03.10 Add Ohshimo S
/*-----------------------------------------------
関　数　名　　： cmnFncSeirekiToWareki_Nengetu
処　　　理　　： 西暦年月から和暦年に変換
引　　　数　　： pstrSeireki : 西暦("201204")
戻　り　値　　： 和暦年("平成24年")
作　成　日　　： 2017.03.10 Ohshimo
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSeirekiToWareki_Nengetu(pstrSeireki)
{
    var strReturn = pstrSeireki;

    for (i = 0; i < c_arrGengo.length; i++)
    {
        if (pstrSeireki >= c_arrSNendo[i].substring(0, 6) && pstrSeireki <= c_arrENendo[i].substring(0, 6))
        {
            strReturn = c_arrGengo[i] + (pstrSeireki.substring(0, 4) - c_arrSNendo[i].substring(0, 4) + 1) + "年";
            return strReturn;
        }
    }
    return strReturn;
}
//2017.03.10 Add Ohshimo E   

/*-----------------------------------------------
関　数　名　　： cmnFncSheetSetAtt
処　　　理　　： スプレッドのセル属性をセットします。
引　　　数　　： 
obj : fsp spread object
iRow : row index
iCol : col index
iFlag : 1: FpCellType / 2: backgroundColor / 3: color
sVal : 該当する値
FpCellTypeの場合 : "1"-> "Normal", "2"-> "readonly"
色の場合 : 該当する色
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSheetSetAtt(obj, iRow, iCol, iFlag, sVal)
{
    var rowcnt, colcnt;
    // 指定されたrowがスプレットの範囲を超えた時の処理追加
    rowcnt = obj.GetRowCount();
    if (iRow == -1 || iRow >= rowcnt) { return false; }
    //-------- 2007.08.17 kwon ADD start ----------
    // 指定されたcolがスプレットの範囲を超えた時の処理追加
    colcnt = obj.GetColCount();
    if (iCol == -1 || iCol >= colcnt) { return false; }
    //-------- 2007.08.17 kwon ADD end ----------

    switch (iFlag)
    {
        case 1:  //FpCellTypeの場合 : "1"-> "Normal", "2"-> "readonly"
            if (sVal == "1" || sVal == 1) sVal = "Normal";
            else sVal = "readonly";
            obj.GetCellByRowCol(iRow, iCol).setAttribute("FpCellType", sVal);
            break;
        case 2: //backgroundColor
            obj.GetCellByRowCol(iRow, iCol).bgColor = sVal;
            obj.GetCellByRowCol(iRow, iCol).style.backgroundColor = sVal;
            break;
        case 3: // Forecolor

            obj.GetCellByRowCol(iRow, iCol).style.color = sVal;
            break;
    }

    return false;

}

/*-----------------------------------------------
関　数　名　　： cmnFncSheetSeletedLine
処　　　理　　： 選択したラインの背景色をセットする。
引　　　数　　： 
obj : fsp spread object
iRow : row index
iCol : 開始列のインデックスを表す整数 
iColCount : 選択領域の列数を表す整数
iFlag : 1: FpCellType + backgroundColor / 2: backgroundColor  / 3: FpCellType + forecolor / 4: forecolor
sVal : 該当する色
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSheetSeletedLine(obj, iRow, iCol, iColCount, iFlag, sVal)
{
    var i, rowcnt, colcnt;
    // 指定されたrowがスプレットの範囲を超えた時の処理追加
    rowcnt = obj.GetRowCount();
    if (iRow == -1 || iRow >= rowcnt) { return false; }
    //-------- 2007.08.17 kwon ADD start ----------
    // 指定されたcolがスプレットの範囲を超えた時の処理追加
    colcnt = obj.GetColCount();
    if (iCol == -1 || iCol >= colcnt) { return false; }
    //-------- 2007.08.17 kwon ADD end ----------

    switch (iFlag)
    {
        case 1:
            for (i = iCol; i < iCol + iColCount; i++)
            {
                obj.GetCellByRowCol(iRow, i).setAttribute("FpCellType", "Normal");
                obj.GetCellByRowCol(iRow, i).bgColor = sVal;
                obj.GetCellByRowCol(iRow, i).style.backgroundColor = sVal;
                obj.GetCellByRowCol(iRow, i).setAttribute("FpCellType", "readonly");
            }
            break;
        case 2: //backgroundColor
            //                obj.GetCellByRowCol(iRow,iCol).bgColor = sVal;
            for (i = iCol; i < iCol + iColCount; i++)
            {
                obj.GetCellByRowCol(iRow, i).bgColor = sVal;
                obj.GetCellByRowCol(iRow, i).style.backgroundColor = sVal;
            }
            break;
        case 3: // Forecolor
            for (i = iCol; i < iCol + iColCount; i++)
            {
                obj.GetCellByRowCol(iRow, i).setAttribute("FpCellType", "Normal");
                obj.GetCellByRowCol(iRow, i).style.color = sVal;
                obj.GetCellByRowCol(iRow, i).setAttribute("FpCellType", "readonly");
            }
            break;
        case 4: // Forecolor
            for (i = iCol; i < iCol + iColCount; i++)
            {
                obj.GetCellByRowCol(iRow, i).style.color = sVal;
            }
            break;
    }

    return false;

}

/*-----------------------------------------------
関　数　名　　： cmnFncSheetSetValue
処　　　理　　： スプレットの選択したCellのデータをセット(Cellの状態がreadonlyの場合)
引　　　数　　： 
obj : 該当スプレット
iRow : 指定されたrow
iCol : 指定されたcol
sVal : セットするデータ
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/22
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSheetSetValue(obj, iRow, iCol, sVal)
{
    var rowcnt, colcnt;
    // 指定されたrowがスプレットの範囲を超えた時の処理追加
    rowcnt = obj.GetRowCount();
    if (iRow == -1 || iRow >= rowcnt) { return false; }
    //-------- 2007.08.17 kwon ADD start ----------
    // 指定されたcolがスプレットの範囲を超えた時の処理追加
    colcnt = obj.GetColCount();
    if (iCol == -1 || iCol >= colcnt) { return false; }
    //-------- 2007.08.17 kwon ADD end ----------

    if (sVal == null) sVal = " ";

    obj.GetCellByRowCol(iRow, iCol).setAttribute("FpCellType", "Normal");
    obj.SetValue(iRow, iCol, sVal);
    obj.GetCellByRowCol(iRow, iCol).setAttribute("FpCellType", "readonly");

    return false;
}


/*-----------------------------------------------
関　数　名　　： cmnFncSheetGetValue
処　　　理　　： スプレットの選択したCellのデータを取得(Cellの状態がreadonlyの場合)
引　　　数　　： 
obj : 該当スプレット
iRow : 指定されたrow
iCol : 指定されたcol
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/22
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSheetGetValue(obj, iRow, iCol)
{
    var result = "";
    var rowcnt, colcnt;
    // 指定されたrowがスプレットの範囲を超えた時の処理追加
    rowcnt = obj.GetRowCount();
    if (iRow == -1 || iRow >= rowcnt) { return result; }
    //-------- 2007.08.17 kwon ADD start ----------
    // 指定されたcolがスプレットの範囲を超えた時の処理追加
    colcnt = obj.GetColCount();
    if (iCol == -1 || iCol >= colcnt) { return result; }
    //-------- 2007.08.17 kwon ADD end ----------
    obj.GetCellByRowCol(iRow, iCol).setAttribute("FpCellType", "Normal");
    result = obj.GetValue(iRow, iCol);
    obj.GetCellByRowCol(iRow, iCol).setAttribute("FpCellType", "readonly");

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncSheetRowUpDown
処　　　理　　： スプレットの選択したROWを下上に移動する。
引　　　数　　： 
obj : 該当スプレット
sVal : 下上に移動の変数　- "UP" / "DOWN"
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/27
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSheetRowUpDown(obj, sVal)
{

    var row = obj.ActiveRow;
    var col = obj.ActiveCol;
    var i, index, buff1, buff2;
    var taget = "";
    var select = "";
    var rowcnt = obj.GetRowCount();
    var colcnt = obj.GetColCount();

    if (sVal == "UP") index = row - 1;
    else index = row + 1;

    if ((index < 0) || (rowcnt == index) || (row == -1))
    {
        return false;
    } else if ((cmnFncSheetGetValue(obj, index, 1) == "") || (cmnFncSheetGetValue(obj, row, 1) == ""))
    {
        return false;
    }

    for (i = 0; i < colcnt; i++)
    {
        if (i == 0)
        {
            select = cmnFncSheetGetValue(obj, row, i);
        } else
        {
            select = select + "|" + cmnFncSheetGetValue(obj, row, i);
        }
    }

    for (i = 0; i < colcnt; i++)
    {
        if (i == 0)
        {
            taget = cmnFncSheetGetValue(obj, index, i);
        } else
        {
            taget = taget + "|" + cmnFncSheetGetValue(obj, index, i);
        }
    }

    buff1 = select.split('|');
    buff2 = taget.split('|');

    for (i = 0; i < buff1.length; i++)
    {
        cmnFncSheetSetValue(obj, index, i, buff1[i]);
    }

    for (i = 0; i < buff2.length; i++)
    {
        cmnFncSheetSetValue(obj, row, i, buff2[i]);
    }

    //         cmnSubSetActiveCell(obj,index,0);

    return false;

}

/*-----------------------------------------------
関　数　名　　： cmnSubSetActiveCell
処　　　理　　： 指定されたrow,colをアクティブにし、画面の左端にする
引　　　数　　： 
obj : 該当スプレット
iRow : 指定されたrow
iCol : 指定されたcol
戻　り　値　　： なし
作　成　日　　： 権(グォン) 2006/09/28
修　正　日　　： 
-------------------------------------------------*/
function cmnSubSetActiveCell(obj, iRow, iCol)
{
    var i, cell, rowHeader, colHeader, view;
    obj.SetActiveCell(iRow, iCol);
    cell = obj.GetCellByRowCol(iRow, iCol);
    rowHeader = obj.all(obj.id + "_rowHeader");
    colHeader = obj.all(obj.id + "_colHeader");
    view = obj.all(obj.id + "_view");

    if (cell == null) { return; }      //cellがnull時に処理が止まるので、nullチェックの追加    2008.02.04  Add Hara
    if (view == null) { return; }

    view.scrollTop = cell.offsetTop;
    view.scrollLeft = cell.offsetLeft;

    if (rowHeader != null) { rowHeader.scrollTop = view.scrollTop; }
    if (colHeader != null) { colHeader.scrollLeft = view.scrollLeft; }

    return;
}

/*-----------------------------------------------
関　数　名　　： cmnFncSheetGetMultValue
処　　　理　　： 該当スプレットの中から条件に当たる複数rowのcol値をリターン
引　　　数　　： 
obj : 該当スプレット
sChkval : 検索条件
iChkindex :　検索 col index
iValueindex : pk col index
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/28
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSheetGetMultValue(obj, sChkval, iChkindex, iValueindex)
{
    var i, rowcnt, index, result, temp;
    result = "";
    rowcnt = obj.GetRowCount();
    index = 0;
    for (i = 0; i < rowcnt; i++)
    {
        temp = cmnFncSheetGetValue(obj, i, iValueindex);
        if (temp == "") { break; }
        if (cmnFncSheetGetValue(obj, i, iChkindex) == sChkval)
        {
            if (index == 0) result = cmnFncSheetGetValue(obj, i, iValueindex);
            else result = result + "," + cmnFncSheetGetValue(obj, i, iValueindex);
            index = index + 1;
        }

    }
    return result;
}


/*-----------------------------------------------
関　数　名　　： cmnSubSheetToolTip
処　　　理　　： スプレットの選択したCellのツールチップをセットする。
引　　　数　　： 
obj : 該当スプレット
iRow : ツールチップを設定したいセルの行番号
iCol : ツールチップを設定したいセルの列番号
sVal : ツールチップを設定したいツールチップの内容
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/06
修　正　日　　： 
-------------------------------------------------*/
function cmnSubSheetToolTip(obj, iRow, iCol, sVal)
{
    var objCell;

    objCell = obj.GetCellByRowCol(iRow, iCol);
    objCell.title = sVal;
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnSubSheetRowDisplay
処　　　理　　： スプレットのRowの表示・非表示する。
引　　　数　　： 
obj : 該当スプレット
iRow : ツールチップを設定したいセルの行番号
sFlag : visibleの値 (true / false)
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/10
修　正　日　　： 
-------------------------------------------------*/
function cmnSubSheetRowDisplay(obj, iRow, sFlag)
{
    var objCell, objRow, flag;

    if (sFlag == true) { flag = "block"; }
    else if (sFlag == false) { flag = "none"; }

    objCell = obj.GetCellByRowCol(iRow, 0);
    objRow = objCell.parentElement;
    objRow.style.display = flag;
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncMoveMultipleSelectionRows
処　　　理　　： 1. スプレットの選択したROW(複数行指定可)を上下に移動する。
2. [sCol]を指定した場合は、指定したカラムのみが上下移動する。
引　　　数　　：obj 		: 該当スプレット
sVal		: 下上に移動の変数　- "UP" / "DOWN"
sCol        : 対象列(Index) ※指定なし = -1
bolMultiSort: 複数選択のソートが必要な場合　- true / false
戻　り　値　　： 
作　成　者　　： 栢野
作　成　日　　： 2006/10/31
修　正　日　　： 
-------------------------------------------------*/
function cmnFncMoveMultipleSelectionRows(obj, sVal, sCol, sbolMultiSort)
{

    var TargetRow;
    var SelectedRow;
    var i, j, buff1, buff2;
    //        var intColSpecify = parseInt(sCol);
    var target = "";
    var select = "";
    var rowcnt = obj.GetRowCount();
    var colcnt = obj.GetColCount();

    var bolNextRow = false;         // 処理対象(選択)行を示すBOOL値
    var intBigLoop;                 // デカループ・カウンタ
    var intDefault;                 // ループカウント初期値
    var intJudge;                   // ループ離脱条件値(右辺)
    var intIncDec;                  // インクリメント値、またはデクリメント値

    // 選択範囲を取得する
    var range = obj.GetSelectedRanges();
    var arrSelectedRow = new Array();

    // 選択中の行番号を取得し、配列に設定する
    for (i = 0; i < range.length; i++)
    {
        arrSelectedRow.push(range[i].row);
    }

    if (sVal == "UP")
    {
        intDefault = 0; intJudge = rowcnt; intIncDec = -1;
    } else
    {
        intDefault = rowcnt; intJudge = 0; intIncDec = 1;
    }

    // 有効行数分ループする(Pagerﾎﾞﾀﾝを表示している場合、Pager設定値分ループする)
    for (intBigLoop = intDefault; cmnFncConditionalExpression(sVal, intBigLoop, intJudge); intBigLoop += -intIncDec)
    {

        // 選択行でない場合、処理を抜ける
        for (j = 0; j < arrSelectedRow.length; j++)
        {
            if (intBigLoop == arrSelectedRow[j])
            {
                SelectedRow = arrSelectedRow[j];
                bolNextRow = true;
                break;
            }
        }

        if (bolNextRow)
        {

            // 「上へ」 は、１つ上の行を移動先とし、「下へ」は、１つ下の行を移動先とする
            if (sVal == "UP") TargetRow = SelectedRow - 1;
            else TargetRow = SelectedRow + 1;

            if ((TargetRow < 0) || (rowcnt == TargetRow) || (SelectedRow == -1))
            {
                return false;
            }
            //            else if ((cmnFncSheetGetValue(obj,TargetRow,1) == "")||(cmnFncSheetGetValue(obj,SelectedRow,1) == "")){
            //                return false;
            //            }

            // カラム指定あり
            if (sCol >= 0)
            {
                select = cmnFncSheetGetValue(obj, SelectedRow, sCol);
                target = cmnFncSheetGetValue(obj, TargetRow, sCol);

                cmnFncSheetSetValue(obj, TargetRow, sCol, select);
                cmnFncSheetSetValue(obj, SelectedRow, sCol, target);

            } else
            {

                // 選択側
                for (i = 0; i < colcnt; i++)
                {
                    // １行目(row=0)
                    if (i == 0)
                    {
                        select = cmnFncSheetGetValue(obj, SelectedRow, i);
                    } else
                    {
                        select += "|" + cmnFncSheetGetValue(obj, SelectedRow, i);
                    }
                }

                // 移動先
                for (i = 0; i < colcnt; i++)
                {
                    // １行目(row=0)
                    if (i == 0)
                    {
                        target = cmnFncSheetGetValue(obj, TargetRow, i);
                    } else
                    {
                        target += "|" + cmnFncSheetGetValue(obj, TargetRow, i);
                    }
                }

                buff1 = select.split('|');
                buff2 = target.split('|');

                for (i = 0; i < buff1.length; i++)
                {
                    cmnFncSheetSetValue(obj, TargetRow, i, buff1[i]);
                }

                for (i = 0; i < buff2.length; i++)
                {
                    cmnFncSheetSetValue(obj, SelectedRow, i, buff2[i]);
                }
            }
        }

        bolNextRow = false;

        //        if (sCol >= 0) return false;
        //        cmnSubSetActiveCell(obj,arrSelectedRow[0],0);

    }

    return false;
}


/*-----------------------------------------------
関　数　名　　： cmnFncConditionalExpression
処　　　理　　： common.js の関数、cmnFncMoveMultipleSelectionRows() の for文の条件を処理し、BOOL値を返す
引　　　数　　： 
sVal		: 下上に移動の変数　- "UP" / "DOWN"
sBigLoop        : 対象列(Index)
sJudge  : キーとなる最初のカラム番号
戻　り　値　　： boolean型
作　成　者　　： 栢野
作　成　日　　： 2006/11/02
修　正　日　　： 
-------------------------------------------------*/
function cmnFncConditionalExpression(sVal, sBigLoop, sJudge)
{
    if (sVal == "UP")
    {
        if (sBigLoop < sJudge) return true;
        else return false;
    } else
    {
        if (sBigLoop + 1 > sJudge) return true;
        else return false;
    }
}

/*-----------------------------------------------
関　数　名　　： cmnFncGetLabel
処　　　理　　： ラベルオブジェクトのデータを取得
引　　　数　　： 
obj : 該当オブジェクト
戻　り　値　　： 
作　成　日　　： 権(グォン) 2007/02/17
修　正　日　　： 
-------------------------------------------------*/
function cmnFncGetLabel(obj)
{
    var result;
    result = obj.outerText;
    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncSetLabel
処　　　理　　： ラベルオブジェクトのデータ設定
引　　　数　　： 
obj : 該当オブジェクト
sVal :
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSetLabel(obj, sVal)
{
    obj.innerHTML = sVal;
    //        obj.innerText = sVal;
    return false;
}


/*-----------------------------------------------
関　数　名　　： cmnFncClearCombo
処　　　理　　： 既存のコンボボックス内容を削除
引　　　数　　：  obj : 該当オブジェクト
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncClearCombo(obj)
{
    obj.innerHTML = "";
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncComboAdd
処　　　理　　： コンボボックスに新しいデータ追加
引　　　数　　： 
obj : 該当オブジェクト
index : 追加
sText : 
sValue : 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncComboAdd(obj, index, sText, sValue)
{

    obj.options[index] = new Option(sText, sValue);

    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncComboAdd2
処　　　理　　： コンボボックスに新しいデータ追加
引　　　数　　： 
obj : 該当オブジェクト
sText : 
sValue : 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2007/03/02
修　正　日　　： 
-------------------------------------------------*/
function cmnFncComboAdd2(obj, sText, sValue)
{
    var index = obj.length;
    obj.options[index] = new Option(sText, sValue);

    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncComboSetSelected
処　　　理　　： 渡したデータと一致すれば選択状態にする
引　　　数　　： 
obj : 該当オブジェクト
sVal : 渡したデータ
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/22
修　正　日　　： 
-------------------------------------------------*/
function cmnFncComboSetSelected(obj, sVal)
{
    var temp_value = "";
    if (sVal == null) sVal = "";

    for (i = 0; i < obj.length; i++)
    {
        temp_value = obj.options[i].value;
        if (temp_value == sVal)
        {
            obj.selectedIndex = i;
            break;
        }
    }

    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncComboGetValue
処　　　理　　： 現在選択されているコンボボックスのデータを取得
引　　　数　　： obj : 該当オブジェクト
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/26
修　正　日　　： 
-------------------------------------------------*/
function cmnFncComboGetValue(obj)
{
    var index = obj.selectedIndex;
    if (index == -1) { return ""; }
    var result = obj.options[index].value;

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncComboGetText
処　　　理　　： 現在選択されているコンボボックスの表示名を取得
引　　　数　　： obj : 該当オブジェクト
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/30
修　正　日　　： 
-------------------------------------------------*/
function cmnFncComboGetText(obj)
{
    var index = obj.selectedIndex;
    var result = obj.options[index].text;

    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncSetChecked
処　　　理　　： 渡したデータでチェックボックスにon/offする.
引　　　数　　： 
obj : 該当オブジェクト
sVal : 渡したデータ ("0" : off / "1" : on)
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/26
修　正　日　　： 
-------------------------------------------------*/
function cmnFncSetChecked(obj, sChk)
{
    if ((sChk == false) || (sChk == "0"))
    {
        obj.checked = false;
    } else if ((sChk == true) || (sChk == "1"))
    {
        obj.checked = true;
    }
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncGetChecked
処　　　理　　： チェックボックス値を取得 (off : "0"  / on : "1")
引　　　数　　： obj : 該当オブジェクト
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/26
修　正　日　　： 
-------------------------------------------------*/
function cmnFncGetChecked(obj)
{
    var result;
    if (obj.checked == false)
    {
        result = "0";
    } else
    {
        result = "1";
    }
    return result;
}

/*-----------------------------------------------
関　数　名　　：cmnFncRadioGetChecked
処　　　理　　： 選択されたラジオボタンのインデックス番号(選択されなかったときは 0を返す。)
引　　　数　　： 
戻　り　値　　： 
作　成　日　　：  権(グォン) 2006/11/03
修　正　日　　： 
-------------------------------------------------*/
function cmnFncRadioGetChecked(obj)
{
    var i, result;
    result = 0;
    for (i = 0; i < obj.length; i++)
    {
        if (obj[i].checked == true)
        {
            result = i;
            break;
        }
    }
    return result;
}

/*-----------------------------------------------
関　数　名　　：cmnFncRadioSetChecked
処　　　理　　： 
引　　　数　　： 
戻　り　値　　： 
作　成　日　　：  権(グォン) 2006/11/03
修　正　日　　： 
-------------------------------------------------*/
function cmnFncRadioSetChecked(obj, index)
{
    obj[index].checked = true;
    return false;
}

/*-----------------------------------------------
関　数　名　　：cmnFncRadioInit
処　　　理　　： 
引　　　数　　： 
戻　り　値　　： 
作　成　日　　：  権(グォン) 2006/11/03
修　正　日　　： 
-------------------------------------------------*/
function cmnFncRadioInit(obj)
{
    var i;
    for (i = 0; i < obj.length; i++)
    {
        obj[i].checked = false;
    }
    return false;
}


/*-----------------------------------------------
関　数　名　　： cmnFncobjDisable
処　　　理　　： オブジェクトのEnable/Disableを設定
引　　　数　　： 
obj : 該当オブジェクト
sFlag : Enable/Disableの値　
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/21
修　正　日　　： 
-------------------------------------------------*/
function cmnFncobjDisable(obj, sFlag)
{

    if (sFlag == true || sFlag == "true")
    {
        sFlag = true;
    } else
    {
        sFlag = false;
    }
    // sFlag = true / false
    obj.disabled = sFlag;

    return false;
}


/*-----------------------------------------------
関　数　名　　： cmnFncobjVisible
処　　　理　　： オブジェクトのvisibleを設定(見えることだけ)
引　　　数　　： 
obj : 該当オブジェクト
sFlag : visibleの値 (true / false)
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/08
修　正　日　　： 
-------------------------------------------------*/
function cmnFncobjVisible(obj, sFlag)
{
    // sFlag = true / false
    if (sFlag == true)
    {
        //            obj.style.visibility = "hide"; //NS
        obj.style.visibility = "visible"; //IE
    } else
    {
        //            obj.style.visibility = "show"; //NS
        obj.style.visibility = "hidden"; //IE
    }
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncobjDisplay
処　　　理　　： オブジェクトのvisibleを設定(物理的な空間まで)
引　　　数　　： 
obj : 該当オブジェクト
sFlag : visibleの値 (true / false)
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/08
修　正　日　　： 
-------------------------------------------------*/
function cmnFncobjDisplay(obj, sFlag)
{
    // sFlag = true / false
    if (sFlag == true)
    {
        obj.style.display = "block";
    } else
    {
        obj.style.display = "none";
    }
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncMaxlen
処　　　理　　： Text Box 等の最大入力値を設定する。
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/22
修　正　日　　： 
-------------------------------------------------*/
function cmnFncMaxlen(obj, iVal)
{
    obj.maxLength = iVal;
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnSubToolTip
処　　　理　　： オブジェクトのツールチップを設定する。(ASPのWEB.UIWEBContorls用)
( 一般 HTML Controlの場合該当のControl tagに title=""を追加した後使う。)
引　　　数　　： 
obj : 該当オブジェクト
sVal : ツールチップを設定したいツールチップの内容
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/07
修　正　日　　： 
-------------------------------------------------*/
function cmnSubToolTip(obj, sVal)
{

    obj.title = sVal;
    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncobjColor
処　　　理　　： オブジェクトの色(背景色/ForeColor)を設定
引　　　数　　： 
obj : 該当オブジェクト
sFlag : 1: 背景色 / 2 : ForeColor(文字色)
sVal : 色
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/11/12
修　正　日　　： 
-------------------------------------------------*/
function cmnFncobjColor(obj, sFlag, sVal)
{
    if (sFlag == 1 || sFlag == "1")
    {
        obj.style.backgroundColor = sVal;
    } else
    {
        obj.style.color = sVal;
    }

    return false;
}

/*-----------------------------------------------
関　数　名　　： cmnFncdsGetValue
処　　　理　　： DataSetで該当のキーの値のデータを取得
引　　　数　　： 
obj : 該当オブジェクト (DataSet Object)
iRow : 該当 row index
sKey : 該当のキーの値
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/09/22
修　正　日　　： 
-------------------------------------------------*/
function cmnFncdsGetValue(obj, iRow, sKey)
{
    var rowcnt, result;
    result = "";
    //        rowcnt = obj.Tables[0].Rows.length; //2007.08.31 kwon DEL
    //        if(isNaN(sKey) == true){
    //            result = eval("obj.Tables[0].Rows[" + iRow + "]['" + sKey + "']");
    //        }else{
    //            result = eval("obj.Tables[0].Rows[" + iRow + "][" + sKey + "]");
    //        }

    if (obj == null || obj == undefined) { return result; }
    if (obj.Tables[0] == null || obj.Tables[0] == undefined) { return result; }     //ROWがNULL、undefined時に停止するので、チェックを追加  2008.01.29  Add Hara
    rowcnt = obj.Tables[0].Rows.length; //2007.08.31 kwon ADD
    if (iRow == -1 || iRow >= rowcnt) { return result; }

    if (isNaN(sKey) == false)
    {
        result = obj.Tables[0].Rows[iRow][obj.Tables[0].Columns[sKey].Name];
    } else
    {
        result = obj.Tables[0].Rows[iRow][sKey];
    }
    if (result == null) result = "";
    return result;
}

/*-----------------------------------------------
関　数　名　　： cmnFncdsSetValue
処　　　理　　： DataSetで該当のキーの値のデータをセットする。
引　　　数　　： 
obj : 該当オブジェクト (DataSet Object)
iRow : 該当 row index
sKey : 該当のキーの値
sVal : セットするデータ
戻　り　値　　： obj : 該当オブジェクト (DataSet Object)
作　成　日　　： 権(グォン) 2007/01/18
修　正　日　　： 
-------------------------------------------------*/
function cmnFncdsSetValue(obj, iRow, sKey, sVal)
{
    var rowcnt;
    //        rowcnt = obj.Tables[0].Rows.length; //2007.08.31 kwon DEL

    if (obj == null || obj == undefined) { return obj; }
    rowcnt = obj.Tables[0].Rows.length; //2007.08.31 kwon ADD
    if (iRow == -1 || iRow >= rowcnt) { return obj; }

    if (isNaN(sKey) == false) { obj.Tables[0].Rows[iRow][obj.Tables[0].Columns[sKey].Name] = sVal; }
    else { obj.Tables[0].Rows[iRow][sKey] = sVal; }
    return obj;
}

/*-----------------------------------------------
関　数　名　　： cmnFncOpenModal
処　　　理　　： モーダルウィンドウ
引　　　数　　： (引受は必要なことだけ入れれば良い。)					
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/10/11
修　正　日　　： 
-------------------------------------------------*/
function cmnFncOpenModal(sURL, sWidth, sHeight, sResize, sTop, sLeft)
{

    var sFeatures = new Array();

    sFeatures[0] = (sWidth > 0) ? "dialogWidth:" + sWidth + "px" : "dialgWidth:600px";
    sFeatures[1] = (sHeight > 0) ? "dialogHeight:" + sHeight + "px" : "dialogHeight:450px";
    sFeatures[2] = (sTop > 0) ? "dialogTop:" + sTop + "px" : "";
    sFeatures[3] = (sLeft > 0) ? "dialogLeft:" + sLeft + "px" : "";
    sFeatures[4] = (!sTop && !sLeft) ? "center:Yes" : "";
    sFeatures[5] = "help:No";
    sFeatures[6] = "status:No";
    sFeatures[7] = "scroll:auto";
    sFeatures[8] = (sResize) ? "resizable:" + sResize + "" : "resizable:No";   //2008.07.08 ADD Yuyama
    //        sFeatures[8] = (sResize)? "resizeable:"+sResize+"":"resizeable:Yes";//2008.07.08 DEL Yuyama

    sFeatures = sFeatures.join(";");

    //        window.showModalDialog(sURL,sMsg,sFeatures);
    //        window.showModalDialog("test.aspx", window, "dialogHeight:530px; dialogWidth:760px; center:yes; help:no; status:no; scroll:auto; resizable:yes");
    return window.showModalDialog(sURL, window, sFeatures);
    //        この関数の使用例        
    //        リターン値が必要時 : var respons = cmnFncOpenModal("test.aspx",500,400,yes);
    //        リターン値が必要じゃ無い時 : cmnFncOpenModal("test.aspx",500,400,yes);
    //        --- test.aspx ---
    //        上のモーダルウィンドウのリターン値を受ける方法及びモーダルウィンドウ閉じる
    //        window.returnValue = "OK";
    //        window.close();

}

/*-----------------------------------------------
関　数　名　　： cmnFncOpenModeless
処　　　理　　： Modelessウィンドウ
引　　　数　　： (引受は必要なことだけ入れれば良い。)					
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/10/11
修　正　日　　： 
-------------------------------------------------*/
function cmnFncOpenModeless(sURL, sWidth, sHeight, sResize, sTop, sLeft)
{

    var sFeatures = new Array();
    var obj;

    sFeatures[0] = (sWidth > 0) ? "dialogWidth:" + sWidth + "px" : "dialgWidth:600px";
    sFeatures[1] = (sHeight > 0) ? "dialogHeight:" + sHeight + "px" : "dialogHeight:450px";
    sFeatures[2] = (sTop > 0) ? "dialogTop:" + sTop + "px" : "";
    sFeatures[3] = (sLeft > 0) ? "dialogLeft:" + sLeft + "px" : "";
    sFeatures[4] = (!sTop && !sLeft) ? "center:Yes" : "";
    sFeatures[5] = "help:No";
    sFeatures[6] = "status:No";
    sFeatures[7] = "scroll:auto";
    sFeatures[8] = (sResize) ? "resizable:" + sResize + "" : "resizable:No";   //2008.07.08 ADD Yuyama
    //        sFeatures[8] = (sResize)? "resizeable:"+sResize+"":"resizeable:Yes";//2008.07.08 DEL Yuyama

    sFeatures = sFeatures.join(";");

    //        window.showModalDialog(sURL,sMsg,sFeatures);
    //        window.showModalDialog("test.aspx", window, "dialogHeight:530px; dialogWidth:760px; center:yes; help:no; status:no; scroll:auto; resizable:yes");
    obj = showModelessDialog(sURL, window, sFeatures);
    return obj;
    //        return window.showModelessDialog(sURL,window,sFeatures);
    //        この関数の使用例        
    //        リターン値が必要時 : var respons = cmnFncOpenModal("test.aspx",500,400,yes);
    //        リターン値が必要じゃ無い時 : cmnFncOpenModal("test.aspx",500,400,yes);
    //        --- test.aspx ---
    //        上のモーダルウィンドウのリターン値を受ける方法及びモーダルウィンドウ閉じる
    //        window.returnValue = "OK";
    //        window.close();

}

/*-----------------------------------------------
関　数　名　　： cmnFncOpenPopup
処　　　理　　： ポップアップウィンドウ
引　　　数　　： (引受は必要なことだけ入れれば良い。)
戻　り　値　　： ウィンドウのハンドル
作　成　日　　： 権(グォン) 2006/10/11
修　正　日　　： 
-------------------------------------------------*/
function cmnFncOpenPopup(sURL, sWin, sWidth, sHeight, sResize, sTop, sLeft)
{
    var windowprops = new Array();
    var sFeatures = new Array();

    sFeatures[0] = (sWidth > 0) ? "width=" + sWidth + "" : "width=600";
    sFeatures[1] = (sHeight > 0) ? "height=" + sHeight + "" : "height=450";
    sFeatures[2] = (sTop > 0) ? "Top=" + sTop + "" : "Top=150";
    sFeatures[3] = (sLeft > 0) ? "Left=" + sLeft + "" : "Left=200";
    sFeatures[4] = "location=no";
    sFeatures[5] = (sResize) ? "resizable=" + sResize + "" : "resizable=No";   //2008.07.08 ADD Yuyama
    //        sFeatures[5] = (sResize)? "resizeable="+sResize+"":"resizeable=Yes";//2008.07.08 DEL Yuyama
    sFeatures[6] = "menubar=no";
    sFeatures[7] = "status=no";
    sFeatures[8] = "help=no";
    sFeatures[9] = "scroll=auto";

    windowprops = sFeatures.join(",");
    popupHandle = window.open(sURL, sWin, windowprops);
    return popupHandle;
    //        この関数の使用例 
    //        cmnFncOpenPopup("test.aspx","popup",500,400,yes);
    //        --- test.aspx ---
    //        ポップアップウィンドウ閉じる
    //        self.close();
}

/*-----------------------------------------------
関　数　名　　： ParamValue
処　　　理　　： Javascript User Class
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/10/19
修　正　日　　： 
-------------------------------------------------*/
function ParamValue(sKey, sVal)
{
    this.key = sKey;
    this.value = sVal;
}

/*-----------------------------------------------
関　数　名　　： cmnFncGetParameter
処　　　理　　： URL QueryのGet Parameter値を取得
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/10/19
修　正　日　　： 
-------------------------------------------------*/
function cmnFncGetParameter()
{
    var query = location.search;
    var values = new Array;
    var buff;
    var buff2 = new Array;
    var i, k;
    query = query.substr(1, query.length);
    var tmp = query.split("&");

    for (i = 0; i < tmp.length; i++)
    {
        buff = tmp[i];
        buff2 = buff.split("=");
        values[i] = new ParamValue(buff2[0], buff2[1]);
    }

    return values;
}

/*-----------------------------------------------
関　数　名　　： cmnFncGetParamValue
処　　　理　　： URL QueryのGet Parameter値で渡したキーの値を取得
引　　　数　　： 
戻　り　値　　： 
作　成　日　　： 権(グォン) 2006/10/19
修　正　日　　： 
-------------------------------------------------*/
function cmnFncGetParamValue(sKey)
{
    var result, i;
    var param = cmnFncGetParameter();
    for (i = 0; i < param.length; i++)
    {
        if (sKey.toUpperCase() == param[i].key.toUpperCase()) { result = param[i].value; break; }
    }
    return result;
}

//2011.09.07_DEL_S ohsako AjaxclscmnMethod廃止対応
//    /*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//    関　数　名　　： bolFncIsLocked
//    処　　　理　　： 参照モードを確認する
//    引　　　数　　： なし
//    戻　り　値　　： なし
//    作　成　日　　： 2006.11.11  大野　泰裕
//    －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//    */
//    function bolFncIsLocked(){
//        var c_strS_KEY_LOCKSTATE = "LockState";
//        var bolIsLocked = AjaxclscmnMethod.objFncSession(c_strS_KEY_LOCKSTATE)
//        return bolIsLocked.value
//    }
//        
//    
//    /*-----------------------------------------------
//	関　数　名　　： cmnFncGetNendo
//	処　　　理　　： 渡って来た日付より年度を取得する。
//	引　　　数　　： 
//	                sVal : 
//	戻　り　値　　： なし
//    作　成　日　　： 権(グォン) 2006/12/19
//    修　正　日　　： 
//    -------------------------------------------------*/
//    function cmnFncGetNendo(sVal){
//        var result, response;
//        response = AjaxclscmnMethod.strFncGetNendo(sVal);
//        
//        result = response.value;
//        
//        return result;
//    }
//    
//    /*-----------------------------------------------
//	関　数　名　　： cmnSubSetLog
//	処　　　理　　： System Logを登録する。
//	引　　　数　　： 
//	                sKinou : 該当ページの機能区分キー (例："L")
//	                sSubsys : 
//	                sTableid : 
//	                sKbn : 1:ログオン,2:ログオフ,3:更新,4:削除,5:参照,6:印刷,7:ファイル出力,8:メニュー選択, 9:自動入力の操作内容セット()
//	                sFormid : 該当ページ番号(例："HOXX0001")
//	                sGamen : 該当ページ名(例："任意画面")
//	                arrKjncd : 個人番号(arraylist)
//	                sData : CSV出力、個人番号移出処理などを行った場合、1(有り)をセット
//	                sBiko : 備考
//	戻　り　値　　： なし
//    作　成　日　　： 権(グォン) 2006/12/20
//    修　正　日　　： 
//    -------------------------------------------------*/
//    function cmnSubSetLog(sKinou, sSubsys, sTableid, sKbn, sFormid, sGamen, arrKjncd, sData, sBiko){
//        //Ajax Call System Logを登録する。
//        AjaxclscmnMethod.subSetLog(sKinou, sSubsys, sTableid, sKbn, sFormid, sGamen, arrKjncd, sData, sBiko);
////        var arr = new Array();
////        arr[0] = "1";
////        arr[1] = "2";
////        AjaxclscmnMethod.subSetLog("L", "", "", "6", "Log Test","Test Page", arr, "", "");
//        return false;
//    }
//2011.09.07_DEL_E

/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： subError
処　　　理　　： エラー時処理（TreeViewのエラー回避）
引　　　数　　： 
戻　り　値　　： なし
作　成　日　　： 2007.01.16　貴村　幸
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function subError(pstrMsg, pstrUrl, pstrLine)
{
    return true;
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： strFncHttpPathSet
処　　　理　　： Httpパスに変換する
引　　　数　　： pstrPath：フォルダもしくはaspx名

戻　り　値　　： 
作　成　日　　： 2007.02.13　貴村　幸
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function strFncHttpPathSet(pstrPath)
{

    var strFilePath = location.pathname;
    var arrPath;
    var strUrl = '';
    if (strFilePath.substr(0, 1) == '/')
    {
        strFilePath = strFilePath.substr(1)
    }

    strUrl = location.protocol + '//' + location.host + '/';
    arrPath = strFilePath.split("/");
    strUrl = strUrl + arrPath[0] + '/' + pstrPath;

    return strUrl;
}
/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： strFncShowProgressPanel
処　　　理　　： 処理中パネルを表示する
引　　　数　　： なし
戻　り　値　　： "0":待機中;"1":処理中;"2":処理完了;"9":処理ＮＧ
作　成　日　　： 2007.03.01　大野　泰裕
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function strFncShowProgressPanel()
{

    var c_strPAGE_PROGRESS_PANEL = strFncHttpPathSet("/webForm_O/Sys_O/HROOS0100_1.aspx");
    var c_strARGS_PROGRESS_PANEL = "dialogWidth:400px;dialogHeight:200px;help:no;status:no;resizable:no;center:yes";

    return window.showModalDialog(c_strPAGE_PROGRESS_PANEL, window, c_strARGS_PROGRESS_PANEL);
}
/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： evtShowWaitPanel
処　　　理　　： 処理中パネル表示処理
引　　　数　　： strProgressString(画面表示用文字列)
戻　り　値　　： なし
作　成　日　　： 2013.09.01 牧田 淳一
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function subShowWaitPanel(pstrProgressString)
{
    if ($("#divShadow")[0])
        return;

    var strHtml = "";
    //2018.12.20R sakai S
    //    var strHeight = String($(window).height());
    //    //2014.02.28I makita S
    //    var strWidth = String($(window).width());
    //    var strWidth2 = String($(window).width() - 10);
    //    //2014.02.28I makita E
    var strHeight = "0";
    var strWidth = "0";
    var strWidth2 = "0";
    if ($(window).height() == 0)
    {
        strHeight = String($(window).clientHeight());
    } else
    {
        strHeight = String($(window).height());
    }
    if ($(window).width() == 0)
    {
        strWidth = String($(window).clientWidth());
        strWidth2 = String($(window).clientWidth() - 10);
    } else
    {
        strWidth = String($(window).width());
        strWidth2 = String($(window).width() - 10);
    }
    //2018.12.20R sakai E

    //2014.02.28R makita S
    //        strHtml = "<div id=\"divShadow\" class=\"shadow\" style=\"position:absolute;top:0px;left:0px;width:1024px;height:768px;z-index:99997;background-color:Black;\" ></div>";
    //        strHtml += "<div id=\"divProgress\" style=\"position:absolute;top:0px;left:0px; width:1024px;height:"
    //        strHtml += strHeight
    //        strHtml += "px;z-index:99998;background-color:Transparent;vertical-align:middle;text-align:center;cursor:wait;\">";
    //        strHtml += "    <table style=\"width:1024px;height:"
    //        strHtml += strHeight
    //        strHtml += "px;\">";
    //        strHtml += "        <tr>";
    //        strHtml += "           <td style=\"width:auto;height:"
    //        strHtml += strHeight
    //        strHtml += "px;text-align:center;vertical-align:middle;border-width:0;\">";
    //        strHtml += "               <img id=\"imgProgress\" alt=\"\" src=\"../../Images/hrprogress.gif\" style=\"text-align:center;vertical-align:middle;z-index:99999;background-color:Transparent;\" />";
    //        strHtml += "                <br />";
    //        strHtml += "                <br />";
    //        strHtml += "                <div><span id=\"lblProgressString\" style=\"text-align:center;vertical-align:middle;z-index:99999;width:auto;font-family:MS UI Gothic;font-size:14pt;font-weight:bolder;background-color:Transparent;color:#fff\">";
    //        strHtml += pstrProgressString;
    //        strHtml += "                </span></div>";
    //        strHtml += "            </td>";
    //        strHtml += "        </tr>";
    //        strHtml += "    </table>";
    //        strHtml += "</div>";
    strHtml = "<div id=\"divShadow\" class=\"shadow\" style=\"position:absolute;top:0px;left:0px;width:";
    strHtml += strWidth;
    strHtml += "px;height:";
    strHtml += strHeight;
    strHtml += "px;z-index:99997;background-color:Black;\" ></div>";
    strHtml += "<div id=\"divProgress\" style=\"position:absolute;top:0px;left:0px; width:";
    strHtml += strWidth;
    strHtml += "px;height:";
    strHtml += strHeight;
    strHtml += "px;z-index:99998;background-color:Transparent;vertical-align:middle;text-align:center;cursor:wait;\">";
    strHtml += "    <table style=\"width:";
    strHtml += strWidth;
    strHtml += "px;height:";
    strHtml += strHeight;
    strHtml += "px;\">";
    strHtml += "        <tr>";
    strHtml += "           <td style=\"width:";
    strHtml += strWidth;
    strHtml += "px;height:";
    strHtml += strHeight;
    strHtml += "px;text-align:center;vertical-align:middle;border-width:0;\">";
    strHtml += "               <img id=\"imgProgress\" alt=\"\" src=\"../../Images/hrprogress.gif\" style=\"text-align:center;vertical-align:middle;z-index:99999;background-color:Transparent;\" />";
    strHtml += "                <br />";
    strHtml += "                <br />";
    strHtml += "                <div><span id=\"lblProgressString\" style=\"text-align:center;vertical-align:middle;z-index:99999;width:";
    strHtml += strWidth2;
    strHtml += "px;font-family:MS UI Gothic;font-size:14pt;font-weight:bolder;background-color:Transparent;color:#fff\">";
    strHtml += pstrProgressString;
    strHtml += "                </span></div>";
    strHtml += "            </td>";
    strHtml += "        </tr>";
    strHtml += "    </table>";
    strHtml += "</div>";
    //2014.02.28R makita E

    $("body").append($(strHtml));
}
/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： evtHideWaitPanel
処　　　理　　： 処理中パネル非表示処理
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2013.09.01 牧田 淳一
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function subHideWaitPanel()
{
    if ($("#divShadow")[0])
        $("#divShadow").remove();
    if ($("#divProgress")[0])
        $("#divProgress").remove();
}
/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： strFncEncode
処　　　理　　： 「&」「,」「?」を全角に置換
引　　　数　　： 変換対象文字列
戻　り　値　　： 変換後文字列
作　成　日　　： 2013.09.01 牧田 淳一
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function strFncEncode(pstrEncode)
{
    //2015.03.13R katayama S
    //return pstrEncode.replace("&", "＆").replace(",", "，").replace("?", "？");
    //2015.06.05R makita S
    //return strFncReplaceAll(strFncReplaceAll(strFncReplaceAll(pstrEncode, "&", "＆"), ",", "，"), "?", "？");
    return strFncReplaceAll(strFncReplaceAll(strFncReplaceAll(strFncReplaceAll(strFncReplaceAll(pstrEncode, "&", "＆"), ",", "，"), "?", "？"), "'", "’"), "\\", "￥");
    //2015.06.05R makita E
    //2015.03.13R katayama E
}

/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： strFncHREncode
処　　　理　　： valueにURLエンコードを掛ける
引　　　数　　： 変換対象文字列
戻　り　値　　： 変換後文字
作　成　日　　： 2015.07.16 片山 育子
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function strFncHREncode(pstrParam)
{
    pstrParam = encodeURIComponent(pstrParam);
    return strFncReplaceAll(pstrParam, "'", "’");
}

/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： strFncAllReplace
処　　　理　　： 文字列置換
引　　　数　　： 文字列、置換対象文字、置換後文字
戻　り　値　　： 変換後文字列
作　成　日　　： 2015.03.13 片山 育子
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function strFncReplaceAll(strText, strChg, strRep)
{
    return strText.split(strChg).join(strRep);
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： subInitOptionMenu
処　　　理　　： 「その他の機能」を表示する
： 各ページでwindow.onload時に呼び出して下さい。
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2012.06.20　大廻　和世
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function subInitOptionMenu()
{
    $(".optionmenu, .optionmenu ul li").hover(function ()
    {
        $(this).find("ul li").css({ position: "relative" });   /* 互換モードだとcssのhoverが効かないのでjsで設定する */
        $(this).find("ul:first").stop(true, true).slideDown(200);
    }, function ()
    {
        $(this).find("ul:first").stop(true, true).hide();
    });
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： HRMessage
処　　　理　　： ダイアログ表示
引　　　数　　： pstrMessage：アラート表示される文字
                　pstrCaption：メッセージボックスのタイトルバー
                　intButtons：ボタンの種類
                　　　　　　　1⇒OK、キャンセル
                　　　　　　　2⇒Yes、No、キャンセル
                　intIcon：アラートに表示されるイメージアイコン
                　　　　　 0：何も表示しない(None)
                　　　　　 1：エラーアイコン(Error)
                　　　　　 2：質問形式(Question)
                　　　　　 3：警告(Warning)
                　　　　　 4：インフォメーション(Information)
5：質問＆強調(Question&Exclamation)
                　intDefaultButton：初めにフォーカスの当たるボタン
左から順に1、2、3とする
ボタンが2つの場合に3は1と同様の処理
poptions:モーダルダイアログに関するプロパティの指定
.Width:ポップアップするメッセージボックスの幅
.Height:ポップアップするメッセージボックスの高さ
pintMaxLine:表示する最大行を指定する。
指定した行数を超えた場合、スクロール表示となる
戻　り　値　　： 選択されたボタンの値
作　成　日　　： 2014.07.28　菅田　哲文(V7より)
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function HRMessage(pstrMessage, pstrCaption, pintButtons, pintIcon, pintDefaultButton, poptions, pintMaxLine)
{

    var c_strPAGE_PROGRESS_PANEL = strFncHttpPathSet("webForm_O/Sys_O/HROOS0190.aspx");
    var intWidth = 385;
    var intHeight = 160;

    //引数がない場合の対応
    if (pstrMessage == undefined)
    {
        pstrMessage = "";
    }
    if (pstrCaption == undefined)
    {
        pstrCaption = "";
    }
    if (pintButtons == undefined)
    {
        pintButtons = 1;
    }
    if (pintIcon == undefined)
    {
        pintIcon = 0;
    }
    if (pintDefaultButton == undefined)
    {
        pintDefaultButton = 1;
    }
    if (poptions != undefined)
    {
        if (poptions.Width != undefined)
        {
            intWidth = poptions.Width;
        }
        if (poptions.Height != undefined)
        {
            intHeight = poptions.Height;
        }
    }

    var c_strARGS_PROGRESS_PANEL = "dialogWidth:" + intWidth + "px;dialogHeight:" + intHeight + "px;help:no;status:no;resizable:no;center:yes";

    //アラート表示用データの格納
    var arrData = new Array();
    arrData[0] = pstrMessage;
    arrData[1] = pstrCaption;
    arrData[2] = pintButtons;
    arrData[3] = pintIcon;
    arrData[4] = pintDefaultButton;
    arrData[5] = pintMaxLine;

    //アラート表示
    var intReturn = window.showModalDialog(c_strPAGE_PROGRESS_PANEL, arrData, c_strARGS_PROGRESS_PANEL);

    //アラートを×ボタンで閉じた場合の対応
    if (intReturn == undefined)
    {
        intReturn = 0;
    }

    return intReturn;

}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　: HRAjax
処　　　理　: 共通Ajax関数
引　　　数　: jquery.ajaxと同様
戻　り　値　: jquery.ajaxと同様（XMLHttpRequestオブジェクト）
作　成　日　: 2015.07.16 四橋（Ｖ７より）
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function HRAjax(origSettings)
{
    var data = origSettings.data;
    if (data && typeof data === "string")
    {
        //dataの中に含まれたnullという文字列をnull値に置換します。
        origSettings.data = data.replace(/'null'/g, "null").replace(/"null"/g, "null").replace(/'undefined'/g, "null").replace(/"undefined"/g, "null");
    }
    return $.ajax(origSettings);
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： HRMessage2
処　　　理　　： ダイアログ表示
引　　　数　　： pstrMessage：アラート表示される文字
                　pstrCaption：メッセージボックスのタイトルバー
                　intButtons：ボタンの種類
                　　　　　　　1⇒OK、キャンセル
                　　　　　　　2⇒Yes、No、キャンセル
                　intIcon：アラートに表示されるイメージアイコン
                　　　　　 0：何も表示しない(None)
                　　　　　 1：エラーアイコン(Error)
                　　　　　 2：質問形式(Question)
                　　　　　 3：警告(Warning)
                　　　　　 4：インフォメーション(Information)
5：質問＆強調(Question&Exclamation)
                　intDefaultButton：初めにフォーカスの当たるボタン
左から順に1、2、3とする
ボタンが2つの場合に3は1と同様の処理
poptions:モーダルダイアログに関するプロパティの指定
.Width:ポップアップするメッセージボックスの幅
.Height:ポップアップするメッセージボックスの高さ
戻　り　値　　： 選択されたボタンの値
作　成　日　　： 2015.09.03　菅田　哲文(×ボタン時の戻り値をキャンセル扱いにする)
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function HRMessage2(pstrMessage, pstrCaption, pintButtons, pintIcon, pintDefaultButton, poptions)
{

    var c_strPAGE_PROGRESS_PANEL = strFncHttpPathSet("webForm_O/Sys_O/HROOS0190.aspx");
    var intWidth = 385;
    var intHeight = 160;

    //引数がない場合の対応
    if (pstrMessage == undefined)
    {
        pstrMessage = "";
    }
    if (pstrCaption == undefined)
    {
        pstrCaption = "";
    }
    if (pintButtons == undefined)
    {
        pintButtons = 1;
    }
    if (pintIcon == undefined)
    {
        pintIcon = 0;
    }
    if (pintDefaultButton == undefined)
    {
        pintDefaultButton = 1;
    }
    if (poptions != undefined)
    {
        if (poptions.Width != undefined)
        {
            intWidth = poptions.Width;
        }
        if (poptions.Height != undefined)
        {
            intHeight = poptions.Height;
        }
    }

    var c_strARGS_PROGRESS_PANEL = "dialogWidth:" + intWidth + "px;dialogHeight:" + intHeight + "px;help:no;status:no;resizable:no;center:yes";

    //アラート表示用データの格納
    var arrData = new Array();
    arrData[0] = pstrMessage;
    arrData[1] = pstrCaption;
    arrData[2] = pintButtons;
    arrData[3] = pintIcon;
    arrData[4] = pintDefaultButton;

    //アラート表示
    var intReturn = window.showModalDialog(c_strPAGE_PROGRESS_PANEL, arrData, c_strARGS_PROGRESS_PANEL);

    //アラートを×ボタンで閉じた場合の対応
    if (intReturn == undefined)
    {
        intReturn = 2;
    }

    return intReturn;

}

/*
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　　： objFncGetQueryString
処　　　理　　： クエリ文字列から対象キーの値を取得
引　　　数　　： なし
戻　り　値　　： なし
作　成　日　　： 2015.03.06　小藤　崇志
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*/
function objFncGetQueryString(pstrKey, pstrDefault)
{
    if (pstrDefault == null)
    {
        pstrDefault = "";
    }

    //クエリ分解
    pstrKey = pstrKey.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var objRegex = new RegExp("[\\?&]" + pstrKey + "=([^&#]*)");
    var strQueryString = objRegex.exec(window.location.href);

    //クエリ取得
    if (strQueryString == null)
        return pstrDefault;
    else
        return strQueryString[1];
}


/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　: jQuery機能拡張
処　　　理　: jQuery、jQueryオブジェクトに対し、機能を拡張します。
作　成　日　: 2018.07.06 add hata
備　　　考　: 
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
(function ()
{
    if (window.jQuery)
    {
        setup();
        return;
    }
    var _timerId = window.setInterval(setup, 1);
    function setup()
    {
        if (!window.jQuery) { return; }
        var _canvas = null;
        window.clearInterval(_timerId);
        if (window.isIE() || window._ieUseOriginalDialog)
        {
            var appName = window.location;
            document.write("<link href=\"../../Styles/plugins/jquery-ui.css\" rel=\"stylesheet\" />");
            document.write("<script src=\"../../Scripts/plugins/jquery-ui.js\"></script>");
        }
        //jQueryに対する機能拡張
        $.extend({
            wanting: {
                existsWaiting: false,
                show: function ()
                {
                    _canvas = $("<div id=\"Canvas\"></div>");
                    _canvas.css({
                        "visibility": "hidden",
                        "position": "fixed",
                        "left": "0",
                        "top": "0",
                        "width": "100%",
                        "height": "100%",
                        "z-index": "9998",
                        "margin": "0px",
                        "padding": "0px",
                        "border": "0px",
                        "background-color": "#000",
                        "opacity": "0.5",
                        "filter": "alpha(opacity=50)"
                    });
                    var image = $("<img id=\"imgProgress\" alt=\"\" src=\"./hrprogress.gif\" style=\"text-align:center;vertical-align:middle;z-index:99999;background-color:Transparent;\" />");
                    _canvas.append(image);
                    var parent = $("form:first");
                    if (!parent && parent.length == 0)
                    {
                        parent = $(window.document.body);
                    }
                    $(parent).append(_canvas);
                    _canvas.css("visibility", "visible");
                    this.existsWaiting = true;
                },
                hide: function ()
                {
                    _canvas.remove();
                    _canvas = null;
                    this.existsWaiting = false;
                }
            },
            ajaxSync: function (method, data, url)
            {
                var response = null;
                var isError = false;
//if (!url)
//{
//    url = location.href.split("?")[0];
//}
//data = data ? data : "{}";
//if (data && typeof data !== "string")
//{
//    //dataが文字列でない場合、json文字列に変換します。
//    data = JSON.stringify(data);
//}
data = data ? data : {};
if (data && typeof data == "string")
{
    //dataが文字列の場合、jsonオブジェクトに変換します。
    data = JSON.parse(data);
}

				var XMLHttpRequest = $.ajax({
					async: false,
					type: 'POST',
url: "?handler=Ajax_" + method,
//contentType: 'application/json; charset=utf-8',
					data: data,
                    dataType: 'json',
beforeSend: function (xhr) {
	xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
},
					success: function (data, dataType)
					{
    response = data;
					},
                    error: function (XMLHttpRequest, textStatus, errorThrown)
                    {
                        isError = true;
                    }
                });

				if (isError)
                {
                    var errorObject = { Message: "" };
                    if (XMLHttpRequest.status == 500)
                    {
                        try
                        {
                            errorObject = eval("(" + XMLHttpRequest.responseText + ")");
                        } catch (e)
                        {
                            errorObject.Message = XMLHttpRequest.responseText;
                        }
                    } else
                    {
                        errorObject.Message = XMLHttpRequest.responseText;
                    }
                    //2019.03.20I makita S
                    alert("処理中にエラーが発生しました。処理を中断します。");
                    throw new Error(errorObject.Message);
                    //2019.03.20I makita E
                }
                return response;
            },
            ajaxAsync: function (method, data, url, successCallback, errorCallBack)
            {
                var response = null;
                var isError = false;
                if (data && typeof data === "function")
                {
                    //第２引数が function の場合、urlが省略されたとみなし、引数を２つずらします。
                    errorCallBack = url;
                    successCallback = data;
                    data = null;
                    url = null;
                }
                if (url && typeof url === "function")
                {
                    //第３引数が function の場合、urlが省略されたとみなし、引数を１つずらします。
                    errorCallBack = successCallback;
                    successCallback = url;
                    url = null;
                }
                if (!url)
                {
                    url = location.href.split("?")[0];
                }
                data = data ? data : "{}";
                if (data && typeof data !== "string")
                {
                    //dataが文字列でない場合、json文字列に変換します。
                    data = JSON.stringify(data);
                }
                if (!window.waitWindow.visible)
                {
                    window.waitWindow.show();
                }
                var XMLHttpRequest = $.ajax({
                    async: true,
                    type: 'POST',
                    url: url + "/" + method,
                    contentType: 'application/json; charset=utf-8',
                    data: data,
                    dataType: 'json',
                    success: function (data, dataType)
                    {
                        if (successCallback && typeof successCallback === "function")
                        {
                            successCallback(data.d, dataType);
                        }
                    },
                    error: function ()
                    {
                        if (errorCallBack && typeof errorCallBack === "function")
                        {
                            errorCallBack();
                        } else
                        {
                            alert("処理中にエラーが発生しました。処理を中断します。");
                            window.waitWindow.close();
                        }
                    }
                });
                return XMLHttpRequest;
            }
        });
        //jQueryオブジェクトに対する機能拡張
        $.fn.extend({
            clientWidth: function (e, f)
            {
                var thisElem = this[0];
                if ($.isWindow(thisElem) && (!thisElem.document.documentElement.clientWidth || thisElem.document.documentElement.clientWidth === 0))
                {
                    return thisElem.document.body.clientWidth;
                } else
                {
                    return $(thisElem).width();
                }
            },
            clientHeight: function (elem)
            {
                var thisObj = this[0];
                if ($.isWindow(thisObj) && (!thisObj.document.documentElement.clientHeight || thisObj.document.documentElement.clientHeight === 0))
                {
                    return thisObj.document.body.clientHeight;
                } else
                {
                    return $(thisObj).height();
                }
            }
        });
        //ロード時の処理
        $(function (e)
        {
            function resizeAllElements(elems)
            {
                elems.each(function (e)
                {
                    var thisObj = $(this);
                    var windowObj = $(window);
                    var fixWidth = thisObj.attr("fixWidth");
                    var fixHeight = thisObj.attr("fixHeight");
                    if (fixWidth && windowObj.clientWidth() >= _baseWidth) {
                        thisObj.width(windowObj.clientWidth() - fixWidth);
                    }
                    if (fixHeight && windowObj.clientHeight() >= _baseHeight)
                    {
                        thisObj.height(windowObj.clientHeight() - fixHeight);
                    }
                });
            }
            var _baseWidth;
            var _baseHeight;
            var bodyObj = $("body");
            if (bodyObj.attr("base-width"))
            {
                _baseWidth = bodyObj.attr("base-width");
            }
            if (bodyObj.attr("base-height"))
            {
                _baseHeight = bodyObj.attr("base-height");
            }
            var _elems = $(".liquid").each(function (e, obj)
            {
                var thisObj = $(this);
                var windowObj = $(window);
                var fixWidth = windowObj.clientWidth() - thisObj.width();
                var fixHeight = windowObj.clientHeight() - thisObj.height();
                if (_baseWidth)
                {
                    fixWidth -= (windowObj.clientWidth() - _baseWidth);
                }
                if (_baseHeight)
                {
                    fixHeight -= (windowObj.clientHeight() - _baseHeight);
                }
                thisObj.attr("fixWidth", fixWidth);
                thisObj.attr("fixHeight", fixHeight);
            });
            $.merge(_elems, $(".liquid-w").each(function (e, obj)
            {
                var thisObj = $(this);
                var windowObj = $(window);
                var fixWidth = windowObj.clientWidth() - thisObj.width();
                if (_baseWidth)
                {
                    fixWidth -= (windowObj.clientWidth() - _baseWidth);
                }
                thisObj.attr("fixWidth", fixWidth);
            }));
            $.merge(_elems, $(".liquid-h").each(function (e, obj)
            {
                var thisObj = $(this);
                var windowObj = $(window);
                var fixHeight = windowObj.clientHeight() - thisObj.height();
                if (_baseHeight)
                {
                    fixHeight -= (windowObj.clientHeight() - _baseHeight);
                }
                thisObj.attr("fixHeight", fixHeight);
            }));
            $(window).resize(function (e)
            {
                resizeAllElements(_elems);
            });
            resizeAllElements(_elems);
        });
    }
})();

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　: 処理中ウィンドウ
処　　　理　: 処理中ウィンドウを表示・非表示する機能を提供します。
作　成　日　: 2018.07.06 add hata
備　　　考　: 
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
window.waitWindow = {};
window.waitWindow.__waitWindow = null;
window.waitWindow.__canvas = null;
window.waitWindow.visible = false;
window.waitWindow.show = function (title, waitMessage)
{
    window.waitWindow.__waitWindow = $("<div id=\"WaitWindow\"></div>");
    window.waitWindow.__waitWindow.css({
        "position": "absolute",
        "left": "0px",
        "top": "0px",
        "right": "0px",
        "bottom": "0px",
        "width": "400px",
        "height": "230px",
        "z-index": "9999",
        "margin": "auto",
        "padding": "0px",
        "border": "0px",
        "background-color": "#ffffff",
        "opacity": "1.0",
        "filter": "alpha(opacity=100)"
    });
    title = title ? title : "処理中...";
    waitMessage = waitMessage ? waitMessage : "しばらくおまちください" ;
    window.waitWindow.__waitWindow.append("<span style=\"position:absolute;top:15px;left:10px;\">しばらくおまちください</span>");
    window.waitWindow.__waitWindow.append("<span style=\"position:absolute;top:45px;left:10px;font-size:1.5em;font-weight:bold;\">" + title + "</span>");
    window.waitWindow.__waitWindow.append("<img alt=\"Loading...\" src=\"../../Images/hrwaitring.gif?" + new Date().getTime() + "\" style=\"display:block;position:absolute;top:92px;left:162px;\"></img>");
    window.waitWindow.__waitWindow.append("<span style=\"position:absolute;right:10px;bottom:10px;color:#6a6a6a;\">" + waitMessage + "</span>");
    window.waitWindow.__canvas = $("<div id=\"Canvas\"></div>");
    window.waitWindow.__canvas.css({
        "visibility": "hidden",
        "position": "fixed",
        "left": "0",
        "top": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "9998",
        "margin": "0px",
        "padding": "0px",
        "border": "0px",
        "background-color": "#000",
        "opacity": "0.5",
        "filter": "alpha(opacity=50)"
    });
    var parent = $(window.top.document.body);
    parent.append(window.waitWindow.__canvas);
    parent.append(window.waitWindow.__waitWindow);
    window.waitWindow.__canvas.css("visibility", "visible");
    window.waitWindow.visible = true;
}
window.waitWindow.close = function ()
{
    if (window.waitWindow.__waitWindow) { window.waitWindow.__waitWindow.remove(); }
    if (window.waitWindow.__canvas) { window.waitWindow.__canvas.remove(); }
    window.waitWindow.visible = false;
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　: window.showModalDialog
処　　　理　: IE以外でも使用可能なshowModalDialogメソッドを実装します。
作　成　日　: 2018.08.09 add hata
備　　　考　: 
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/

var _dialogWindow = null;
if (window.isIE() || window._ieUseOriginalDialog)
{
    if (!window.showModalDialog)
    {
        window.showModalDialog = function (url, arguments, options, callBack)
        {
            var defer = $.Deferred();
            var _returnValue = null;
            var _closed = false;
            options = options.replace(/dialogWidth\s*[:=]\s*max/gi, "dialogWidth:" + ($(top.window).clientWidth() - 8) + "px");
            options = options.replace(/dialogHeight\s*[:=]\s*max/gi, "dialogHeight:" + ($(top.window).clientHeight() - 48) + "px");
            var opFeature = options.split(";");
            var featuresArray = new Array()
            if (document.all)
            {
                for (var i = 0; i < opFeature.length - 1; i++)
                {
                    var f = opFeature[i].split("=");
                    featuresArray[f[0]] = f[1];
                }
            }
            else
            {
                for (var i = 0; i < opFeature.length - 1; i++)
                {
                    var f = opFeature[i].split(":");
                    if (f.length == 1 && f[0].indexOf("=") >= 0) { f = f[0].split("="); }
                    if (f.length > 1)
                    {
                        featuresArray[f[0].toString().trim().toLowerCase()] = f[1].toString().trim();
                    }
                }
            }
            var dialogwidth = featuresArray["dialogwidth"] ? featuresArray["dialogwidth"] : "";
            var dialogheight = featuresArray["dialogheight"] ? featuresArray["dialogheight"] : "";
            var dialogleft = featuresArray["dialogleft"] ? featuresArray["dialogleft"] : "0px";
            var dialogtop = featuresArray["dialogtop"] ? featuresArray["dialogtop"] : "0px";
            var resizable = featuresArray["resizable"] ? featuresArray["resizable"] : "yes";
            var center = featuresArray["center"] ? featuresArray["center"] : "yes";
            var status = featuresArray["status"] ? featuresArray["status"] : "no";
            if (dialogwidth.indexOf("px") != -1) { dialogwidth = dialogwidth.replace("px", ""); }
            if (dialogheight.indexOf("px") != -1) { dialogheight = dialogheight.replace("px", ""); }
            if (resizable.toLowerCase() == "yes") { resizable = true; }

            var _canvas = $("<div>").uniqueId();
            _canvas.css({
                "visibility": "hidden",
                "position": "fixed",
                "left": "0",
                "top": "0",
                "width": "100%",
                "height": "100%",
                "z-index": "99998",
                "margin": "0px",
                "padding": "0px",
                "border": "0px",
                "background-color": "#000",
                "opacity": "0.0",
                "filter": "alpha(opacity=00)"
            });
            var parent = $(window.top.document.body);
            parent.append(_canvas);
            _canvas.css("visibility", "visible");
            var _dialogWindow = $("<iframe src=\"" + url + "\">").uniqueId();
            _dialogWindow.dialog({
                appendTo: window.top.document.body,
                width: dialogwidth,
                height: dialogheight,
                resizable: resizable,
                dialog: true,
                close: function ()
                {
                    var returnVal = _dialogWindow[0].contentWindow.returnValue;
                    _canvas.remove();
                    _dialogWindow.remove();
                    _closed = true;
                    if (callBack)
                    {
                        callBack(returnVal);
                    }
                    defer.resolve(returnVal);
                }
            });
            _dialogWindow.width(dialogwidth);
            _dialogWindow.height(dialogheight);
            _dialogWindow.css({ "margin": "0px", "padding": "0px", "border": "0px" });
            $(".ui-dialog", window.top.document.body).css({ "z-index": "99999" });
            var contentWindow = _dialogWindow[0].contentWindow;
            $(contentWindow).load(function ()
            {
                $(".ui-dialog-title", this).html(this.document.title ? this.document.title : "");
                contentWindow._dialogWindow = _dialogWindow;
                var script = this.document.createElement("script");
                script.innerText = "function close() { _dialogWindow.dialog(\"close\"); }";
                this.document.head.appendChild(script);
            });
            contentWindow.dialogArguments = arguments;
            return defer.promise();
        }
    }
} else
{
    if (!window.showModalFunc)
    {
        window.showModalFunc = window.showModalDialog;
        window.showModalDialog = function (url, arguments, options, callBack)
        {
            options = options.replace(/dialogWidth\s*[:=]\s*max/gi, "dialogWidth:" + screen.availWidth + "px");
            options = options.replace(/dialogHeight\s*[:=]\s*max/gi, "dialogHeight:" + screen.availHeight + "px");
            var returnVal = window.showModalFunc(url, arguments, options);
            if (callBack)
            {
                callBack(returnVal);
            }
            return returnVal;
        }
    }
}

function isIE()
{
    var userAgent = window.navigator.userAgent.toLowerCase();
    return (userAgent.indexOf("msie") == -1 && userAgent.indexOf("trident") == -1);
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　: subAddEventListener
処　　　理　: 指定したオブジェクトにイベントを設定する
引　　　数　: pobjTarget - イベントを設定するオブジェクト
: pstrEventName - 設定するイベント名 loadなど
: pobjFunction - イベントで実行する処理
戻　り　値　: なし
作　成　日　: 2018.11.05 add hata
備　　　考　: この項目は非推奨です。以降が終了した後、削除されます。
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function subAddEventListener(pobjTarget, pstrEventName, pobjFunction)
{
    if (pobjTarget)
    {
        if (pobjTarget.addEventListener)
        {
            pobjTarget.addEventListener(pstrEventName, pobjFunction, false);
        } else if (pobjTarget.attachEvent)
        {
            //**注意** pobjFunction内でthisを呼んでると意図した動作にならない。
            pobjTarget.attachEvent("on" + pstrEventName, pobjFunction);
        }
    }
}

/*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
関　数　名　: subRemoveEventListener
処　　　理　: 指定したオブジェクトからイベントを取り除く
引　　　数　: pobjTarget - イベントを解除するオブジェクト
: pstrEventName - 解除するイベント名 loadなど
: pobjFunction - 解除する処理
戻　り　値　: なし
作　成　日　: 2018.11.05 add hata
備　　　考　: この項目は非推奨です。以降が終了した後、削除されます。
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－*/
function subRemoveEventListener(pobjTarget, pstrEventName, pobjFunction)
{
    if (pobjTarget)
    {
        if (pobjTarget.removeEventListener)
        {
            pobjTarget.removeEventListener(pstrEventName, pobjFunction, false);
        } else if (pobjTarget.detachEvent)
        {
            pobjTarget.detachEvent("on" + pstrEventName, pobjFunction);
        }
    }
}

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
// 処  理 ：windowサイズの変更
// 引  数 ：pstrMode 1:モニター最大固定
// 戻り値 ：カンマ区切りでwidth,height
// 備  考 ：
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
function strFncMaxWindow(pstrMode)
{
    var intAvailHeight = window.screen.availHeight;
    var intAvailWidth = window.screen.availWidth;
    var intWidth = 1280;
    var intHeight = 1024;
    var intWidthX = 1024;
    var intHeightX = 768;
    var intLeft = (intAvailWidth - intWidth) / 2;
    var intTop = (intAvailHeight - intHeight) / 2;
    var strReturnValue = "";

    if (pstrMode != 1)
    {
        //モニタの有効サイズ幅にサイズを変更
        if (intAvailHeight < intHeight || intAvailWidth < intWidth)
        {
            intWidth = intWidthX;
            intHeight = intHeightX;
        }
        else
        {
            if (intAvailHeight > intHeight)
            {
                intHeight = intAvailHeight;
            }
            if (intAvailWidth > intWidth)
            {
                intWidth = intAvailWidth;
            }
        }
        }
        else
        {
            intHeight = intAvailHeight;
            intWidth = intAvailWidth;
    }

        strRetValue = intWidth + ',' + intHeight;
    return strRetValue;


}





//----------------------------------------------------
// asp net core テスト
//----------------------------------------------------
var common;
if (!common) {
	common = {};
}
if (!common.onsubmit) {
	//サーバー呼び出し前にバインド用の隠し項目を更新する処理
	common.onsubmit = function () {
		$("input[id *= '_BindProperty']").each(function (index, element) {
			var $elem = $(element);
			var controlType = $elem.attr("controltype");

			var targetId = $elem.attr("id").replace("_BindProperty", "");
			var target = $("#" + targetId).get(0);

			var attrAry = [];
			var value = "";
			var styleValue = "";
			var classValue = "";
			$.each(target.attributes, function (idx, attr) {
				switch (attr.nodeName.toLowerCase()) {
					case "name":
					case "id":
					case "type":
					case "controltype":
						//nop
						break;
					case "class":
						classValue = attr.nodeValue;
						break;
					case "style":
						styleValue = attr.nodeValue;
						//IEは色が「rgb(255, 255, 255)」形式になる場合があるので「#FFFFFF」形式にする
						var toHex = function (s) {
							return ('00' + parseInt(s, 10).toString(16).toUpperCase()).substr(-2);
						}
						var regexp = /rgb\((\d{1,3}),\s(\d{1,3}),\s(\d{1,3})\)/g;
						while ((array = regexp.exec(styleValue)) !== null) {
							styleValue = styleValue.replace(array[0], "#" + toHex(array[1]) + toHex(array[2]) + toHex(array[3]));
						}
						break;
					case "value":
						//valueはinputタグ本体がバインドするからhidden側には不要か？
						//value = attr.nodeValue;
						break;
					default:
						attrAry.push(attr.nodeName + ":" + attr.nodeValue);
						break;
				}
			});

			var wk = [];
			wk.push("{");
			wk.push("Attribute:'" + attrAry.join(",") + "'");
			wk.push(",Class:'" + classValue + "'");
			wk.push(",Style:'" + styleValue + "'");
			switch (controlType) {
				case "HRLabel":
					wk.push(",Text:'" + target.innerText + "'");
					break;
				default:
					break;
			}
			wk.push("}");
			$elem.val(wk.join(""));
		});
	};
}
