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
	[HtmlTargetElement("HRGrid", TagStructure = TagStructure.WithoutEndTag)]
	public class HRGridTagHelper : HRTagHelperBase
	{
		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			output.TagName = "table";
			output.TagMode = TagMode.StartTagAndEndTag;
			output.PreElement.SetHtmlContent("pre element");
			output.PreContent.SetHtmlContent("pre content");
			output.Content.SetHtmlContent("content");
			output.PostContent.SetHtmlContent("post content");
			output.PostElement.SetHtmlContent("post element");
		}
	}
}
