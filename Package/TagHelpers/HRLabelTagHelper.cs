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
	/// ラベル
	/// </summary>
	[HtmlTargetElement("HRLabel", TagStructure = TagStructure.WithoutEndTag)]
	public class HRLabelTagHelper : HRTagHelperBase
	{
		protected IHtmlGenerator Generator { get; set; }
		public HRLabelTagHelper(IHtmlGenerator generator)
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
			if (For.ModelExplorer.ModelType != typeof(Package.Objects.HRLabel))
			{
				throw new Exception("asp-for=\"@Model." + modelName + "\"はHRLabel型ではありません。");
			}
			HRLabel model = (HRLabel)For.ModelExplorer.Model;

			//hidden BindProperty
			ModelExplorer modelExplorer = For.ModelExplorer;
			string format = "";
			var htmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
			htmlAttributes["type"] = "hidden";
			htmlAttributes["controltype"] = "HRLabel";
			TagBuilder tagBuilder = Generator.GenerateTextBox(
				ViewContext,
				modelExplorer,
				modelName + ".BindProperty",
				model.BindProperty,
				format,
				htmlAttributes);

			output.TagName = "span";
			output.TagMode = TagMode.StartTagAndEndTag;
			if (output.Attributes.ContainsName("id"))
			{
				output.Attributes.SetAttribute("id", modelName);
			}
			else
			{
				output.Attributes.Add("id", modelName);
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

			output.PostElement.SetHtmlContent(tagBuilder.RenderStartTag());

		}

	}
}
