using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text.Encodings.Web;
namespace Package.TagHelpers
{
	/// <summary>
	/// ボタンの大きさ
	/// </summary>
	public enum emButtonWidth : int
	{
		/// <summary>
		/// 全角3文字程度まで表示できる幅
		/// </summary>
		xSmall = 1,
		/// <summary>
		/// 全角5文字程度まで表示できる幅
		/// </summary>
		small = 2,
		/// <summary>
		/// 全角8文字程度まで表示できる幅
		/// </summary>
		middle = 3,
		/// <summary>
		/// 全角11文字程度まで表示できる幅
		/// </summary>
		large = 4,
		/// <summary>
		/// 全角15文字程度まで表示できる幅
		/// </summary>
		xLarge = 5
	}

	/// <summary>
	/// ボタンの高さ
	/// </summary>
	public enum emButtonHeight : int
	{
		/// <summary>
		/// 高さ22px
		/// </summary>
		small = 1,
		/// <summary>
		/// 高さ30px
		/// </summary>
		medium = 2
	}

	/// <summary>
	/// ボタンに表示するアイコンの種類
	/// </summary>
	public enum emButtonIcon : int
	{
		/// <summary>
		/// アイコンを表示しません
		/// </summary>
		none = 0,
		/// <summary>
		/// 削除アイコンを表示します
		/// </summary>
		delete,
		/// <summary>
		/// 印刷アイコンを表示します
		/// </summary>
		print,
		/// <summary>
		/// プレビューアイコンを表示します
		/// </summary>
		preview,
		/// <summary>
		/// エクセルアイコンを表示します
		/// </summary>
		excel,
		/// <summary>
		/// CSVアイコンを表示します
		/// </summary>
		csv,
		/// <summary>
		/// PDFアイコンを表示します
		/// </summary>
		pdf
	}

	/// <summary>
	/// ラウンドボタン
	/// </summary>
	[HtmlTargetElement("HRButton", TagStructure = TagStructure.WithoutEndTag)]
	public class HRButtonTagHelper : HRTagHelperBase
	{
		/// <summary>
		/// ボタンの大きさを取得・設定します。
		/// </summary>
		[HtmlAttributeName("ButtonWidth")]
		public emButtonWidth ButtonWidth { get; set; } = emButtonWidth.small;

		/// <summary>
		/// ボタンの高さを取得・設定します。
		/// </summary>
		[HtmlAttributeName("ButtonHeight")]
		public emButtonHeight ButtonHeight { get; set; } = emButtonHeight.small;

		/// <summary>
		/// ボタンに表示させるアイコンを取得・設定します。
		/// </summary>
		[HtmlAttributeName("ButtonIcon")]
		public emButtonIcon ButtonIcon { get; set; } = emButtonIcon.none;

		/// <summary>
		/// ダイアログマークを表示するかどうかを取得・設定します。
		/// </summary>
		[HtmlAttributeName("ShowModalIcon")]
		public bool ShowModalIcon { get; set; } = false;

		/// <summary>
		/// ツールチップに表示する文字列を取得・設定します。
		/// </summary>
		[HtmlAttributeName("ToolTip")]
		public string ToolTip { get; set; } = "";

		/// <summary>
		/// ツールチップを表示する位置を取得・設定します。
		/// </summary>
		[HtmlAttributeName("HintPosition")]
		public HRHintTagHelper.emHintPosition HintPosition { get; set; } = HRHintTagHelper.emHintPosition.Auto;





		[HtmlAttributeName("id")]
		public string ID { get; set; }

		[HtmlAttributeName("Text")]
		public string Text { get; set; }

		/// <summary>
		/// ★後回し disabledとの兼ね合いも含めて
		/// </summary>
		[HtmlAttributeName("Enabled")]
		public bool Enabled { get; set; } = true;



		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			subSetStyle(this.ButtonWidth, this.ButtonHeight, this.ButtonIcon, this.ShowModalIcon, out string strClass, out string strStyle);

			output.TagName = "input";

			output.Attributes.Add("type", "submit");
			output.Attributes.Add("id", this.ID);
			output.Attributes.Add("formaction", "?handler=" + this.ID + "_Click");

			//valueとTextが両方設定されている場合にTextを優先させる場合はこんな感じ
			if (this.Text != null)
			{
				if (!output.Attributes.ContainsName("value"))
				{
					output.Attributes.Add("value", this.Text);
				}
				else
				{
					output.Attributes.SetAttribute("value", this.Text);
				}
			}

			//ツールチップ
			if (this.ToolTip.Trim() != "")
			{
				output.Attributes.Add("balloonhint", this.ToolTip);
				output.Attributes.Add("hintpos", ((int)this.HintPosition).ToString());
			}

			//class
			SetClass(ref output, strClass);

			//style
			SetStyle(ref output, strStyle);

		}


		private void subSetStyle(
			emButtonWidth pintButtonWidth,
			emButtonHeight pintButtonHeight,
			emButtonIcon pintButtonIcon,
			bool pbolShowModalIcon,
			out string pstrClass,
			out string pstrStyle)
		{
			const string c_strIconLeft = "hrbutton_l";
			const string c_strIconRight = "hrbutton_r";
			const string c_strBasicClass = "hrbutton";

			int intHeight = 0;
			int intWidth = 0;
			string strHeightType = "";  //ボタンの高さの種類
			string strWidthType = "";   //ボタンの幅の種類
			string strImageName = "";   //ボタンの背景画像名
			string strImageUrl = "";
			//ボタンのスタイル決定に使用
			string strButtonDisabledClass = ""; //ボタンがDisabledのときのクラス
			string strIconPosClass = "";    //アイコンの位置を決定するCSSクラス
			string strBackgroundPosClass = "";  //背景の表示位置を決定するCSSクラス
			string strBalloonHintCss = "";  //バルーンヒントのCSSクラス

			var aryStyles = new List<string>();


			//ボタンの高さを決定
			subGetHeight(pintButtonHeight, out strHeightType, out intHeight);
			//ボタンの幅を決定
			subGetWidth(pintButtonIcon, pbolShowModalIcon, pintButtonWidth, out strWidthType, out intWidth);

			//高さと幅をセット
			aryStyles.Add("height: " + intHeight.ToString() + "px");
			aryStyles.Add("width: " + intWidth.ToString() + "px");

			switch (pintButtonIcon)
			{
				case emButtonIcon.delete:
					strImageName = "hrbutton_del_" + strHeightType + "_" + strWidthType + ".png";
					//アイコンは左
					strIconPosClass = c_strIconLeft;
					break;
				case emButtonIcon.print:
					strImageName = "hrbutton_print_" + strHeightType + "_" + strWidthType + ".png";
					//アイコンは左
					strIconPosClass = c_strIconLeft;
					break;
				case emButtonIcon.preview:
					strImageName = "hrbutton_preview_" + strHeightType + "_" + strWidthType + ".png";
					//アイコンは左
					strIconPosClass = c_strIconLeft;
					break;
				case emButtonIcon.excel:
					strImageName = "hrbutton_excel_" + strHeightType + "_" + strWidthType + ".png";
					//アイコンは左
					strIconPosClass = c_strIconLeft;
					break;
				case emButtonIcon.csv:
					strImageName = "hrbutton_csv_" + strHeightType + "_" + strWidthType + ".png";
					//アイコンは左
					strIconPosClass = c_strIconLeft;
					break;
				case emButtonIcon.pdf:
					strImageName = "hrbutton_pdf_" + strHeightType + "_" + strWidthType + ".png";
					//アイコンは左
					strIconPosClass = c_strIconLeft;
					break;
				case emButtonIcon.none:
				default:
					//デフォルトはアイコンなし
					if (pbolShowModalIcon)
					{
						//ダイアログのアイコンを表示する場合
						strImageName = "hrbutton_dialog_" + strHeightType + "_" + strWidthType + ".png";
						//アイコンは右
						strIconPosClass = c_strIconRight;
					}
					else
					{
						strImageName = "hrbutton_plain_" + strHeightType + "_" + strWidthType + ".png";
						//アイコンなしのため、アイコン位置クラスはセットしない
					}
					break;
			}

			//アイコンの位置によって、背景描画位置を変える
			//-----------
			//背景クラス strBackgroundPosClass
			//-----------
			//　クラス名は「高さ_状態」を表す。
			//（例）hrbutton_s_n   //高さsmall、使用可能状態を表す
			//（例）hrbutton_m_d //高さmedium、使用不可状態を表す
			//-----------
			strBackgroundPosClass = "hrbutton_" + strHeightType;
			if (this.Enabled)
			{
				strButtonDisabledClass = "";
				strBackgroundPosClass += "_n";
			}
			else
			{
				strButtonDisabledClass = "hrbutton_d";
				strBackgroundPosClass += "_d";
			}

			//バルーンヒントを表示するかどうか
			if (this.ToolTip.Trim() != "")
			{
				strBalloonHintCss = "balloonhint";
			}

			//CSSを適用する
			var aryClasses = new string[] { c_strBasicClass, strIconPosClass, strBackgroundPosClass, strButtonDisabledClass, strBalloonHintCss };

			//背景イメージを設定
			strImageUrl = "../../images/" + strImageName;
			aryStyles.Add("background-image: url(" + strImageUrl + ")");

			//OUT引数
			pstrClass = string.Join(" ", aryClasses).Trim();
			pstrStyle = string.Join("; ", aryStyles) + ";";

		}

		/// <summary>
		/// ボタンの高さを決定します。
		/// </summary>
		/// <param name="pintButtonHeight">ボタンの高さの種類</param>
		/// <param name="pstrHeightType">（OUT）ボタンの高さ別の記号。CSSクラス、背景画像に使用</param>
		/// <param name="pintHeight">（OUT）高さの数値</param>
		private void subGetHeight(
			emButtonHeight pintButtonHeight,
			out string pstrHeightType,
			out int pintHeight)
		{
			switch (pintButtonHeight)
			{
				case emButtonHeight.small:
					pintHeight = 22;
					pstrHeightType = "s";
					break;
				case emButtonHeight.medium:
					pintHeight = 30;
					pstrHeightType = "m";
					break;
				default:
					//デフォルトは小さいサイズ
					pintHeight = 22;
					pstrHeightType = "s";
					break;
			}
		}

		/// <summary>
		/// ボタンの幅を決定します。
		/// </summary>
		/// <param name="pintButtonIcon">ボタンに表示するアイコンの種類</param>
		/// <param name="pbolShowModalIcon">モーダルアイコンを表示するかどうか</param>
		/// <param name="pintButtonWidth">ボタンの幅の種類</param>
		/// <param name="pstrWidthType">（OUT）ボタンの幅別の記号。CSSクラス、背景画像に適用</param>
		/// <param name="pintWidth">（OUT）幅の数値</param>
		private void subGetWidth(
			emButtonIcon pintButtonIcon,
			bool pbolShowModalIcon,
			emButtonWidth pintButtonWidth,
			out string pstrWidthType,
			out int pintWidth)
		{
			bool bolNoIcon = false;
			switch (pintButtonIcon)
			{
				case emButtonIcon.delete:
				case emButtonIcon.print:
				case emButtonIcon.preview:
				case emButtonIcon.excel:
				case emButtonIcon.csv:
				case emButtonIcon.pdf:
					break;
				case emButtonIcon.none:
				default:
					if (!pbolShowModalIcon)
					{
						//アイコンは表示しない
						bolNoIcon = true;
					}
					break;
			}

			if (bolNoIcon)
			{
				//通常のボタン
				switch (pintButtonWidth)
				{
					case emButtonWidth.xSmall:
						pstrWidthType = "xs";
						pintWidth = 60;
						break;
					case emButtonWidth.middle:
						pstrWidthType = "m";
						pintWidth = 130;
						break;
					case emButtonWidth.large:
						pstrWidthType = "l";
						pintWidth = 170;
						break;
					case emButtonWidth.xLarge:
						pstrWidthType = "xl";
						pintWidth = 222;
						break;
					case emButtonWidth.small:
					default:
						//デフォルトはsmallサイズ
						pstrWidthType = "s";
						pintWidth = 90;
						break;
				}
			}
			else
			{
				//アイコンを表示する
				switch (pintButtonWidth)
				{
					case emButtonWidth.xSmall:
						pstrWidthType = "xs";
						pintWidth = 85;
						break;
					case emButtonWidth.middle:
						pstrWidthType = "m";
						pintWidth = 155;
						break;
					case emButtonWidth.large:
						pstrWidthType = "l";
						pintWidth = 195;
						break;
					case emButtonWidth.xLarge:
						pstrWidthType = "xl";
						pintWidth = 252;
						break;
					case emButtonWidth.small:
					default:
						//デフォルトはsmallサイズ
						pstrWidthType = "s";
						pintWidth = 112;
						break;
				}
			}

		}



	}
}
