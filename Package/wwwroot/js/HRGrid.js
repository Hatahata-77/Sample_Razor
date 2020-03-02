/*
*－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
*  ファイル名 : HRGrid.js
*  機能　　　 : グリッド共通js
*  作成者　　 : 
*  作成日付　 : 
*－－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－
*　修正者　│　修正日付　│　修正概要
*－－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－
*   磯島   │ 2019.06.05 │ ヘッダー2段で2段目に1項目しかない場合に幅の自動調整がずれる問題の対応
*－－－－－＋－－－－－－＋－－－－－－－－－－－－－－－－－－－－
*/
//グリッド共通部品
var _HRGrid;
if (!_HRGrid) {
    _HRGrid = {
        ts: [],
        cellValues: [],
        scrolls: [],
        liquidLayout1Done: [],

        //初期表示時にグリッドを非表示にしていると発生する問題の対処
        fixHiddenGridProblem: function (gridID, pagerVisilble) {

            //固定列のヘッダーが表示されない問題の対処
            var hth = $(".ui-jqgrid-hbox .ui-jqgrid-htable", "#gview_" + gridID).height();
            if (hth == 0) {
                $(".ui-jqgrid-hbox .ui-jqgrid-htable", "#gview_" + gridID).find("tr").each(function () {
                    var wk = $(this).find("th").eq(0).height();
                    if (wk > 0 && hth > 0) {
                        wk++; //微調整 おそらくborderの高さ
                    }
                    hth += wk;
                });
                $(".ui-jqgrid-htable", "#gview_" + gridID).height(hth);
            }

            //リキッド処理を行うとページャーが正しい位置に表示されない問題の対処
            var gvh = $("#gview_" + gridID).height();
            if (gvh == 0) {
                gvh += $("#gview_" + gridID).find(">div.ui-jqgrid-hdiv .ui-jqgrid-htable").height();
                gvh += $("#gview_" + gridID).find(">div.ui-jqgrid-bdiv").height() + 1;
                $("#gview_" + gridID).height(gvh);
                var ph = 0;
                if (pagerVisilble) {
                    ph = $("#" + gridID + "_pager").height() + 1;
                }
                $("#gbox_" + gridID).height(gvh + ph);
            }

        },

        //ローカルフィルターモード時、かつ、複数行選択時の、全選択/全解除ボタンのクリック処理を上書きする
        overrideCbClick: function (gridID) {

            //jqGridでバインドされている処理を削除
            $("#gbox_" + gridID + " input[id='cb_" + gridID + "']").unbind("click");

            //処理をバインドし直す
            //  jqGrid.jsのL2588～L2629あたりをコピーして改造
            //  変更点
            //  ・表示行のみチェック状態を変更する
            //  ・表示有無にかかわらずチェックが付いている行のIDをselarrrowに入れる（行クリック時の動作に影響するため）
            $("#gbox_" + gridID + " input[id='cb_" + gridID + "']").bind("click", function () {
                var ts = _HRGrid.ts[gridID][0];
                var emp = [], chk;
                ts.p.selarrrow = [];
                var froz = ts.p.frozenColumns === true ? ts.p.id + "_frozen" : "";
                if (this.checked) {
                    $(ts.rows).each(function (i) {
                        if (i > 0) {
                            if (!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass('ui-state-disabled') && !$(this).hasClass("jqfoot")) {
                                if ($(this).css("display") != "none") {
                                    $("#jqg_" + $.jgrid.jqID(ts.p.id) + "_" + $.jgrid.jqID(this.id))[ts.p.useProp ? 'prop' : 'attr']("checked", true);
                                    $(this).addClass("ui-state-highlight").attr("aria-selected", "true");
                                }
                                if ($("#jqg_" + $.jgrid.jqID(ts.p.id) + "_" + $.jgrid.jqID(this.id))[ts.p.useProp ? 'prop' : 'attr']("checked") == true) {
                                    ts.p.selarrrow.push(this.id);
                                    ts.p.selrow = this.id;
                                }
                                if (froz) {
                                    if ($(this).css("display") != "none") {
                                        $("#jqg_" + $.jgrid.jqID(ts.p.id) + "_" + $.jgrid.jqID(this.id), ts.grid.fbDiv)[ts.p.useProp ? 'prop' : 'attr']("checked", true);
                                        $("#" + $.jgrid.jqID(this.id), ts.grid.fbDiv).addClass("ui-state-highlight");
                                    }
                                }
                            }
                        }
                    });
                    chk = true;
                    emp = [];
                }
                else {
                    $(ts.rows).each(function (i) {
                        if (i > 0) {
                            if (!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass('ui-state-disabled') && !$(this).hasClass("jqfoot")) {
                                if ($(this).css("display") != "none") {
                                    $("#jqg_" + $.jgrid.jqID(ts.p.id) + "_" + $.jgrid.jqID(this.id))[ts.p.useProp ? 'prop' : 'attr']("checked", false);
                                    $(this).removeClass("ui-state-highlight").attr("aria-selected", "false");
                                    emp.push(this.id);
                                    if (froz) {
                                        $("#jqg_" + $.jgrid.jqID(ts.p.id) + "_" + $.jgrid.jqID(this.id), ts.grid.fbDiv)[ts.p.useProp ? 'prop' : 'attr']("checked", false);
                                        $("#" + $.jgrid.jqID(this.id), ts.grid.fbDiv).removeClass("ui-state-highlight");
                                    }
                                } else {
                                    if ($("#jqg_" + $.jgrid.jqID(ts.p.id) + "_" + $.jgrid.jqID(this.id))[ts.p.useProp ? 'prop' : 'attr']("checked") == true) {
                                        ts.p.selarrrow.push(this.id);
                                    }
                                }
                            }
                        }
                    });
                    ts.p.selrow = null;
                    chk = false;
                }
                $(ts).triggerHandler("jqGridSelectAll", [chk ? ts.p.selarrrow : emp, chk]);
                if ($.isFunction(ts.p.onSelectAll)) { ts.p.onSelectAll.call(ts, chk ? ts.p.selarrrow : emp, chk); }
            });

        },

        //グルーピング
        groups: [],
        groups_getCollapsed: function (gridID, group) {
            var ret;
            if ($("#" + gridID + "ghead_" + group.id + " td span:eq(0)").hasClass("ui-icon-circlesmall-minus")) {
                ret = false;
            } else {
                ret = true;
            }
            return ret;
        },
        groups_setCollapsed: function (gridID, group, collapsed) {
            if (collapsed) {
                if (!_HRGrid.groups_getCollapsed(gridID, group)) {
                    $("#" + gridID).jqGrid("groupingToggle", gridID + "ghead_" + group.id);
                }
            } else {
                if (group.parentIndex >= 0) {
                    _HRGrid.groups_setCollapsed(gridID, _HRGrid.groups[gridID][group.parentIndex], collapsed);
                }
                if (_HRGrid.groups_getCollapsed(gridID, group)) {
                    $("#" + gridID).jqGrid("groupingToggle", gridID + "ghead_" + group.id);
                }
            }
        },
        groups_onSelectRow: function (gridID, rowId) {
            //グリッドの行選択時に、所属するグループのチェックボックスを制御する

            //最下層のグループは、配下の列の行選択用チェックボックスの状態で制御
            var $groupHeader = $("#" + gridID).find("tr.jqgrow[id='" + rowId + "']").closest('tr').prevAll('tr.jqgroup:first');
            //var wk = $groupHeader.get(0).className.match(new RegExp(_gridID + "ghead_(\\d+)"));
            var wk = $groupHeader.attr("class").match(new RegExp(gridID + "ghead_(\\d+)"));
            var groupHeaderClass = wk[0];
            var groupHeaderLevel = Number(wk[1]);
            var $checkboxes = $groupHeader.nextUntil('tr.jqgroup.' + groupHeaderClass).find('input.cbox[type="checkbox"]');
            var id = $groupHeader.attr("id");

            if ($checkboxes.filter(':checked').length == $checkboxes.length) {
                $groupHeader.find('input[type="checkbox"]').prop("checked", true).prop("indeterminate", false);
                $("#" + gridID + "_frozen tr[id='" + id + "']").find('input[type="checkbox"]').prop("checked", true).prop("indeterminate", false);
            } else if ($checkboxes.filter(':checked').length > 0) {
                $groupHeader.find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", true);
                $("#" + gridID + "_frozen tr[id='" + id + "']").find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", true);
            } else {
                $groupHeader.find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", false);
                $("#" + gridID + "_frozen tr[id='" + id + "']").find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", false);
            }

            //上位のグループは、１階層下のグループのチェックボックスの状態で制御
            for (; ; ) {
                if (groupHeaderLevel <= 0) {
                    //最上位まで済んだら処理を抜ける → 全選択用のチェックボックスを制御する？ → 通常の画面と動きが変わるので保留
                    break;
                }

                groupHeaderLevel--;
                groupHeaderClass = gridID + "ghead_" + groupHeaderLevel;
                childGroupHeaderClass = gridID + "ghead_" + (groupHeaderLevel + 1);

                $groupHeader = $groupHeader.prevAll('tr.jqgroup.' + groupHeaderClass + ':first');
                $checkboxes = $groupHeader.nextUntil('tr.jqgroup.' + groupHeaderClass).filter('tr.jqgroup.' + childGroupHeaderClass).find('input[type="checkbox"]');
                id = $groupHeader.attr("id");

                if ($checkboxes.filter(':checked').length == $checkboxes.length) {
                    $groupHeader.find('input[type="checkbox"]').prop("checked", true).prop("indeterminate", false);
                    $("#" + gridID + "_frozen tr[id='" + id + "']").find('input[type="checkbox"]').prop("checked", true).prop("indeterminate", false);
                } else if ($checkboxes.filter(':checked').length + $checkboxes.filter(function () { return $(this).prop('indeterminate'); }).length > 0) {
                    $groupHeader.find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", true);
                    $("#" + gridID + "_frozen tr[id='" + id + "']").find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", true);
                } else {
                    $groupHeader.find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", false);
                    $("#" + gridID + "_frozen tr[id='" + id + "']").find('input[type="checkbox"]').prop("checked", false).prop("indeterminate", false);
                }
            }
        },

        //ラベルのフォーマット
        LabelFormat: function (cellvalue, options, rowObject, act) {
            //if (act == "add") {
            var style = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            }
            var html = "<span style='" + style + "'>" + cellvalue.value + "</span>";
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;

            //}
        },
        LabelUnFormat: function (cellvalue, options, cell) {
            var ret = $(cell).text();
            if (ret == undefined) {
                ret = "";
            }
            return ret;
        },

        //リンクボタンのフォーマット
        LinkFormat: function (cellvalue, options, rowObject, act) {
            //if (act == "add") {
            var style = "";
            var onclick = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            } else if (cellvalue.enabled == false) {
                onclick = "";
                style = "text-decoration: underline;";
            } else if (cellvalue.readonly == true) {
                onclick = "";
                style = "";
            } else {
                onclick = "HRGridLinkClick='1'";
                style = "text-decoration: underline; cursor: pointer; color: #0066cc;";
            }

            var html = "<span " + onclick + " style='" + style + "'>" + cellvalue.value + "</span>";
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;

            //}
        },
        LinkUnFormat: function (cellvalue, options, cell) {
            var ret = $(cell).text();
            if (ret == undefined) {
                ret = "";
            }
            return ret;
        },

        //イメージボタンのフォーマット
        ImageButtonFormat: function (cellvalue, options, rowObject, act) {
            //if (act == "add") {

            var src = "";
            var tooltip = "";
            var cssClass = "";

            if (!cellvalue.imageButton) {
                src = options.colModel.editoptions.ImageUrl;
                tooltip = options.colModel.editoptions.ToolTip;
                cssClass = options.colModel.editoptions.CssClass;
            } else {
                src = cellvalue.imageButton.ImageUrl;
                tooltip = cellvalue.imageButton.ToolTip;
                cssClass = cellvalue.imageButton.CssClass;
            }

            var style = "";
            var onclick = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            } else if (cellvalue.enabled == false) {
                onclick = "";
                style = "";
            } else if (cellvalue.readonly == true) {
                onclick = "";
                style = "";
            } else {
                onclick = "HRGridImageClick='1'";
                style = "cursor: pointer;";
            }

            if (src == "") {
                return "";
            }
            var html = "<img src='" + src + "' alt='' title='" + tooltip + "' " + onclick + " style='" + style + "' class='" + cssClass + "' >";
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;

            //}
        },
        ImageButtonUnFormat: function (cellvalue, options, cell) {
            return "";
        },

        //テキストボックスのフォーマット
        TextBoxFormat: function (cellvalue, options, rowObject, act) {
            //if (act == "add") {


            var style = "";
            var disabled = "";
            var readonly = "";
            var onkeydown = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            } else if (cellvalue.enabled == false) {
                disabled = "disabled";
            } else if (cellvalue.readonly == true) {
                readonly = "readonly";
            } else {
                onkeydown = "HRGridTextKeyDown='1'";
            }

            var imemode = options.colModel.imemode;
            if (cellvalue.textBox) {
                var imemode2 = cellvalue.textBox.imemode;
                if (imemode2) {
                    imemode = imemode2;
                }
            }
            if (imemode) {
                style += " ime-mode: " + imemode + ";";
            }

            var value = cellvalue.value;
            value = value.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/'/gi, "&apos;");

            //var html = "<input type='text' value='" + cellvalue.value + "' style='width: 95%;" + style + "' " + disabled + " " + readonly + " " + onkeydown + " />";
            var html = "<input type='text' value='" + value + "' style='width: 95%;" + style + "' " + disabled + " " + readonly + " " + onkeydown + " />";
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;

            //}
        },
        TextBoxUnFormat: function (cellvalue, options, cell) {
            var ret = $('input[type="text"]', cell).val();
            if (ret == undefined) {
                ret = "";
            }
            return ret;
        },

        //ドロップダウンリストのフォーマット
        DropDownListFormat: function (cellvalue, options, rowObject, act) {

            //if (act == "add") {

            //フィルターツールバーのデコード処理
            //ドロップダウンリストの項目に:や'などが含まれると正しく処理できないので
            //SV側でHttpUtility.UrlEncodeUnicodeを使ってエンコードして、CL側でunescapeを使ってデコードして処理した
            //HttpUtility.UrlEncodeやdecodeURIなども試したが組み合わせで動かない場合があったので使っていない
            if (options.colModel.searchoptions.filterToolbarDecode == false) {
                var $combo = $("#gbox_" + options.gid + " table.ui-search-table select#gs_" + options.colModel.index);
                if ($combo.length > 0) {
                    $combo.find("option").each(function () {
                        var $opt = $(this);
                        $opt.val(unescape($opt.val()));
                        $opt.text(unescape($opt.text()));
                    });
                }
                options.colModel.searchoptions.filterToolbarDecode = true;
            }

            var style = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            }
            var disabled = "";
            if (cellvalue.enabled == false) {
                disabled = "disabled";
            }

            var html = [];
            if (cellvalue.readonly == true) {
                //DropDownListにreadonlyはない→ラベルで表示する

                var isHit = false;

                //列設定項目
                if (!cellvalue.clearDropDownListItem) {
                    var editoptionsValue = options.colModel.editoptions.value;
                    var editoptions = editoptionsValue.split(";");
                    for (var i = 0; i < editoptions.length; i++) {
                        var editoption = editoptions[i].split(":");
                        var value = editoption[0];
                        var text = editoption[1];

                        //ドロップダウンリストの項目に:や'などが含まれると正しく処理できないので
                        //SV側でHttpUtility.UrlEncodeUnicodeを使ってエンコードして、CL側でunescapeを使ってデコードして処理した
                        //HttpUtility.UrlEncodeやdecodeURIなども試したが組み合わせで動かない場合があったので使っていない
                        value = unescape(value);
                        text = unescape(text);

                        if (cellvalue.value == value) {
                            html.push("<span value='" + value + "' " + selected + ">" + text + "<span>");
                            isHit = true;
                            break;
                        }
                    }
                }

                //追加項目
                if (!isHit && cellvalue.dropDownList) {
                    var editoptionsValue = cellvalue.dropDownList;
                    var editoptions = editoptionsValue.split(";");
                    for (var i = 0; i < editoptions.length; i++) {
                        var editoption = editoptions[i].split(":");
                        var value = editoption[0];
                        var text = editoption[1];

                        //ドロップダウンリストの項目に:や'などが含まれると正しく処理できないので
                        //SV側でHttpUtility.UrlEncodeUnicodeを使ってエンコードして、CL側でunescapeを使ってデコードして処理した
                        //HttpUtility.UrlEncodeやdecodeURIなども試したが組み合わせで動かない場合があったので使っていない
                        value = unescape(value);
                        text = unescape(text);

                        //フィルターツールバーの検索コンボにも追加する
                        var $combo = $("#gbox_" + options.gid + " table.ui-search-table select#gs_" + options.colModel.index);
                        if ($combo.length > 0) {
                            if ($combo.find("option[value='" + value + "']:contains('" + text + "')").length == 0) {
                                $combo.append("<option value='" + value + "'>" + text + "</option>");
                            }
                        }

                        if (cellvalue.value == value) {
                            html.push("<span value='" + value + "' " + selected + ">" + text + "<span>");
                            break;
                        }
                    }
                }

            } else {
                //readonlyでなければDropDownListで表示する

                html.push("<select style='width: 95%;" + style + "' " + disabled + " HRGridDDLChange='1'>");

                var isHit = false;

                //列設定項目
                if (!cellvalue.clearDropDownListItem) {
                    var editoptionsValue = options.colModel.editoptions.value;
                    var editoptions = editoptionsValue.split(";");
                    for (var i = 0; i < editoptions.length; i++) {
                        var editoption = editoptions[i].split(":");
                        var value = editoption[0];
                        var text = editoption[1];

                        //ドロップダウンリストの項目に:や'などが含まれると正しく処理できないので
                        //SV側でHttpUtility.UrlEncodeUnicodeを使ってエンコードして、CL側でunescapeを使ってデコードして処理した
                        //HttpUtility.UrlEncodeやdecodeURIなども試したが組み合わせで動かない場合があったので使っていない
                        value = unescape(value);
                        text = unescape(text);

                        var selected = "";
                        if (!isHit && cellvalue.value == value) {
                            selected = "selected";
                            isHit = true;
                        }
                        html.push("<option value='" + value + "' " + selected + ">" + text);
                    }
                }

                //追加項目
                if (cellvalue.dropDownList) {
                    var editoptionsValue = cellvalue.dropDownList;
                    var editoptions = editoptionsValue.split(";");
                    for (var i = 0; i < editoptions.length; i++) {
                        var editoption = editoptions[i].split(":");
                        var value = editoption[0];
                        var text = editoption[1];

                        //ドロップダウンリストの項目に:や'などが含まれると正しく処理できないので
                        //SV側でHttpUtility.UrlEncodeUnicodeを使ってエンコードして、CL側でunescapeを使ってデコードして処理した
                        //HttpUtility.UrlEncodeやdecodeURIなども試したが組み合わせで動かない場合があったので使っていない
                        value = unescape(value);
                        text = unescape(text);

                        var selected = "";
                        if (!isHit && cellvalue.value == value) {
                            selected = "selected";
                            isHit = true;
                        }
                        html.push("<option value='" + value + "' " + selected + ">" + text);

                        //フィルターツールバーの検索コンボにも追加する
                        var $combo = $("#gbox_" + options.gid + " table.ui-search-table select#gs_" + options.colModel.index);
                        if ($combo.length > 0) {
                            if ($combo.find("option[value='" + value + "']:contains('" + text + "')").length == 0) {
                                $combo.append("<option value='" + value + "'>" + text + "</option>");
                            }
                        }
                    }
                }

                html.push("</select>");

            }

            html = html.join("");
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;


            //}

        },
        DropDownListUnFormat: function (cellvalue, options, cell) {
            var ret;

            if ($('select', cell).length != 0) {
                ret = $('select', cell).val();
            } else {
                ret = $('span', cell).attr('value');
            }

            if (ret == undefined) {
                ret = "";
            }
            return ret;
        },

        //ラジオボタンのフォーマット
        RadioButtonFormat: function (cellvalue, options, rowObject, act) {

            var style = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            }
            var disabled = "";
            if (cellvalue.enabled == false) {
                disabled = "disabled";
            }
            //radioにreadonlyはないのでdisabledにする
            if (cellvalue.readonly == true) {
                disabled = "disabled";
            }

            var name = options.gid + "_" + options.rowId + "_" + options.colModel.index;
            var html = [];

            var idCnt = 0;

            //列設定項目
            if (!cellvalue.clearRadioButtonItem) {
                var editoptionsValue = options.colModel.editoptions.value;
                var editoptions = editoptionsValue.split(";");
                for (var i = 0; i < editoptions.length; i++) {
                    var editoption = editoptions[i].split(":");
                    var value = editoption[0];
                    var text = editoption[1];

                    var id = name + "_" + idCnt;
                    idCnt++;

                    var checked = "";
                    if (cellvalue.value == value) {
                        checked = "checked='checked'";
                    }
                    var onclick = "HRGridLabelClick='1'";

                    html.push("<input type='radio' name='" + name + "' id='" + id + "' value='" + value + "' style='cursor: pointer; padding-top: 0px; padding-left: 5px; " + style + "' " + checked + " " + disabled + "><label for='" + id + "' " + onclick + " style='cursor: pointer; display:inline-block; vertical-align:bottom; height: 17px; padding-right: 5px;" + style + "'>" + text + "</label>");
                }
            }

            //追加項目
            if (cellvalue.radioButton) {
                var editoptionsValue = cellvalue.radioButton; ;
                var editoptions = editoptionsValue.split(";");
                for (var i = 0; i < editoptions.length; i++) {
                    var editoption = editoptions[i].split(":");
                    var value = editoption[0];
                    var text = editoption[1];

                    var id = name + "_" + idCnt;
                    idCnt++;

                    var checked = "";
                    if (cellvalue.value == value) {
                        checked = "checked='checked'";
                    }
                    var onclick = "onclick='$(\"#" + options.gid + "\").attr(\"_cancelRowSelect\", \"1\");'";

                    html.push("<input type='radio' name='" + name + "' id='" + id + "' value='" + value + "' style='cursor: pointer; padding-top: 0px; padding-left: 5px; " + style + "' " + checked + " " + disabled + "><label for='" + id + "' " + onclick + " style='cursor: pointer; display:inline-block; vertical-align:bottom; height: 17px; padding-right: 5px;" + style + "'>" + text + "</label>");

                    //フィルターツールバーの検索コンボにも追加する
                    var $combo = $("#gbox_" + options.gid + " table.ui-search-table select#gs_" + options.colModel.index);
                    if ($combo.length > 0) {
                        if ($combo.find("option[value='" + value + "']:contains('" + text + "')").length == 0) {
                            $combo.append("<option value='" + value + "'>" + text + "</option>");
                        }
                    }
                }
            }

            html = html.join("");
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;

        },
        RadioButtonUnFormat: function (cellvalue, options, cell) {
            var ret = $('input:checked', cell).val();
            if (ret == undefined) {
                ret = "";
            }
            return ret;
        },

        //チェックボックスのフォーマット
        CheckBoxFormat: function (cellvalue, options, rowObject, act) {
            var style = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            }
            var disabled = "";
            if (cellvalue.enabled == false) {
                disabled = "disabled";
            }
            //checkboxにreadonlyはないのでdisabledにする
            if (cellvalue.readonly == true) {
                disabled = "disabled";
            }

            var name = options.gid + "_" + options.rowId + "_" + options.colModel.index;
            var html = [];

            var idCnt = 0;

            //列設定項目
            if (!cellvalue.clearCheckBoxItem) {
                var editoptionsValue = options.colModel.editoptions.value;
                var editoptions = editoptionsValue.split(";");
                for (var i = 0; i < editoptions.length; i++) {
                    var editoption = editoptions[i].split(":");
                    var value = editoption[0];
                    var text = editoption[1];

                    var id = name + "_" + idCnt;
                    idCnt++;

                    var checked = "";
                    var valueAry = cellvalue.value.split(",");
                    for (var j = 0; j < valueAry.length; j++) {
                        if (valueAry[j] == value) {
                            checked = "checked='checked'";
                            break;
                        }
                    }
                    var onclick = "HRGridLabelClick='1'";

                    html.push("<input type='checkbox' name='" + name + "' id='" + id + "' value='" + value + "' style='cursor: pointer; padding-top: 0px; padding-left: 5px; " + style + "' " + checked + " " + disabled + "><label for='" + id + "' " + onclick + " style='cursor: pointer; display:inline-block; vertical-align:bottom; height: 17px; padding-right: 5px;" + style + "'>" + text + "</label>");
                }
            }

            //追加項目
            if (cellvalue.checkBox) {
                var editoptionsValue = cellvalue.checkBox;
                var editoptions = editoptionsValue.split(";");
                for (var i = 0; i < editoptions.length; i++) {
                    var editoption = editoptions[i].split(":");
                    var value = editoption[0];
                    var text = editoption[1];

                    var id = name + "_" + idCnt;
                    idCnt++;

                    var checked = "";
                    var valueAry = cellvalue.value.split(",");
                    for (var j = 0; j < valueAry.length; j++) {
                        if (valueAry[j] == value) {
                            checked = "checked='checked'";
                            break;
                        }
                    }
                    var onclick = "onclick='$(\"#" + options.gid + "\").attr(\"_cancelRowSelect\", \"1\");'";

                    html.push("<input type='checkbox' name='" + name + "' id='" + id + "' value='" + value + "' style='cursor: pointer; padding-top: 0px; padding-left: 5px; " + style + "' " + checked + " " + disabled + "><label for='" + id + "' " + onclick + " style='cursor: pointer; display:inline-block; vertical-align:bottom; height: 17px; padding-right: 5px;" + style + "'>" + text + "</label>");

                    //フィルターツールバーの検索コンボにも追加する
                    var $combo = $("#gbox_" + options.gid + " table.ui-search-table select#gs_" + options.colModel.index);
                    if ($combo.length > 0) {
                        if ($combo.find("option[value='" + value + "']:contains('" + text + "')").length == 0) {
                            $combo.append("<option value='" + value + "'>" + text + "</option>");
                        }
                    }
                }
            }

            html = html.join("");
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, false);
            }
            return html;

        },
        CheckBoxUnFormat: function (cellvalue, options, cell) {
            var ret = "";
            var commma = "";
            $('input:checked', cell).each(function (i) {
                ret += commma + $(this).val();
                commma = ",";
            });

            if (ret == undefined) {
                ret = "";
            }
            return ret;
        },

        //ボタンのフォーマット
        ButtonFormat: function (cellvalue, options, rowObject, act) {
            //if (act == "add") {
            var style = "";
            if (cellvalue.visible == false) {
                style = "visibility: hidden;";
            }
            var html = "";
            if (options.colModel.button) {
                html = _HRGrid.SubButtonFormat(html, cellvalue, options, true);
            }
            return html;

            //}
        },
        ButtonUnFormat: function (cellvalue, options, cell) {
            return "";
        },

        //セル内にボタンを追加する時のフォーマットの編集
        SubButtonFormat: function (format, cellvalue, options, flg) {

            var imageurl = options.colModel.button.imageurl;
            var width = options.colModel.button.width;
            var height = options.colModel.button.height;

            var button;
            if (cellvalue.button) {
                button = cellvalue.button;
            } else {
                button = options.colModel.button;
            }
            var text = button.text;
            var tooltip = button.tooltip;
            var cssClass = button.cssClass;

            var disabled = "";
            if (!button.enabled) {
                disabled = "disabled=disabled";
            }

            var visibility = "";
            if (!button.visible) {
                visibility = "visibility: hidden;"
            }

            var buttonHtml = [];
            buttonHtml.push("<input");
            buttonHtml.push(" type='button'");
            buttonHtml.push(" value='" + text + "'");
            buttonHtml.push(" title=''");
            buttonHtml.push(" balloonhint='" + tooltip + "'");
            buttonHtml.push(" class='" + cssClass + "'");
            buttonHtml.push(" style='width: " + width + "px; height: " + height + "px; background-image: url(" + imageurl + "); " + visibility + "'");
            buttonHtml.push(" " + disabled);
            buttonHtml.push(" />");

            var html = [];

            if (flg) {
                html.push(buttonHtml.join(""));
            } else {
                //memo:セル内の右側に固定幅の枠、左側に可変幅の枠を配置したいが、IE8対応が必要なのでcalcとflexが使えない、jqGridの制限でtableタグの埋め込みもできないので、divタグを重ねて対応
                html.push("<div style='overflow: hidden; white-space: nowrap;'>");
                html.push("  <div style='width: 100%; float:left; margin-right:-" + width + "px; padding-right: " + width + "px; box-sizing: border-box; text-align: " + options.colModel.align + "; height: " + height + "px;'>");
                html.push("    <div style='display: table; width: 100%; height: 100%;'>");
                html.push("      <div style='display: table-cell; vertical-align: middle; text-align: center;'>");
                html.push(format);
                html.push("      </div>");
                html.push("    </div>");
                html.push("  </div>");
                html.push("  <div style='width: " + width + "px;'>");
                html.push(buttonHtml.join(""));
                html.push("  </div>");
                html.push("</div>");
            }

            return html.join("");
        }

    };
}
var HRGrid;
if (!HRGrid) {
    HRGrid = function (gridID) {

        //先頭に#が付いていたら消す
        if (gridID.substr(0, 1) == "#") {
            gridID = gridID.substr(1);
        }
        var _gridID = gridID;
        var _$grid = $("#" + gridID);

        //var _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');  //グリッドが作られる前にHRGrid()を呼び出している画面があったのでここでgetGridParamしないように変更
        var _HRGridOptions;

        return {

            //行数取得
            GetRowCount: function () {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    return rowIds.length;
                } else {
                    return _$grid.find("tr.jqgrow:visible").length;
                }
            },

            //行データ取得
            //・DnDソート行番号対応済み
            GetRowData: function (rowIndex) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    var row = _$grid.getRowData(rowIds[rowIndex]);        //DnDソートした結果の順番に取れる
                    return row;
                } else {
                    var rowId = _$grid.find("tr.jqgrow:visible:eq(" + rowIndex + ")").attr("id");
                    var row = _$grid.getRowData(Number(rowId));
                    return row;
                }
            },

            //全行データ取得
            GetAllRowData: function (getHiddenRow) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode || getHiddenRow == true) {
                    var allData = [];
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (var i = 0; i < rowIds.length; i++) {
                        var row = _$grid.getRowData(rowIds[i]);
                        allData.push(row);
                    };
                    return allData;
                } else {
                    var allData = [];
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    $trs.each(function () {
                        var rowId = $(this).attr("id");
                        var row = _$grid.getRowData(Number(rowId));
                        allData.push(row);
                    });
                    return allData;
                }
            },

            //セルの値を取得
            GetCellData: function (rowIndex, colName) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    var row = _$grid.getRowData(rowIds[rowIndex]);
                    return row[colName];
                } else {
                    var rowId = _$grid.find("tr.jqgrow:visible:eq(" + rowIndex + ")").attr("id");
                    var row = _$grid.getRowData(Number(rowId));
                    return row[colName];
                }
            },

            //セルに値を設定
            SetCellData: function (rowIndex, colName, data) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');

                    var cellValue;
                    var cellValues = _HRGrid.cellValues[_gridID];
                    for (var i = 0; i < cellValues.length; i++) {
                        if (cellValues[i].id == rowIds[rowIndex]) {
                            cellValue = cellValues[i][colName];
                            break;
                        }
                    }

                    if (cellValue) {
                        if (typeof data != "string") {
                            data = data.toString();
                        }
                        cellValue.value = data;
                        _$grid.jqGrid('setCell', rowIds[rowIndex], colName, cellValue);

                        //setCellは固定列の項目に反映されないので直接セルの中身を書き換える（固定列はラベルかリンクだけなのでタグ構成は決め打ち）
                        var colModel = _$grid.jqGrid('getGridParam', 'colModel');
                        for (var i = 0; i < colModel.length; i++) {
                            if (colModel[i].index && colModel[i].index == colName && colModel[i].frozen) {
                                $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + colName + "']", $("#" + _gridID + "_frozen")).eq(rowIndex).find("span").text(data);
                                break;
                            }
                        }
                    }
                } else {
                    var rowId = _$grid.find("tr.jqgrow:visible:eq(" + rowIndex + ")").attr("id");

                    var cellValue;
                    var cellValues = _HRGrid.cellValues[_gridID];
                    for (var i = 0; i < cellValues.length; i++) {
                        if (cellValues[i].id == rowId) {
                            cellValue = cellValues[i][colName];
                            break;
                        }
                    }

                    if (cellValue) {
                        if (typeof data != "string") {
                            data = data.toString();
                        }
                        cellValue.value = data;
                        _$grid.jqGrid('setCell', rowId, colName, cellValue);

                        //setCellは固定列の項目に反映されないので直接セルの中身を書き換える（固定列はラベルかリンクだけなのでタグ構成は決め打ち）
                        var colModel = _$grid.jqGrid('getGridParam', 'colModel');
                        for (var i = 0; i < colModel.length; i++) {
                            if (colModel[i].index && colModel[i].index == colName && colModel[i].frozen) {
                                $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + colName + "']:visible", $("#" + _gridID + "_frozen")).eq(rowIndex).find("span").text(data);
                                break;
                            }
                        }
                    }

                }
            },

            //行を選択状態にする
            //・DnDソート行番号対応済み
            SetSelection: function (rowIndex, onsr) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    if (_$grid.jqGrid('getGridParam', 'multiselect')) {
                        //複数選択可の場合は選択状態がトグルするので一旦選択解除
                        _$grid.jqGrid("resetSelection", rowIds[rowIndex]);
                    }
                    if (onsr == true) {
                        _$grid.jqGrid("setSelection", rowIds[rowIndex], true);
                    } else {
                        _$grid.jqGrid("setSelection", rowIds[rowIndex], false);
                    }
                } else {
                    var rowId = _$grid.find("tr.jqgrow:visible:eq(" + rowIndex + ")").attr("id");
                    if (_$grid.jqGrid('getGridParam', 'multiselect')) {
                        //複数選択可の場合は選択状態がトグルするので一旦選択解除
                        _$grid.jqGrid("resetSelection", rowId);
                    }
                    if (onsr == true) {
                        _$grid.jqGrid("setSelection", rowId, true);
                    } else {
                        _$grid.jqGrid("setSelection", rowId, false);
                    }
                }

            },

            //行の選択状態を解除
            //・DnDソート行番号対応済み
            ResetSelection: function (rowIndex) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    _$grid.jqGrid("resetSelection", rowIds[rowIndex]);
                    //★TODO:onselectrowの呼び出し？
                } else {
                    var rowId = _$grid.find("tr.jqgrow:visible:eq(" + rowIndex + ")").attr("id");
                    _$grid.jqGrid("resetSelection", rowId);
                    //★TODO:onselectrowの呼び出し？
                }
            },

            //選択状態の行番号を取得
            //・DnDソート行番号対応済み
            GetSelectionIndex: function () {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');

                    if (!_$grid.jqGrid('getGridParam', 'multiselect')) {
                        //単一選択の場合は数値を返す
                        var ret = -1;
                        var selrow = _$grid.getGridParam("selrow");
                        for (var i = 0; i < rowIds.length; i++) {
                            if (selrow == rowIds[i]) {
                                ret = i;
                                break;
                            }
                        }
                        return ret;

                    } else {
                        //複数選択可の場合は配列を返す
                        var selarrrow = _$grid.getGridParam("selarrrow");
                        var wk = [];
                        $.each(selarrrow, function (i, value) {
                            for (var i = 0; i < rowIds.length; i++) {
                                if (value == rowIds[i]) {
                                    wk.push(i);
                                    return true;
                                }
                            }
                        });
                        var ret = wk.sort(function (a, b) {
                            return (Number(a) > Number(b) ? 1 : -1);
                        });
                        return ret;
                    }

                } else {
                    if (!_$grid.jqGrid('getGridParam', 'multiselect')) {
                        //単一選択の場合は数値を返す
                        var ret = -1;
                        var $trs = _$grid.find("tr.jqgrow:visible");
                        if ($trs.length > 0) {
                            for (var i = 0; i < $trs.length; i++) {
                                if ($trs.eq(i).hasClass("ui-state-highlight")) {
                                    ret = i;
                                    break;
                                }
                            }
                        }
                        return ret;

                    } else {
                        //複数選択可の場合は配列を返す
                        var wk = [];
                        var $trs = _$grid.find("tr.jqgrow:visible");
                        if ($trs.length > 0) {
                            for (var i = 0; i < $trs.length; i++) {
                                if ($trs.eq(i).hasClass("ui-state-highlight")) {
                                    wk.push(i);
                                }
                            }
                        }
                        ret = wk;
                        return ret;
                    }

                }
            },

            //指定行が選択状態かどうかを返す
            IsSelectedRow: function (rowIndex) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var ret = false;
                    var rowIds = _$grid.jqGrid('getDataIDs');

                    if (!_$grid.jqGrid('getGridParam', 'multiselect')) {
                        //単一選択の場合
                        var selrow = _$grid.getGridParam("selrow");
                        if (selrow == rowIds[rowIndex]) {
                            ret = true;
                        }
                        return ret;

                    } else {
                        //複数選択可の場合
                        var selarrrow = _$grid.getGridParam("selarrrow");
                        for (var i = 0; i < selarrrow.length; i++) {
                            if (selarrrow[i] == rowIds[rowIndex]) {
                                ret = true;
                                break;
                            }
                        }
                        return ret;
                    }

                } else {
                    var ret = false;

                    var $trs = _$grid.find("tr.jqgrow:visible:eq(" + rowIndex + ")");
                    if ($trs.length > 0) {
                        if ($trs.eq(0).hasClass("ui-state-highlight")) {
                            ret = true;
                        }
                    }
                    return ret;

                }
            },

            //列を表示する
            ShowCol: function (colName) {
                _$grid.jqGrid("showCol", colName);
            },

            //列を非表示にする
            HideCol: function (colName) {
                _$grid.jqGrid("hideCol", colName);
            },

            //表示中のページ番号を取得
            GetCurrentPage: function () {
                return _$grid.jqGrid('getGridParam', 'page');
            },

            //最終ページ番号を取得
            GetLastPage: function () {
                return _$grid.jqGrid('getGridParam', 'lastpage');
            },

            //グリッドの横幅を取得する
            GetWidth: function () {
                return $('#gbox_' + _gridID).width();
            },

            //グリッドの横幅を設定する
            SetWidth: function (width) {

                var orgWidth = $('#gbox_' + _gridID).width();

                //グリッドの幅設定
                _$grid.jqGrid("setGridWidth", width, false);

                //リキッド対応 グリッド横幅の変更差分をfixWidthに足す
                $("." + _gridID + "-liquid-1, ." + _gridID + "-liquid-2").each(function (e, obj) {
                    var thisObj = $(this);
                    var windowObj = $(window);
                    var orgFixWidth = Number(thisObj.attr("fixWidth"));
                    thisObj.attr("fixWidth", orgFixWidth + (orgWidth - width));
                });
                $("." + _gridID + "-liquid-w-1, ." + _gridID + "-liquid-w-2").each(function (e, obj) {
                    var thisObj = $(this);
                    var windowObj = $(window);
                    var orgFixWidth = Number(thisObj.attr("fixWidth"));
                    thisObj.attr("fixWidth", orgFixWidth + (orgWidth - width));
                });

            },

            GetHeight: function () {
                return $('#gbox_' + _gridID + ' div.ui-jqgrid-bdiv').height();
            },

            SetHeight: function (height) {

                var orgHeight = $('#gbox_' + _gridID + ' div.ui-jqgrid-bdiv').height();

                //グリッドの縦幅設定
                _$grid.jqGrid("setGridHeight", height);

                //リキッド対応 グリッド縦幅の変更差分をfixHeightに足す
                $("." + _gridID + "-liquid-1, ." + _gridID + "-liquid-2").each(function (e, obj) {
                    var thisObj = $(this);
                    var windowObj = $(window);
                    var orgFixHeight = Number(thisObj.attr("fixHeight"));
                    thisObj.attr("fixHeight", orgFixHeight + (orgHeight - height));
                });
                $("." + _gridID + "-liquid-h-1, ." + _gridID + "-liquid-h-2").each(function (e, obj) {
                    var thisObj = $(this);
                    var windowObj = $(window);
                    var orgFixHeight = Number(thisObj.attr("fixHeight"));
                    thisObj.attr("fixHeight", orgFixHeight + (orgHeight - height));
                });

                //縦幅の変更が画面に反映されない場合があるのでリサイズイベントを起こして反映させる（原因不明）
                $(window).trigger("resize");

            },

            //
            GetDropDownList: function (rowIndex, colName) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var ret = $("#" + _gridID + " tr.jqgrow").eq(rowIndex).find("td[aria-describedby='" + _gridID + "_" + colName + "'] select")[0];
                    return ret;
                } else {
                    var ret = $("#" + _gridID + " tr.jqgrow:visible").eq(rowIndex).find("td[aria-describedby='" + _gridID + "_" + colName + "'] select")[0];
                    return ret;
                }
            },

            GetSortName: function () {
                var ret = _$grid.jqGrid('getGridParam', 'sortname');
                return ret;
            },
            GetSortOrder: function () {
                var ret = _$grid.jqGrid('getGridParam', 'sortorder');
                return ret;
            },

            GetScrollPosition: function () {
                var $divBody = $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').eq(0);
                return $divBody.scrollTop();
            },
            SetScrollPosition: function (value) {
                var $divBody = $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').eq(0);
                $divBody.scrollTop(value);
            },

            onSortCol: function (sortname, idxcol, sortorder) {
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var ret = _$grid.triggerHandler('SortCol', [sortname, sortorder]);
                    return ret;

                } else {

                    var $trs = $("#" + _gridID + " tr.jqgrow:visible");

                    var colModel = _$grid.jqGrid('getGridParam', 'colModel');
                    var ftype = "";
                    for (var k = 0; k < colModel.length; k++) {
                        if (colModel[k].index && colModel[k].index == sortname) {
                            ftype = colModel[k].searchoptions.ftype;
                            break;
                        }
                    }

                    //var cellValues = _HRGrid.cellValues[_gridID];
                    var cellValues = [];
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (var i = 0; i < rowIds.length; i++) {
                        var row = _$grid.getRowData(rowIds[i]);
                        row.id = rowIds[i];
                        cellValues.push(row);
                    };

                    //cellValues.sort(function (a, b) {
                    //
                    //    //var aval = a[sortname].value;
                    //    //var bval = b[sortname].value;
                    //    var aval = a[sortname];
                    //    var bval = b[sortname];
                    //
                    //    if (ftype == "default" || ftype == "number") {
                    //        if (!isNaN(aval) && !isNaN(bval)) {
                    //            aval = Number(aval);
                    //            bval = Number(bval);
                    //        }
                    //    }
                    //
                    //    if (sortorder == "asc") {
                    //        if (aval > bval) {
                    //            return 1;
                    //        } else if (aval < bval) {
                    //            return -1;
                    //        } else {
                    //            return 0;
                    //        }
                    //    } else {
                    //        if (aval < bval) {
                    //            return 1;
                    //        } else if (aval > bval) {
                    //            return -1;
                    //        } else {
                    //            return 0;
                    //        }
                    //    }
                    //
                    //});
                    cellValues.sort(function (a, b) {

                        //var aval = a[sortname].value;
                        //var bval = b[sortname].value;
                        var aval = a[sortname];
                        var bval = b[sortname];

                        //以下は自然順ソートを行うためnatsort.jsのロジックを改変して使用
                        /**
                        * natsort.js
                        * Sort an array using a "natural order" algorithm.
                        *
                        * @version 1.2.4
                        * @author think49
                        * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
                        * @url https://gist.github.com/660141
                        * @see <a href="http://sourcefrog.net/projects/natsort/">Natural Order String Comparison</a>
                        */

                        var reg1, reg2, result1, result2, number1, number2, token1, token2, diff;

                        string1 = String(aval);
                        string2 = String(bval);

                        if (string1 === string2) {
                            return 0;
                        }

                        reg1 = /(\d+(?:\.\d+)?)|\D+/g;
                        reg2 = /(\d+(?:\.\d+)?)|\D+/g;

                        //検索条件タイプを数値にしている場合はカンマ区切りの数値対応
                        if (ftype == "number") {
                            reg1 = /(\d{1,3}(?:,\d{3})*(?:\.\d+)?)|(\d+(?:\.\d+)?)|\D+/g;
                            reg2 = /(\d{1,3}(?:,\d{3})*(?:\.\d+)?)|(\d+(?:\.\d+)?)|\D+/g;
                        }

                        while (result1 = reg1.exec(string1), result2 = reg2.exec(string2), result1 && result2) {
                            number1 = result1[1];
                            number2 = result2[1];

                            if (number1 && number2) {

                                if (ftype == "number") {
                                    number1 = number1.replace(/,/gi, "");
                                    number2 = number2.replace(/,/gi, "");
                                }

                                diff = number1 - number2; // ToNumber

                                if (diff) {
                                    if (sortorder == "asc") {
                                        return diff;
                                    } else {
                                        return diff * -1;
                                    }
                                }
                            } else {
                                token1 = result1[0];
                                token2 = result2[0];

                                if (token1 !== token2) {
                                    diff = token1 > token2 ? 1 : -1;
                                    if (sortorder == "asc") {
                                        return diff;
                                    } else {
                                        return diff * -1;
                                    }
                                }
                            }
                        }

                        if (!result1) {
                            diff = result2 ? -1 : 0;
                            if (sortorder == "asc") {
                                return diff;
                            } else {
                                return diff * -1;
                            }
                        }

                        diff = 1;
                        if (sortorder == "asc") {
                            return diff;
                        } else {
                            return diff * -1;
                        }

                    });

                    for (var i = 0; i < cellValues.length; i++) {
                        var id = cellValues[i].id;
                        var $tr = $("#" + _gridID + " tr.jqgrow[id='" + id + "']");
                        $tr.parent().append($tr);
                        $tr = $("#" + _gridID + "_frozen tr.jqgrow[id='" + id + "']")
                        $tr.parent().append($tr);
                    }

                    if (!_HRGridOptions) {
                        _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                    }
                    if (_HRGridOptions.altRows) {
                        $("#" + _gridID + " tr").removeClass("ui-priority-secondary");
                        $("#" + _gridID + "_frozen tr").removeClass("ui-priority-secondary");
                        $("#" + _gridID + " tr:visible:even").addClass("ui-priority-secondary");
                        $("#" + _gridID + "_frozen tr:visible:even").addClass("ui-priority-secondary");
                    }

                    return true;
                }
            },

            onSelectAll: function (checked, multiSelect, groupingCheckBox) {

                //グループのチェックボックスの制御
                if (multiSelect && groupingCheckBox) {
                    _$grid.find('tr.jqgroup input[type="checkbox"]').prop("checked", checked).prop("indeterminate", false);
                    $("#" + _gridID + "_frozen").find('tr.jqgroup input[type="checkbox"]').prop("checked", checked).prop("indeterminate", false);
                }

                _$grid.triggerHandler('SelectAll', [checked]);
            },

            //行選択イベント処理ラッパー
            //・DnDソート行番号対応済み
            onSelectRow: function (rowId, checked, e, cellEdit, multiSelect, groupingCheckBox, cancelSelect) {
                //cellEditは使わなくなったので削除
                //if (cellEdit && multiSelect && !checked) {
                //    //jqGrid不具合対策。クリックしたセルのハイライトが残ったままになるので消す
                //    if (e.target.tagName == "TD") {
                //        $(e.target).removeClass('ui-state-highlight');
                //    }
                //}

                //グループのチェックボックスの制御
                if (multiSelect && groupingCheckBox) {
                    _HRGrid.groups_onSelectRow(_gridID, rowId);
                }

                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (rowId == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == rowId) {
                                break;
                            }
                        }
                    }
                }

                //単一行選択の場合に、選択している行をクリックすると選択を解除する
                if (!multiSelect && cancelSelect && !checked) {
                    _$grid.jqGrid('setGridParam', { selrow: null });
                    this.ResetSelection(rowIndex);
                }

                var rowData = _$grid.getRowData(rowId);

                _$grid.triggerHandler('SelectRow', [rowIndex, rowData, checked]);

            },

            //セル選択
            //・DnDソート行番号対応済み
            onCellSelect: function (ri, ci, tdHtml, e) {
                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (ri == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == ri) {
                                break;
                            }
                        }
                    }
                }

                var colName = _$grid.jqGrid('getGridParam', 'colModel')[ci].index;
                var cellValue = _$grid.getCell(ri, ci);

                _$grid.triggerHandler('SelectCell', [rowIndex, colName, cellValue]);
            },

            //リンククリック
            //・DnDソート行番号対応済み
            onLinkClick: function (rowId, colName, cellValue) {
                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (rowId == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == rowId) {
                                break;
                            }
                        }
                    }
                }

                _$grid.triggerHandler('LinkClick', [rowIndex, colName, cellValue]);
            },

            //イメージボタンクリック
            onImageButtonClick: function (rowId, colName, value) {
                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (rowId == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == rowId) {
                                break;
                            }
                        }
                    }
                }

                _$grid.triggerHandler('ImageButtonClick', [rowIndex, colName, value]);
            },

            //ボタンクリック
            onButtonClick: function (rowId, colName, cellValue) {
                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (rowId == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == rowId) {
                                break;
                            }
                        }
                    }
                }

                _$grid.triggerHandler('ButtonClick', [rowIndex, colName, cellValue]);
            },

            //テキストボックス キー押下
            onTextBoxKeyDown: function (rowId, colName, cellValue, e) {
                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (rowId == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == rowId) {
                                break;
                            }
                        }
                    }
                }

                return _$grid.triggerHandler('TextBoxKeyDown', [rowIndex, colName, cellValue, e]);
            },

            //ドロップダウンリスト変更
            onDropDownListChange: function (rowId, colName, value, text) {
                var rowIndex = 0;
                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (!_HRGridOptions.localFilterMode) {
                    var rowIds = _$grid.jqGrid('getDataIDs');
                    for (rowIndex = 0; rowIndex < rowIds.length; rowIndex++) {
                        if (rowId == rowIds[rowIndex]) {
                            break;
                        }
                    }
                } else {
                    var $trs = _$grid.find("tr.jqgrow:visible");
                    if ($trs.length > 0) {
                        for (rowIndex = 0; rowIndex < $trs.length; rowIndex++) {
                            if ($trs.eq(rowIndex).attr("id") == rowId) {
                                break;
                            }
                        }
                    }
                }

                return _$grid.triggerHandler('DropDownListChange', [rowIndex, colName, value, text]);
            },

            Groups: _HRGrid.groups[_gridID],

            //リキッドレイアウト対応（１）グリッドの外枠を処理
            _liquidLayout1: function () {
                $("#gbox_" + _gridID).css("overflow", "hidden");
                $("#gview_" + _gridID).css("overflow", "hidden");
                $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').css("overflow", "hidden");

                var cssClass = _$grid.jqGrid('getGridParam', 'cssClass')
                if (cssClass.indexOf('liquid') >= 0) {

                    if (cssClass.indexOf('liquid-w') >= 0) {
                        $('#gbox_' + _gridID).addClass(_gridID + "-liquid-w-1");
                        $('#gview_' + _gridID).addClass(_gridID + "-liquid-w-1");
                        $('#gview_' + _gridID + '>div.ui-jqgrid-hdiv').not('.frozen-div').addClass(_gridID + "-liquid-w-1");
                        $('#' + _gridID + '_pager').addClass(_gridID + "-liquid-w-1");
                    } else if (cssClass.indexOf('liquid-h') >= 0) {
                        $('#gbox_' + _gridID).addClass(_gridID + "-liquid-h-1");
                        $('#gview_' + _gridID).addClass(_gridID + "-liquid-h-1");
                    } else {
                        $('#gbox_' + _gridID).addClass(_gridID + "-liquid-1");
                        $('#gview_' + _gridID).addClass(_gridID + "-liquid-1");
                        $('#gview_' + _gridID + '>div.ui-jqgrid-hdiv').not('.frozen-div').addClass(_gridID + "-liquid-w-1");
                        $('#' + _gridID + '_pager').addClass(_gridID + "-liquid-w-1");
                    }

                    //以下はcommon.jsのロジックを改造して使用
                    function resizeAllElements(elems) {
                        elems.each(function (e) {
                            var thisObj = $(this);
                            var windowObj = $(window);
                            var fixWidth = thisObj.attr("fixWidth");
                            var fixHeight = thisObj.attr("fixHeight");
                            if (fixWidth && windowObj.clientWidth() >= _baseWidth) {
                                thisObj.width(windowObj.clientWidth() - fixWidth);
                            } else {
                                thisObj.width(_baseWidth - fixWidth);
                            }
                            if (fixHeight && windowObj.clientHeight() >= _baseHeight) {
                                thisObj.height(windowObj.clientHeight() - fixHeight);
                            } else {
                                thisObj.height(_baseHeight - fixHeight);
                            }
                        });
                    }
                    var _baseWidth;
                    var _baseHeight;
                    var bodyObj = $("body");
                    if (bodyObj.attr("base-width")) {
                        _baseWidth = bodyObj.attr("base-width");
                    }
                    if (bodyObj.attr("base-height")) {
                        _baseHeight = bodyObj.attr("base-height");
                    }
                    var _elems = $("." + _gridID + "-liquid-1").each(function (e, obj) {
                        var thisObj = $(this);
                        if (thisObj.attr("id") == "FTBL_LIST") {
                            thisObj = thisObj;
                        }
                        var windowObj = $(window);
                        var fixWidth = windowObj.clientWidth() - thisObj.width();
                        var fixHeight = windowObj.clientHeight() - thisObj.height();
                        if (_baseWidth) {
                            fixWidth -= (windowObj.clientWidth() - _baseWidth);
                        }
                        if (_baseHeight) {
                            fixHeight -= (windowObj.clientHeight() - _baseHeight);
                        }
                        thisObj.attr("fixWidth", fixWidth);
                        thisObj.attr("fixHeight", fixHeight);
                    });
                    $.merge(_elems, $("." + _gridID + "-liquid-w-1").each(function (e, obj) {
                        var thisObj = $(this);
                        var windowObj = $(window);
                        var fixWidth = windowObj.clientWidth() - thisObj.width();
                        if (_baseWidth) {
                            fixWidth -= (windowObj.clientWidth() - _baseWidth);
                        }
                        thisObj.attr("fixWidth", fixWidth);
                    }));
                    $.merge(_elems, $("." + _gridID + "-liquid-h-1").each(function (e, obj) {
                        var thisObj = $(this);
                        var windowObj = $(window);
                        var fixHeight = windowObj.clientHeight() - thisObj.height();
                        if (_baseHeight) {
                            fixHeight -= (windowObj.clientHeight() - _baseHeight);
                        }
                        thisObj.attr("fixHeight", fixHeight);
                    }));
                    $(window).resize(function (e) {
                        resizeAllElements(_elems);
                    });
                    resizeAllElements(_elems);

                    //リキッドレイアウト対応（１）処理済みフラグ=true → リキッドレイアウト対応（２）処理はこのフラグがtrueになるまで待機させる
                    _HRGrid.liquidLayout1Done[_gridID] = true;
                }

            },

            //フィルターツールバーの検索モードの初期設定
            _setFilterSoper: function () {

                var colModel = _$grid.jqGrid('getGridParam', 'colModel');
                var soper = "";
                var stext = "";

                for (var i = 0; i < colModel.length; i++) {
                    var searchmode = colModel[i].filtersearchmode;
                    if (searchmode) {
                        var colName = colModel[i].index;

                        if (searchmode == "Equal") {
                            soper = "eq";
                            stext = "＝";
                        } else if (searchmode == "NotEqual") {
                            soper = "ne";
                            stext = "≠";
                        } else if (searchmode == "LessThan") {
                            soper = "lt";
                            stext = "＜";
                        } else if (searchmode == "LessThanOrEqual") {
                            soper = "le";
                            stext = "≦";
                        } else if (searchmode == "GreaterThan") {
                            soper = "gt";
                            stext = "＞";
                        } else if (searchmode == "GreaterThanOrEqual") {
                            soper = "ge";
                            stext = "≧";
                        } else if (searchmode == "BeginWith") {
                            soper = "bw";
                            stext = "前";
                        } else if (searchmode == "EndWith") {
                            soper = "ew";
                            stext = "後";
                        } else if (searchmode == "Contain") {
                            soper = "cn";
                            stext = "含";
                        } else if (searchmode == "Null") {
                            soper = "nu";
                            stext = "□";
                        } else if (searchmode == "NotNull") {
                            soper = "nn";
                            stext = "■";
                        }

                        $("#gbox_" + _gridID + " td.ui-search-oper a.soptclass[colname='" + colName + "']").attr("soper", soper).text(stext);

                    }
                }

            },

            //読込完了イベント
            onLoadComplete: function (data, options) {
                _HRGrid.cellValues[_gridID] = data.rows;
                var colModel = _$grid.jqGrid('getGridParam', 'colModel');

                //グルーピング
                //業務jsでHRGrid("list1").Groups[i].SetCollapsed(true);と書けるようにしたが、そのためのコードがわかりにくい
                if (data.groups) {
                    _HRGrid.groups[_gridID] = data.groups;
                    for (var i = 0; i < data.groups.length; i++) {
                        //配列要素にメソッドを生やす
                        data.groups[i].GetCollapsed = function () {
                            return _HRGrid.groups_getCollapsed(_gridID, this);
                        };
                        data.groups[i].SetCollapsed = function (collapsed) {
                            _HRGrid.groups_setCollapsed(_gridID, this, collapsed);
                        };
                        //初期状態設定
                        data.groups[i].SetCollapsed(data.groups[i].initCollapsed);
                    }
                }

                //共通のエンターキー置き換えを抑制する
                //・フィルターツールバーの入力欄
                $("#gbox_" + _gridID + " td.ui-search-input").find("input,select").attr("noreplaceenter", "");
                //・ページャーの入力欄
                $("#" + _gridID + "_pager").find("input.ui-pg-input,select.ui-pg-selbox").attr("noreplaceenter", "");

                //フィルターツールバーのテキストボックスのIMEモード制御
                for (var i = 0; i < colModel.length; i++) {
                    var imemode = colModel[i].simemode;
                    if (imemode) {
                        var colName = colModel[i].index;
                        $("#gbox_" + _gridID + " td.ui-search-input input#gs_" + colName).css("ime-mode", imemode);
                    }
                }

                //行の背景色
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].backColor) {
                        var value = data.rows[i].backColor;

                        //memo:これだと選択行の色より弱いので
                        //$("#" + _gridID + " tr.jqgrow").eq(i).css("background-color", '#' + value);
                        //$("#" + _gridID + "_frozen tr.jqgrow").eq(i).css("background-color", '#' + value);

                        //memo:選択行の色より強くした
                        var $row = $("#" + _gridID + " tr.jqgrow").eq(i);
                        var rowStyle = $row.attr("style");
                        if (!rowStyle) {
                            rowStyle = "";
                        }
                        $row.css({ "cssText": rowStyle + "; background-color: #" + value + " !important;" });
                        var $row = $("#" + _gridID + "_frozen tr.jqgrow").eq(i);
                        var rowStyle = $row.attr("style");
                        if (!rowStyle) {
                            rowStyle = "";
                        }
                        $row.css({ "cssText": rowStyle + "; background-color: #" + value + " !important;" });

                    }
                }

                //文字色、背景色、CSSの設定
                if (data.foreColors) {
                    var htGrid = [];
                    var htGridFrozen = [];
                    for (var i = 0; i < data.foreColors.length; i++) {
                        for (var key in data.foreColors[i]) {
                            if (data.foreColors[i].hasOwnProperty(key)) {
                                if (!htGrid[key]) {
                                    htGrid[key] = $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + key + "']", $("#" + _gridID));
                                    htGridFrozen[key] = $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + key + "']", $("#" + _gridID + "_frozen"));
                                }
                                var value = data.foreColors[i][key];
                                htGrid[key].eq(i).css("color", '#' + value);
                                htGridFrozen[key].eq(i).css("color", '#' + value);
                            }
                        }
                    }
                    for (var i = 0; i < data.backColors.length; i++) {
                        for (var key in data.backColors[i]) {
                            if (data.backColors[i].hasOwnProperty(key)) {
                                if (!htGrid[key]) {
                                    htGrid[key] = $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + key + "']", $("#" + _gridID));
                                    htGridFrozen[key] = $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + key + "']", $("#" + _gridID + "_frozen"));
                                }
                                var value = data.backColors[i][key];
                                htGrid[key].eq(i).css("background-color", '#' + value);
                                htGridFrozen[key].eq(i).css("background-color", '#' + value);
                            }
                        }
                    }
                    for (var i = 0; i < data.cssClasses.length; i++) {
                        for (var key in data.cssClasses[i]) {
                            if (data.cssClasses[i].hasOwnProperty(key)) {
                                if (!htGrid[key]) {
                                    htGrid[key] = $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + key + "']", $("#" + _gridID));
                                    htGridFrozen[key] = $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + key + "']", $("#" + _gridID + "_frozen"));
                                }
                                var value = data.cssClasses[i][key];
                                htGrid[key].eq(i).addClass(value);
                                htGridFrozen[key].eq(i).addClass(value);
                            }
                        }
                    }
                    htGrid = null;
                    htGridFrozen = null;
                }

                //ツールチップを設定
                for (var i = 0; i < data.rows.length; i++) {
                    for (var j = 0; j < colModel.length; j++) {
                        var colName = colModel[j].index;
                        if (colName) {
                            var tooltip = data.rows[i][colName].tooltip;
                            if (tooltip) {
                                //_$grid.jqGrid('setCell', i, colName, '', '', { title: tooltip });     //setCellでは列固定したセルに反映されなかった
                                $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + colName + "']", $("#" + _gridID)).eq(i).attr("title", tooltip);
                                $("td[role='gridcell'][aria-describedby='" + _gridID + "_" + colName + "']", $("#" + _gridID + "_frozen")).eq(i).attr("title", tooltip);
                            }
                        }
                    }
                }

                //初期 行選択
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].selectRow) {
                        this.SetSelection(i);
                        if (options.multiSelect && options.groupingCheckBox) {
                            _HRGrid.groups_onSelectRow(_gridID, data.rows[i].id);
                        }
                    }
                }

                //行の使用不可
                for (var i = 0; i < data.rows.length; i++) {
                    if (!data.rows[i].enabled) {
                        var $row = $("#" + _gridID + " tr.jqgrow").eq(i);
                        var $rowFrozen = $("#" + _gridID + "_frozen tr.jqgrow").eq(i);

                        //行選択キャンセル用のフラグ設定
                        $row.attr("disablerow", "1");
                        $rowFrozen.eq(i).attr("disablerow", "1");

                        //行内に入力コントロールがあれば使用不可にする
                        //・テキストボックス、ラジオ、チェック、ドロップダウンリスト、イメージ
                        $row.find("input, select, img").each(function () {
                            var $this = $(this);
                            $this.prop("disabled", true);
                            $this.css("cursor", "default");
                        });
                        //・リンク
                        $row.find("span").each(function () {
                            var $this = $(this);
                            if ($this.css("text-decoration") == "underline" && $this.css("color").toLowerCase() == "#0000ff") {
                                $this.css("color", "#000000");
                                $this.css("cursor", "default");
                            }
                        });
                        //・ラジオやチェックに付随するラベル
                        $row.find("label").each(function () {
                            $(this).css("cursor", "default");
                        });
                    }
                }

                //フィルターツールバーのデコード処理
                //ドロップダウンリストの項目に:や'などが含まれると正しく処理できないので
                //SV側でHttpUtility.UrlEncodeUnicodeを使ってエンコードして、CL側でunescapeを使ってデコードして処理した
                //HttpUtility.UrlEncodeやdecodeURIなども試したが組み合わせで動かない場合があったので使っていない
                for (var i = 0; i < colModel.length; i++) {
                    var index = colModel[i].index;
                    if (index) {

                        if (colModel[i].searchoptions.filterToolbarDecode == false) {
                            var $combo = $("#gbox_" + _gridID + " table.ui-search-table select#gs_" + index);
                            if ($combo.length > 0) {
                                $combo.find("option").each(function () {
                                    var $opt = $(this);
                                    $opt.val(unescape($opt.val()));
                                    $opt.text(unescape($opt.text()));
                                });
                            }
                            colModel[i].searchoptions.filterToolbarDecode = true;
                        }

                    }
                }




                //自動追加した空白行が存在する場合に行う処理
                var hasBlankRow = false;
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].blankRow) {
                        hasBlankRow = true;

                        //複数選択のチェックボックスが存在すれば非表示にする
                        $("#" + _gridID + " tr.jqgrow").eq(i).find("td input.cbox").hide();
                        $("#" + _gridID + "_frozen tr.jqgrow").eq(i).find("td input.cbox").hide();

                        //行にblankrow属性を追加（クリックイベントをキャンセルするためのフラグとして使用する）
                        $("#" + _gridID + " tr.jqgrow").eq(i).attr("blankrow", "1");
                        $("#" + _gridID + "_frozen tr.jqgrow").eq(i).attr("blankrow", "1");

                    }
                }
                if (hasBlankRow) {
                    //空白行を含めた件数がページャーに表示されるので、表示内容を編集する
                    var txt = $("#" + _gridID + "_pager div.ui-paging-info").text();
                    if (txt != "") {
                        //（編集例）「24 件中 21 - 30 を表示」→「24 件中 21 - 24 を表示」  ※決め打ちなのでjqGridの設定で件数表示の文言を変更する場合はココも修正が必要
                        var match = txt.match(/^(\d+)\s件中\s(\d+)\s-\s\d+\sを表示/);
                        txt = match[1] + " 件中 " + match[2] + " - " + match[1] + " を表示";
                        $("#" + _gridID + "_pager div.ui-paging-info").text(txt);
                    }
                }

                //列幅のauto対応
                if (options.autoColumnWidth) {
                    this._autoColumnWidth(colModel, options);
                    if (options.gridWidth == 0) {
                        this.SetWidth(_$grid.width());
                    }
                }

                //行の高さ（全体）
                if (options.rowHeight != 0) {
                    $("#" + _gridID + " tr.jqgrow").height(options.rowHeight);
                    $("#" + _gridID + "_frozen tr.jqgrow").height(options.rowHeight);
                }
                //行の高さ（個別）
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].height) {
                        var height = data.rows[i].height;
                        if (height != 0) {
                            $("#" + _gridID + " tr.jqgrow").eq(i).height(height);
                            $("#" + _gridID + "_frozen tr.jqgrow").eq(i).height(height);
                        }
                    }
                }

                //セルの折り返し設定
                if (options.wordWrap) {
                    var cells = $("#" + _gridID).find("td");
                    var frozenCells = $("#" + _gridID + "_frozen").find("td");

                    cells.css("white-space", "normal");
                    frozenCells.css("white-space", "normal");

                    cells.css("overflow-wrap", "break-word");
                    frozenCells.css("overflow-wrap", "break-word");

                    //IE用
                    cells.css("word-break", "break-all");
                    frozenCells.css("word-break", "break-all");
                }

                //ヘッダー表示/非表示
                if (!options.headerVisible) {
                    $('#gview_' + _gridID + '>div.ui-jqgrid-hdiv').hide();
                    $('#gview_' + _gridID + '>div.frozen-bdiv').css('top', '0px');

                    var h = $('#gview_' + _gridID + '>div.ui-jqgrid-hdiv').height();
                    $("#gbox_" + _gridID + "." + _gridID + "-liquid-1, #gview_" + _gridID + "." + _gridID + "-liquid-1, #gbox_" + _gridID + "." + _gridID + "-liquid-h-1, #gview_" + _gridID + "." + _gridID + "-liquid-h-1").each(function (e, obj) {
                        var thisObj = $(this);

                        if (thisObj.attr("headerVisibleFix") && thisObj.attr("headerVisibleFix") != "1") {
                            var orgHeight = thisObj.height();
                            var orgFixHeight = Number(thisObj.attr("fixHeight"));
                            thisObj.height(orgHeight - h - 1);
                            thisObj.attr("fixHeight", orgFixHeight + h + 1);
                        }
                        thisObj.attr("headerVisibleFix", "1");

                    });

                } else {
                    $('#gview_' + _gridID + '>div.ui-jqgrid-hdiv').css('visibility', 'visible');
                }

                //データが０件の場合に横スクロールバーが非表示にならないように対策
                //if ($("#" + _gridID + " tr.jqgrow:visible").length == 0) {
                if (data.rows.length == 0) {
                    $("#" + _gridID).css("visibility", "hidden");
                    $("#" + _gridID + " tr.jqgfirstrow").css("height", "1px");
                    $("#" + _gridID + "_frozen").css("visibility", "hidden");
                } else {
                    $("#" + _gridID).css("visibility", "visible");
                    $("#" + _gridID + " tr.jqgfirstrow").css("height", "auto");
                    $("#" + _gridID + "_frozen").css("visibility", "visible");
                    $("#" + _gridID + "_frozen" + " tr.jqgfirstrow").css("height", "auto");
                }

                //スクロールバー制御
                var $divBody = $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').eq(0);
                $divBody.css('overflow', '');
                switch (options.scrollBar) {
                    case "Auto":
                        $divBody.css('overflow', 'auto');
                        break;
                    case "Both":
                        $divBody.css('overflow', 'scroll');
                        break;
                    case "Horizontal":
                        $divBody.css('overflow-x', 'scroll');
                        break;
                    case "Vertical":
                        $divBody.css('overflow-y', 'scroll');
                        break;
                    case "None":
                        $divBody.css('overflow', 'hidden');
                        break;
                }

                //スクロール位置
                //var scrollPosition = 0;
                switch (options.scrollPosition) {
                    case 'top':
                        scrollPosition = 0;
                        break;
                    case 'keep':
                        scrollPosition = -1;
                        break;
                    case 'bottom':
                        scrollPosition = $divBody.get(0).scrollHeight;
                        break;
                }
                if (_HRGrid.scrolls[_gridID]) {
                    if (isNaN(_HRGrid.scrolls[_gridID])) {
                        switch (_HRGrid.scrolls[_gridID]) {
                            case 'top':
                                scrollPosition = 0;
                                break;
                            case 'keep':
                                scrollPosition = -1;
                                break;
                            case 'bottom':
                                scrollPosition = $divBody.get(0).scrollHeight;
                                break;
                        }
                    } else {
                        scrollPosition = Number(_HRGrid.scrolls[_gridID]);
                    }
                    _HRGrid.scrolls[_gridID] = "";
                }
                if (scrollPosition >= 0) {
                    $divBody.scrollTop(scrollPosition);
                }

                //固定した列はマウスホイールでスクロールされないのでスクロールされるようにした
                if (options.frozenColumns > 0) {
                    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
                    $("#gview_" + _gridID + " > div.frozen-bdiv").on(mousewheelevent, function (e) {
                        if (!e.originalEvent) {
                            return;
                        }
                        e.preventDefault();
                        var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);

                        var $bdiv = $("#gview_" + _gridID + " > div.ui-jqgrid-bdiv");
                        var $bdiv_frozen = $("#gview_" + _gridID + " > div.frozen-bdiv");

                        var scrollHeight = $bdiv_frozen[0].scrollHeight;
                        var offsetHeight;
                        if ($bdiv[0].scrollWidth > $bdiv.width()) {
                            offsetHeight = $bdiv_frozen[0].offsetHeight;
                        } else {
                            offsetHeight = $bdiv[0].offsetHeight;
                        }
                        var scrollTop = $bdiv_frozen.scrollTop();
                        var pos = 0;
                        if (delta > 0) {
                            delta = 30;     //テスト環境では固定していない列のスクロール量が30だったので合わせた → 環境等で変動するかもしれない？
                            pos = scrollTop - delta;
                            if (pos < 0) {
                                pos = 0;
                            }
                        } else {
                            delta = -30;
                            pos = scrollTop - delta;
                            if (pos >= scrollHeight - offsetHeight) {
                                pos = scrollHeight - offsetHeight;
                            }
                        }
                        $bdiv.scrollTop(pos);
                    });
                }

                _HRGrid.fixHiddenGridProblem(_gridID, options.pagerVisilble);

                var datatype = _$grid.jqGrid('getGridParam', 'datatype');
                if (datatype == "json") {
                    //リキッドレイアウト対応（２）グリッドの中身を処理
                    var cssClass = _$grid.jqGrid('getGridParam', 'cssClass')
                    if (cssClass.indexOf('liquid') >= 0 && !$divBody.hasClass(_gridID + "-liquid-2") && !$divBody.hasClass(_gridID + "-liquid-w-2") && !$divBody.hasClass(_gridID + "-liquid-h-2")) {

                        function _liquidLayout2() {
                            if (_HRGrid.liquidLayout1Done[_gridID] == true) {
                                //リキッドレイアウト対応（１）処理済みフラグ=trueの場合は//リキッドレイアウト対応（２）処理を行う

                                if (cssClass.indexOf('liquid-w') >= 0) {
                                    $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').not('.frozen-bdiv').addClass(_gridID + "-liquid-w-2");
                                } else if (cssClass.indexOf('liquid-h') >= 0) {
                                    $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').not('.frozen-bdiv').addClass(_gridID + "-liquid-h-2");
                                    $('#gview_' + _gridID + '>div.frozen-bdiv.ui-jqgrid-bdiv').addClass(_gridID + "-liquid-h-2");
                                } else {
                                    $('#gview_' + _gridID + '>div.ui-jqgrid-bdiv').not('.frozen-bdiv').addClass(_gridID + "-liquid-2");
                                    $('#gview_' + _gridID + '>div.frozen-bdiv.ui-jqgrid-bdiv').addClass(_gridID + "-liquid-h-2");
                                }

                                //以下はcommon.jsのロジックを改造して使用
                                function resizeAllElements(elems) {
                                    elems.each(function (e) {
                                        var thisObj = $(this);
                                        var windowObj = $(window);
                                        var fixWidth = thisObj.attr("fixWidth");
                                        var fixHeight = thisObj.attr("fixHeight");
                                        if (fixWidth && windowObj.clientWidth() >= _baseWidth) {
                                            thisObj.width(windowObj.clientWidth() - fixWidth);
                                        } else {
                                            thisObj.width(_baseWidth - fixWidth);
                                        }
                                        if (fixHeight && windowObj.clientHeight() >= _baseHeight) {
                                            thisObj.height(windowObj.clientHeight() - fixHeight);
                                        } else {
                                            thisObj.height(_baseHeight - fixHeight);
                                        }
                                    });
                                }
                                var _baseWidth;
                                var _baseHeight;
                                var bodyObj = $("body");
                                if (bodyObj.attr("base-width")) {
                                    _baseWidth = bodyObj.attr("base-width");
                                }
                                if (bodyObj.attr("base-height")) {
                                    _baseHeight = bodyObj.attr("base-height");
                                }
                                var _elems = $("." + _gridID + "-liquid-2").each(function (e, obj) {
                                    var thisObj = $(this);
                                    var windowObj = $(window);
                                    var fixWidth = windowObj.clientWidth() - thisObj.width();
                                    var fixHeight = windowObj.clientHeight() - thisObj.height();
                                    if (_baseWidth) {
                                        fixWidth -= (windowObj.clientWidth() - _baseWidth);
                                    }
                                    if (_baseHeight) {
                                        fixHeight -= (windowObj.clientHeight() - _baseHeight);
                                    }
                                    thisObj.attr("fixWidth", fixWidth);
                                    thisObj.attr("fixHeight", fixHeight);
                                });
                                $.merge(_elems, $("." + _gridID + "-liquid-w-2").each(function (e, obj) {
                                    var thisObj = $(this);
                                    var windowObj = $(window);
                                    var fixWidth = windowObj.clientWidth() - thisObj.width();
                                    if (_baseWidth) {
                                        fixWidth -= (windowObj.clientWidth() - _baseWidth);
                                    }
                                    thisObj.attr("fixWidth", fixWidth);
                                }));
                                $.merge(_elems, $("." + _gridID + "-liquid-h-2").each(function (e, obj) {
                                    var thisObj = $(this);
                                    var windowObj = $(window);
                                    var fixHeight = windowObj.clientHeight() - thisObj.height();
                                    if (_baseHeight) {
                                        fixHeight -= (windowObj.clientHeight() - _baseHeight);
                                    }
                                    thisObj.attr("fixHeight", fixHeight);
                                }));
                                $(window).resize(function (e) {
                                    resizeAllElements(_elems);
                                });
                                resizeAllElements(_elems);

                            } else {
                                //リキッドレイアウト対応（１）処理済みフラグ=trueでなければ待機して再実行
                                setTimeout(_liquidLayout2, 50);
                            }
                        }
                        _liquidLayout2();

                    }
                }

                //コントロールイベント設定
                var $gridEvent = $("#" + _gridID + ", #" + _gridID + "_frozen");

                $gridEvent.off("click", "span[HRGridLinkClick='1']");
                $gridEvent.on("click", "span[HRGridLinkClick='1']", function () {
                    //クリックイベント呼び出し
                    var rowId = $(this).closest("tr.jqgrow").attr("id");
                    var colName = $(this).closest("td[role=gridcell]").attr("aria-describedby").substr(_gridID.length + 1);
                    var value = $(this).text();
                    HRGrid(_gridID).onLinkClick(rowId, colName, value);
                    //行選択をキャンセルする
                    _$grid.attr("_cancelRowSelect", "1");
                });

                $gridEvent.off("click", "img[HRGridImageClick='1']");
                $gridEvent.on("click", "img[HRGridImageClick='1']", function () {
                    //クリックイベント呼び出し
                    var rowId = $(this).closest("tr.jqgrow").attr("id");
                    var colName = $(this).closest("td[role=gridcell]").attr("aria-describedby").substr(_gridID.length + 1);
                    var value = {};
                    value.path = $(this).attr("src");
                    value.type = "";
                    if ($(this).hasClass("HRGrid_list_delete")) {
                        value.type = "delete";
                    } else if ($(this).hasClass("HRGrid_list_edit")) {
                        value.type = "edit";
                    }
                    HRGrid(_gridID).onImageButtonClick(rowId, colName, value);
                    //行選択をキャンセルする
                    _$grid.attr("_cancelRowSelect", "1");
                });

                $gridEvent.off("click", "label[HRGridLabelClick='1']");
                $gridEvent.on("click", "label[HRGridLabelClick='1']", function () {
                    //行選択をキャンセルする
                    _$grid.attr("_cancelRowSelect", "1");
                });

                _$grid.off("keydown", "input[HRGridTextKeyDown='1']");
                _$grid.on("keydown", "input[HRGridTextKeyDown='1']", function (e) {
                    //イベント呼び出し
                    var rowId = $(this).closest("tr.jqgrow").attr("id");
                    var colName = $(this).closest("td[role=gridcell]").attr("aria-describedby").substr(_gridID.length + 1);
                    var value = $(this).val();
                    var ret = HRGrid(_gridID).onTextBoxKeyDown(rowId, colName, value, e);
                    if (ret == false) {
                        return false;
                    }
                    //共通側で実装されたので以下は不要になった
                    ////Enterキーが押されたら次のコントロールへ移動する
                    //if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.keyCode == 13) {
                    //    //e.keyCode = 9;                //これはダメだった
                    //    //window.event.keyCode = 9;     //これもIE9から効かない
                    //
                    //    //参考(https://teratail.com/questions/14080)
                    //    var $me = $(this);
                    //    var $list = $('input:enabled:not([readonly]),select:enabled');
                    //    $list.each(function (index) {
                    //        if ($(this).is($me)) {
                    //            $list.eq(index + 1).focus();
                    //            e.preventDefault();
                    //            return false;
                    //        }
                    //    });
                    //}
                });

                _$grid.off("change", "select[HRGridDDLChange='1']");
                _$grid.on("change", "select[HRGridDDLChange='1']", function (e) {
                    var rowId = $(this).closest("tr.jqgrow").attr("id");
                    var colName = $(this).closest("td[role=gridcell]").attr("aria-describedby").substr(_gridID.length + 1);
                    var value = this[this.selectedIndex].value;
                    var text = this[this.selectedIndex].text;
                    HRGrid(_gridID).onDropDownListChange(rowId, colName, value, text);
                });

                //HRButton対応
                $("input.hrbutton, input.hrarrbutton, input.hributton", $gridEvent)
                    .unbind("mouseenter", objFncGetButtonMouseEnter)
                    .unbind("mouseleave", objFncGetButtonMouseLeave)
                    .hover(objFncGetButtonMouseEnter, objFncGetButtonMouseLeave);
                $(".balloonhint", $gridEvent)
                    .unbind("mouseenter", objFncGetHintMouseEnterEvent)
                    .unbind("mouseleave", objFncGetHintMouseLeaveEvent)
                    .hover(objFncGetHintMouseEnterEvent, objFncGetHintMouseLeaveEvent);

                $gridEvent.off("click", "input.hrbutton, input.hributton");
                $gridEvent.on("click", "input.hrbutton, input.hributton", function () {
                    var rowId = $(this).closest("tr.jqgrow").attr("id");
                    var colName = $(this).closest("td[role=gridcell]").attr("aria-describedby").substr(_gridID.length + 1);
                    var value = $(this).text();
                    HRGrid(_gridID).onButtonClick(rowId, colName, value);
                });

                if (options.multiSelect && options.groupingCheckBox) {

                    $gridEvent.off('change', 'input[type="checkbox"].GroupingHeaderCheckBox');
                    $gridEvent.on('change', 'input[type="checkbox"].GroupingHeaderCheckBox', function () {
                        var checked = $(this).prop("checked");
                        var $groupHeader = $(this).closest('tr.jqgroup');

                        var wk = $groupHeader.get(0).className.match(new RegExp(_gridID + "ghead_(\\d+)"));
                        var groupHeaderClass = wk[0];
                        var groupHeaderLevel = Number(wk[1]);

                        //$groupHeader.nextUntil('tr.jqgroup.' + groupHeaderClass).find('input[type="checkbox"].cbox').prop("checked", $(this).prop("checked"));

                        var $tr = $groupHeader;
                        for (; ; ) {
                            var $tr = $tr.next();
                            if ($tr.length == 0) {
                                break;
                            }
                            if ($tr.hasClass("jqgroup")) {
                                var level = Number($tr.get(0).className.match(new RegExp(_gridID + "ghead_(\\d+)"))[1]);
                                if (groupHeaderLevel < level) {
                                    //nop
                                } else {
                                    break;
                                }
                            } else {
                                if (checked) {
                                    _$grid.jqGrid("resetSelection", $tr.attr("id"));
                                    _$grid.jqGrid("setSelection", $tr.attr("id"), false);
                                } else {
                                    _$grid.jqGrid("resetSelection", $tr.attr("id"));
                                }
                                _HRGrid.groups_onSelectRow(_gridID, $tr.attr("id"));
                            }
                        }
                    });

                }

                //右クリックの処理を削除（右クリックで行選択されるため。jquery.jqGrid.js L2883あたりを参照）
                _$grid.unbind("contextmenu");

                //クリックソート不可にした列のタイトル部分のマウスカーソル修正
                var colModel = _$grid.jqGrid('getGridParam', 'colModel');
                for (var i = 0; i < colModel.length; i++) {
                    if (!colModel[i].sortable) {
                        //ui-jqgrid-sortableクラスを消すのは影響範囲がわからなかったのでカーソルを再設定した
                        //$("#gbox_" + _gridID + " div.ui-jqgrid-sortable[id='jqgh_" + _gridID + "_" + colModel[i].name + "']").removeClass("ui-jqgrid-sortable");
                        $("#gbox_" + _gridID + " div.ui-jqgrid-sortable[id='jqgh_" + _gridID + "_" + colModel[i].name + "']").css("cursor", "default");
                    }
                }


                if (!_HRGridOptions) {
                    _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                }
                if (_HRGridOptions.localFilterMode) {
                    this.onBeforeSearch();
                }


                //
                _$grid.triggerHandler('LoadComplete', [data]);

            },

            //ユーザーデータ
            GetUserData: function () {
                return _$grid.jqGrid('getGridParam', 'userData');
            },
            SetUserData: function (data) {
                _$grid.jqGrid('setGridParam', { userData: data });
            },

            //再読み込み処理
            Reload: function (options) {

                if (!options) {
                    options = {};
                }

                //ページ番号
                if (options.page) {
                    var pageNumber = 1;
                    if (isNaN(options.page)) {
                        switch (options.page) {
                            case 'first':
                                pageNumber = 1;
                                break;
                            case 'prev':
                                pageNumber = _$grid.jqGrid('getGridParam', 'page') - 1;
                                if (pageNumber <= 0) {
                                    pageNumber = 1;
                                }
                                break;
                            case 'next':
                                pageNumber = _$grid.jqGrid('getGridParam', 'page') + 1;
                                break;
                            case 'last':
                                pageNumber = _$grid.jqGrid('getGridParam', 'lastpage');
                                break;
                        }
                    } else {
                        pageNumber = Number(options.page);
                    }
                    _$grid.jqGrid('setGridParam', { 'page': pageNumber });
                }

                //ユーザーデータ（検索条件など）
                if (options.userData) {
                    //ユーザーデータを保存（ajax実行時にサーバーへ送信される）
                    _$grid.jqGrid('setGridParam', { userData: options.userData });
                }

                //ソート条件
                if (options.clearSort == true) {
                    //ソートアイコンを非表示にする
                    $("#gview_" + _gridID + " .s-ico").hide();
                    //ajax実行時にサーバーへ送信されるソート条件をクリアする
                    _$grid.jqGrid('setGridParam', { sortname: '', sortorder: '' });
                } else if (options.sort) {
                    if (options.sort.name == "") {
                        //ソートアイコンを非表示にする
                        $("#gview_" + _gridID + " .s-ico").hide();
                        //ajax実行時にサーバーへ送信されるソート条件をクリアする
                        _$grid.jqGrid('setGridParam', { sortname: '', sortorder: '' });
                    } else {
                        //ソートアイコンを一旦非表示にする
                        $("#gview_" + _gridID + " .s-ico").hide();
                        //ソートアイコンを表示する
                        $("#gview_" + _gridID + " .ui-jqgrid-hdiv").attr("loading", true);
                        _$grid.jqGrid('sortGrid', options.sort.name, false, options.sort.order);
                        $("#" + _gridID + "_" + options.sort.name + " .s-ico").show();
                        $("#gview_" + _gridID + " .ui-jqgrid-hdiv").removeAttr("loading");

                        //ajax実行時にサーバーへ送信されるソート条件を設定する
                        _$grid.jqGrid('setGridParam', { sortname: options.sort.name, sortorder: options.sort.order });
                    }
                }

                //フィルター情報
                if (options.clearFilter == true && _$grid[0].clearToolbar) {
                    //フィルターツールバーをクリアする
                    _$grid[0].clearToolbar(false);
                    //ajax実行時にサーバーへ送信されるフィルター情報をクリアする
                    _$grid.jqGrid('setGridParam', { search: false, postData: { "filters": ""} });
                }

                //スクロール位置
                if (options.scroll) {
                    _HRGrid.scrolls[_gridID] = options.scroll;
                }

                //グリッドのリロード（ajaxが実行される）
                _$grid.jqGrid('setGridParam', { datatype: 'json' });
                _$grid.trigger('reloadGrid');

            },

            //フィルター処理 現在はLocalFilterMode=Trueの場合のみ使用
            onBeforeSearch: function () {
                var filters = _$grid.jqGrid("getGridParam", "postData").filters;
                if (typeof filters === "string") {
                    if (filters == "") {
                        return;
                    }
                    filters = $.parseJSON(filters);
                }
                if (filters) {

                    var colModel = _$grid.jqGrid('getGridParam', 'colModel');

                    if (filters.rules.length == 0) {

                        $("#" + _gridID + " tr.jqgrow").show();
                        $("#" + _gridID + "_frozen tr.jqgrow").show();

                    } else {

                        $("#" + _gridID + " tr.jqgrow").hide();
                        $("#" + _gridID + "_frozen tr.jqgrow").hide();

                        //var cellValues = _HRGrid.cellValues[_gridID];
                        var cellValues = [];
                        var rowIds = _$grid.jqGrid('getDataIDs');
                        for (var i = 0; i < rowIds.length; i++) {
                            var row = _$grid.getRowData(rowIds[i]);
                            row.id = rowIds[i];
                            cellValues.push(row);
                        };


                        var ftypes = [];

                        for (var i = 0; i < cellValues.length; i++) {
                            var hit = false;
                            for (var j = 0; j < filters.rules.length; j++) {
                                var data = filters.rules[j].data;
                                var field = filters.rules[j].field;
                                var op = filters.rules[j].op;
                                //var value = cellValues[i][field].value;
                                var value = cellValues[i][field];

                                var ftype = ftypes[field];
                                if (!ftype) {
                                    for (var k = 0; k < colModel.length; k++) {
                                        if (colModel[k].index && colModel[k].index == field) {
                                            ftype = colModel[k].searchoptions.ftype;
                                            break;
                                        }
                                    }
                                    ftypes[field] = ftype;
                                }

                                if (ftype == "default" || ftype == "number") {
                                    if (!isNaN(data) && !isNaN(value)) {
                                        data = Number(data);
                                        value = Number(value);
                                    }
                                }

                                if (op == "eq") {
                                    if (value == data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "ne") {
                                    if (value != data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "lt") {
                                    if (value < data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "le") {
                                    if (value <= data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "gt") {
                                    if (value > data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "ge") {
                                    if (value >= data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "bw") {
                                    if (value.substr(0, data.length) == data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "ew") {
                                    if (value.substr(-1 * data.length) == data) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "cn") {
                                    if (value.indexOf(data) >= 0) {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "nu") {
                                    if (value == "") {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                } else if (op == "nn") {
                                    if (value != "") {
                                        hit = true;
                                    } else {
                                        hit = false;
                                        break;
                                    }
                                }
                            }
                            if (hit) {
                                $("#" + _gridID + " tr.jqgrow[id='" + cellValues[i].id + "']").show();
                                $("#" + _gridID + "_frozen tr.jqgrow[id='" + cellValues[i].id + "']").show();
                            }

                        }

                    }

                    if (!_HRGridOptions) {
                        _HRGridOptions = _$grid.jqGrid('getGridParam', 'HRGridOptions');
                    }
                    if (_HRGridOptions.altRows) {
                        $("#" + _gridID + " tr").removeClass("ui-priority-secondary");
                        $("#" + _gridID + "_frozen tr").removeClass("ui-priority-secondary");
                        $("#" + _gridID + " tr:visible:even").addClass("ui-priority-secondary");
                        $("#" + _gridID + "_frozen tr:visible:even").addClass("ui-priority-secondary");
                    }

                    //データが０件の場合に横スクロールバーが非表示にならないように対策
                    //if (data.rows.length == 0) {
                    if ($("#" + _gridID + " tr.jqgrow:visible").length == 0) {
                        $("#" + _gridID).css("visibility", "hidden");
                    } else {
                        $("#" + _gridID).css("visibility", "visible");
                        $("#" + _gridID + " tr.jqgfirstrow").css("height", "auto");
                    }

                }
            },

            //列幅のauto処理
            _autoColumnWidth: function (colModel, options) {
                var sortName = _$grid.jqGrid('getGridParam', 'postData').sidx;

                //★TODO:初期データ取得をしない場合にこの時点で生成されるタグの構成が異なるのでひとまず処理を抜けて対処
                var datatype = _$grid.jqGrid('getGridParam', 'datatype');
                if (datatype == "local") {
                    return;
                }

                //グリッドの複製を作成
                var c = $("#gbox_" + _gridID).clone()
                .attr("id", "#gbox_" + _gridID + "_clone")
                .css("visibility", "hidden")
                .css("position", "absolute")
                .css("left", 0)
                .css("top", 0);
                //var c = $("#gbox_" + _gridID).clone()
                //    .attr("id", "#gbox_" + _gridID + "_clone");
                $("#gbox_" + _gridID).after(c);

                //グルーピングで非表示になっている行を表示する
                c.find("tr.jqgrow").css("display", "");

                //jqGridは固定レイアウトなので自動レイアウトにする
                $(".ui-search-input", c).css("width", "30px");
                $("table.ui-jqgrid-htable", c).css("table-layout", "auto").css("width", "auto");
                $("tr.jqg-first-row-header th", c).css("width", "auto");
                $("tr.jqg-second-row-header th", c).css("width", "auto");
                $("tr.jqg-third-row-header th", c).css("width", "auto");
                $("table.ui-jqgrid-btable", c).css("table-layout", "auto").css("width", "auto");
                $("tr.jqgfirstrow td", c).css("width", "auto");

                //各列幅を取得
                var $secondRowHeaderTH = $("div.ui-jqgrid-hbox tr.jqg-second-row-header th", c);
                var $thirdRowHeaderTH = $("div.ui-jqgrid-hbox tr.jqg-third-row-header th", c);
                var $firstRowTD = $("#" + _gridID + " tr.jqgfirstrow td", c);

                var wa = [];
                // i:second-row-headerカウンタ、j:third-row-headerカウンタ、k:jqgfirstrowカウンタ
                var i = 0;
                var j = 0;
                var k = 0;
                for (i = 0; i < $secondRowHeaderTH.length; i++) {

                    var colspan = $secondRowHeaderTH.eq(i).attr("colspan");

                    if (!colspan || colspan == 1) {
                        //ヘッダー
                        var h = $secondRowHeaderTH.eq(i).width();
                        if (h == 0) {
                            //原因がよくわからないけどwidth()が0になる場合があったのでcssから取り直す 後で調べる
                            h = $secondRowHeaderTH.eq(i).css("width");
                            if (h != "") {
                                h = Number(h.replace("px", ""));
                            }
                        }
                        if (sortName != "") {
                            if ($secondRowHeaderTH.eq(i).attr("ID") == _gridID + "_" + sortName) {
                                h += 22;    //ソートアイコンを表示している列の場合は+22px
                                sortName = "";
                            }
                        }
                        h += 10; //微調整
                        //ボディー
                        var b = $firstRowTD.eq(k).width();
                        b += 1;  //微調整
                        //大きい方を取得
                        if (h == 0) {
                            wa.push(0);
                        } else if (h > b) {
                            wa.push(h);
                        } else {
                            wa.push(b);
                        }
                        k++;
                        //2019.06.05_ADD isojima S
                        //ヘッダー2段だが2段目に1項目しかない場合に、2段目用のカウント(j)がカウントアップされず、1つずつズレる障害の対応
                        var rowspan = $secondRowHeaderTH.eq(i).attr("rowspan");
                        if (colspan == 1 && (!rowspan || rowspan == 1))
                        {
                            j++;
                        }
                        //2019.06.05_ADD isojima E

                    } else {

                        for (i2 = 0; i2 < colspan; i2++) {
                            //ヘッダー
                            var h = $thirdRowHeaderTH.eq(j).width();
                            if (sortName != "") {
                                if ($thirdRowHeaderTH.eq(j).attr("ID") == _gridID + "_" + sortName) {
                                    h += 22;    //ソートアイコンを表示している列の場合は+22px
                                    sortName = "";
                                }
                            }
                            h += 10; //微調整
                            //ボディー
                            var b = $firstRowTD.eq(k).width();
                            b += 1;  //微調整
                            //大きい方を取得
                            if (h == 0) {
                                wa.push(0);
                            } else if (h > b) {
                                wa.push(h);
                            } else {
                                wa.push(b);
                            }
                            j++;
                            k++;
                        }
                    }

                }

                //端数が出ている場合は切り上げ
                for (i = 0; i < wa.length; i++) {
                    wa[i] = Math.ceil(wa[i]);
                }

                //自動幅の最大／最小
                for (i = 0; i < colModel.length; i++) {
                    var max = colModel[i].autowidthmax;
                    if (max && max > 0 && wa[i] > max) {
                        wa[i] = max;
                    }
                    var min = colModel[i].autowidthmin;
                    if (min && min > 0 && wa[i] < min) {
                        wa[i] = min;
                    }
                }

                //複製を削除
                c.remove();

                //本体の列幅を設定(1)これは遅いので固定列のみ処理
                $secondRowHeaderTH = $("#gbox_" + _gridID + " div.frozen-div tr.jqg-second-row-header th");
                $thirdRowHeaderTH = $("#gbox_" + _gridID + " div.frozen-div tr.jqg-third-row-header th");
                i = 0;
                j = 0;
                k = 0;
                var breakCount = options.frozenColumns;
                if (options.rowNumbers) {
                    breakCount++;
                }
                if (options.multiSelect) {
                    breakCount++;
                }
                if (options.frozenColumns > 0) {
                    for (i = 0; i < $secondRowHeaderTH.length; i++) {

                        //ヘッダー２段目（列タイトル部分）を取得
                        var $this = $secondRowHeaderTH.eq(i);

                        //列結合チェック
                        var colspan = $this.attr("colspan");

                        if (!colspan || colspan == 1) {
                            //列結合なし

                            // auto処理の対象は列幅が10pxより小さい場合のみ
                            // （なお、幅=0pxのように値が小さすぎると高さがおかしくなるため、10px未満を設定した場合は共通側で10pxに置き換えているので10未満の値がここに来ることはない）
                            if (!$this.attr("originalWidth")) {
                                $this.attr("originalWidth", $this.width());
                            }
                            if ($this.attr("originalWidth") <= 10) {

                                //列幅の設定
                                //マウス操作をエミュレートして列幅を設定するようにした（遅いのが難点）
                                var $el = $("span.ui-jqgrid-resize", $this);
                                var offset = $el.offset();
                                var event = jQuery.Event("mousedown", {
                                    which: 1,
                                    pageX: offset.left,
                                    pageY: offset.top
                                });
                                $el.trigger(event);
                                event = jQuery.Event("mousemove", {
                                    which: 1,
                                    pageX: offset.left + (wa[k] - $this.width()),
                                    pageY: offset.top
                                });
                                $el.trigger(event);
                                event = jQuery.Event("mouseup", {
                                    which: 1
                                });
                                $el.trigger(event);

                            }

                            k++;
                            if (k >= breakCount) {
                                break;
                            }

                        } else {
                            //列結合あり
                            for (var i2 = 0; i2 < colspan; i2++) {

                                //ヘッダー３段目（結合時の列タイトル部分）を取得しなおす
                                var $this = $thirdRowHeaderTH.eq(j);

                                //後の処理は列結合なしの場合と同じ
                                if (!$this.attr("originalWidth")) {
                                    $this.attr("originalWidth", $this.width());
                                }
                                if ($this.attr("originalWidth") <= 10) {

                                    var $el = $("span.ui-jqgrid-resize", $this);
                                    var offset = $el.offset();
                                    var event = jQuery.Event("mousedown", {
                                        which: 1,
                                        pageX: offset.left,
                                        pageY: offset.top
                                    });
                                    $el.trigger(event);
                                    event = jQuery.Event("mousemove", {
                                        which: 1,
                                        pageX: offset.left + (wa[k] - $this.width()),
                                        pageY: offset.top
                                    });
                                    $el.trigger(event);
                                    event = jQuery.Event("mouseup", {
                                        which: 1
                                    });
                                    $el.trigger(event);
                                }
                                j++;
                                k++;
                                if (k >= breakCount) {
                                    break;
                                }
                            }
                            if (k >= breakCount) {
                                break;
                            }
                        }
                    }
                }

                //本体の列幅を設定(2)こちらは早いけど固定列に効かなかったのと、jqGridの内部変数を直接操作しているのがイマイチ
                var $firstRowHeaderTH = $("#gbox_" + _gridID + " div.ui-jqgrid-hbox tr.jqg-first-row-header th");
                var $t = _$grid.jqGrid("_getGrid").grid;
                for (i = 0; i < colModel.length; i++) {
                    if (!colModel[i].hidden && colModel[i].widthOrg <= 10) {
                        $firstRowHeaderTH.eq(i).width(wa[i]);
                        colModel[i].width = wa[i];
                        $t.headers[i].width = wa[i];
                        $t.headers[i].el.style.width = wa[i] + "px";
                        $t.cols[i].style.width = wa[i] + "px";
                    }
                }
                _$grid.jqGrid('setGridParam', { colModel: colModel });

                //列の幅をマウスで変更した時（？）にグリッドの横幅が正しく設定されなくなるjqGridの不具合（？）の対策
                var sum = 0;
                var $td = $("#" + _gridID + " tr.jqgfirstrow td");
                $td.each(function (index) {
                    if (this.style.display != "none") {
                        sum += Number(this.style.width.replace('px', ''));
                    }
                });
                $("#gbox_" + _gridID + " div.ui-jqgrid-hbox table.ui-jqgrid-htable").width(sum);
                _$grid.width(sum);

            }

        };

    };
}
