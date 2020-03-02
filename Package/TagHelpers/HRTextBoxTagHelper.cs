using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

using Package.Objects;

namespace Package.TagHelpers
{
	/// <summary>
	/// テキストボックス
	/// </summary>
	[HtmlTargetElement("HRTextBox", TagStructure = TagStructure.WithoutEndTag)]
	public class HRTextBoxTagHelper : HRTagHelperBase
	{
		protected IHtmlGenerator Generator { get; set; }
		public HRTextBoxTagHelper(IHtmlGenerator generator)
		{
			Generator = generator;
		}

		[HtmlAttributeName("asp-for")]
		public ModelExpression For { get; set; }

		[HtmlAttributeNotBound]
		[ViewContext]
		public ViewContext ViewContext { get; set; }

		public override void Process(TagHelperContext context, TagHelperOutput output)
		{

			var modelName = For.Name;
			if (For.ModelExplorer.ModelType != typeof(HRTextBox))
			{
				throw new Exception("asp-for=\"@Model." + modelName + "\"はHRTextBox型ではありません。");
			}
			HRTextBox model = (HRTextBox)For.ModelExplorer.Model;

			//hidden BindProperty
			ModelExplorer modelExplorer = For.ModelExplorer;
			string format = "";
			var htmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
			htmlAttributes["type"] = "hidden";
			htmlAttributes["controltype"] = "HRTextBox";
			TagBuilder tagBuilderBindProperty = Generator.GenerateTextBox(
				ViewContext,
				modelExplorer,
				modelName + ".BindProperty",
				model.BindProperty,
				format,
				htmlAttributes);

			//text
			format = "";
			htmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
			htmlAttributes["type"] = "text";
			htmlAttributes["id"] = modelName;
			TagBuilder tagBuilder = Generator.GenerateTextBox(
				ViewContext,
				modelExplorer,
				modelName + ".Text",
				model.Text,
				format,
				htmlAttributes);


			output.TagName = "input";
			output.TagMode = TagMode.SelfClosing;
			output.MergeAttributes(tagBuilder);
			if (tagBuilder.HasInnerHtml)
			{
				output.Content.AppendHtml(tagBuilder.InnerHtml);
			}


			//属性
			foreach (var item in model.Attribute)
			{
				SetAttribute(ref output, item.Key, item.Value);
			}

			//クラス
			SetClass(ref output, model.Class.Value);

			//スタイル
			SetStyle(ref output, model.Style.Value);

			output.Content.SetContent(model.Text);

			output.PostElement.SetHtmlContent(tagBuilderBindProperty.RenderStartTag());

		}


	}
}
