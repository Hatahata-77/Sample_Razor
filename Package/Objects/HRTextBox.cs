using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Package.Objects
{
	public class HRTextBox : HRObjectBase
	{
		public HRTextBox() : base()
		{
		}

		public string Text { get; set; } = "";

		public override string BindProperty
		{
			get
			{
				var sb = new System.Text.StringBuilder();
				sb.Append("{");
				sb.Append("Attribute:'" + this.Attribute.Value + "'");
				sb.Append(",Class:'" + this.Class.Value + "'");
				sb.Append(",Style:'" + this.Style.Value + "'");
				sb.Append(" }");
				return sb.ToString();
			}
			set
			{
				dynamic o = Newtonsoft.Json.JsonConvert.DeserializeObject(value);
				if (o.Attribute != null)
				{
					this.Attribute.Value = o.Attribute.Value;
				}
				if (o.Class != null)
				{
					this.Class.Value = o.Class.Value;
				}
				if (o.Style != null)
				{
					this.Style.Value = o.Style.Value;
				}
			}
		}
	}
}
