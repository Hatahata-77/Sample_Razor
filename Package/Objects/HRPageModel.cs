using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Package.TagHelpers;

namespace Package.Objects
{
	public class HRPageModel : PageModel
	{
		public bool IsPostBack = false;
	}
}
