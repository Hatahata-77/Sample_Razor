using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Package.Objects;
using System.Drawing;

namespace Package.Pages.webForm_P.Sys_O
{
	[BindProperties]
	public class HRPOM0101Model : HRPageModel
	{
		#region "ModelProperty"
		public HRLabel label1 { get; set; } = new HRLabel();
		public HRTextBox textbox1 { get; set; } = new HRTextBox();
		#endregion

		#region "EventHandler"
		//ここはスニペット使って作って
		public IActionResult OnGet()
		{
			IsPostBack = false;
			Page_Load();
			return Page();
		}

		public IActionResult OnPost()
		{
			IsPostBack = true;
			Page_Load();
			ModelState.Clear();
			return Page();
		}

		public IActionResult OnPostBTN1_Click()
		{
			IsPostBack = true;
			Page_Load();
			BTN1_Click();
			ModelState.Clear();
			return Page();
		}

		public IActionResult OnPostAjax_AjaxTest()
		{
			var result = AjaxTest();
			return new JsonResult(result);
		}
		#endregion

		//この下をプログラマが書くイメージ
		private void Page_Load()
		{
			if (!IsPostBack)
			{
				this.label1.Text = "page_load_" + IsPostBack.ToString();
			}
			else
			{
				this.label1.Text = "page_load_" + IsPostBack.ToString();
			}
		}

		private void BTN1_Click()
		{
			this.textbox1.Text = this.textbox1.Text + "a";
		}

		private string AjaxTest()
		{
			string sample = Request.Form["sample"].ToString();
			if (sample == "1")
			{
				return "red";
			}
			else
			{
				return "green";
			}
		}

	}

}

