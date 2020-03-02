using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Package.TagHelpers
{
	/// <summary>
	/// バルーンヒント
	/// </summary>
	[HtmlTargetElement("HRHint", TagStructure = TagStructure.WithoutEndTag)]
	public class HRHintTagHelper : HRTagHelperBase
	{

		/// <summary>
		/// ツールチップの表示位置
		/// </summary>
		public enum emHintPosition : int
		{
			/// <summary>
			/// 表示位置は自動調整されます。
			/// </summary>
			Auto = 0,
			/// <summary>
			/// アイコンの上に表示されます。
			/// </summary>
			Top,
			/// <summary>
			/// アイコンの下に表示されます。
			/// </summary>
			Bottom,
			/// <summary>
			/// アイコンの左に表示されます。
			/// </summary>
			Left,
			/// <summary>
			/// アイコンの右に表示されます。
			/// </summary>
			Right
		}


		private const int c_intWidth = 24;	//アイコンの幅（変更する場合はHRHint.cssも修正して下さい）
		private const int c_intHeight = 18;	//アイコンの高さ（変更する場合はHRHint.cssも修正して下さい）
		private const string c_strVKey_CssClass = "HRHintCssClass"; //Cssクラスを保持しておくためのもの

		/// <summary>
		/// ツールチップに表示する文章を取得・設定します。&lt;br&gt;タグを入れると改行できます。
		/// </summary>
		[HtmlAttributeName("Message")]
		public string Message { get; set; } = "";

		/// <summary>
		/// ツールチップを表示する位置を取得・設定します。
		/// </summary>
		[HtmlAttributeName("HintPosition")]
		public emHintPosition HintPosition { get; set; } = emHintPosition.Auto;

		/// <summary>
		/// ★実装後回し：コントロールを有効にするかどうかを取得・設定します。
		/// </summary>
		[HtmlAttributeName("Enabled")]
		public bool Enabled { get; set; } = true;



		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			output.TagName = "span";
			output.TagMode = TagMode.StartTagAndEndTag;

			output.Attributes.Add("balloonhint", this.Message);
			output.Attributes.Add("hintpos", ((int)this.HintPosition).ToString());

			//class
			var strClass = "balloonhint";
			var objClass = output.Attributes.FirstOrDefault(a => a.Name == "class");
			if (objClass == null)
			{
				output.Attributes.Add("class", strClass);
			}
			else
			{
				var strClassOrg = objClass.Value.ToString().Trim();
				if (strClassOrg == "")
				{
					output.Attributes.SetAttribute("class", strClass);
				}
				else
				{
					output.Attributes.SetAttribute("class", strClassOrg + " " + strClass);
				}
			}

			//style
			var strStyle = "background-image: url(../../images/hrhint.png)";
			var objStyle = output.Attributes.FirstOrDefault(a => a.Name == "style");
			if (objStyle == null)
			{
				output.Attributes.Add("style", strStyle);
			}
			else
			{
				var strStyleOrg = objStyle.Value.ToString().Trim();
				if (strStyleOrg == "")
				{
					output.Attributes.SetAttribute("style", strStyle);
				}
				else
				{
					if (!strStyleOrg.EndsWith(";"))
					{
						strStyleOrg += ";";
					}
					output.Attributes.SetAttribute("style", strStyleOrg + " " + strStyle);
				}
			}


		}

	}
}
