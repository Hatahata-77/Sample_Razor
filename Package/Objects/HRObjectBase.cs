using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Drawing;

namespace Package.Objects
{
	public abstract class HRObjectBase
	{
		public HRObjectBase()
		{
		}
		public abstract string BindProperty { get; set; }
		public HRViewAttributes Attribute { get; set; } = new HRViewAttributes();
		public HRViewClasses Class { get; set; } = new HRViewClasses();
		public HRViewStyles Style { get; set; } = new HRViewStyles();

		public bool ReadOnly
		{
			get
			{
				return this.Attribute.Contains("readonly");
			}
			set
			{
				if (value)
				{
					this.Attribute.Set("readonly", "readonly");
					this.Class.Set("readonly");
				}
				else
				{
					this.Attribute.Remove("readonly");
					this.Class.Remove("readonly");
				}
			}
		}

		public Color ForeColor
		{
			get
			{
				if (this.Style.Contains("color"))
				{
					var colorString = this.Style.Get("color");
					if (colorString.StartsWith("#"))
					{
						var r = Convert.ToInt32("0x" + colorString.Substring(1, 2), 16);
						var g = Convert.ToInt32("0x" + colorString.Substring(3, 2), 16);
						var b = Convert.ToInt32("0x" + colorString.Substring(5, 2), 16);
						return Color.FromArgb(r, g, b);
					}
					else
					{
						return Color.FromName(colorString);
					}
				}
				else
				{
					return new Color();
				}
			}
			set
			{
				if (value.IsNamedColor)
				{
					this.Style.Set("color", value.Name);
				}
				else
				{
					var val = Convert.ToString(value.ToArgb(), 16).Substring(2).ToUpper();
					this.Style.Set("color", "#" + val);
				}
			}
		}

		public Color BackColor
		{
			get
			{
				if (this.Style.Contains("background-color"))
				{
					var colorString = this.Style.Get("background-color");
					if (colorString.StartsWith("#"))
					{
						var r = Convert.ToInt32("0x" + colorString.Substring(1, 2), 16);
						var g = Convert.ToInt32("0x" + colorString.Substring(3, 2), 16);
						var b = Convert.ToInt32("0x" + colorString.Substring(5, 2), 16);
						return Color.FromArgb(r, g, b);
					}
					else
					{
						return Color.FromName(colorString);
					}
				}
				else
				{
					return new Color();
				}
			}
			set
			{
				if (value.IsNamedColor)
				{
					this.Style.Set("background-color", value.Name);
				}
				else
				{
					var val = Convert.ToString(value.ToArgb(), 16).Substring(2).ToUpper();
					this.Style.Set("background-color", "#" + val);
				}
			}
		}

		public decimal Height
		{
			get
			{
				decimal ret = 0;
				if (this.Style.Contains("height"))
				{
					string value = this.Style.Get("height").Replace("px", "");
					if (decimal.TryParse(value, out ret))
					{
						return ret;
					}
					else
					{
						return ret;  //何を返すべきか？
					}
				}
				else
				{
					return ret;  //何を返すべきか？
				}
			}
			set
			{
				this.Style.Set("height", value.ToString() + "px");
				//this.Style.Set("display", "inline-block");
			}
		}

		public decimal Width
		{
			get
			{
				decimal ret = 0;
				if (this.Style.Contains("width"))
				{
					string value = this.Style.Get("width").Replace("px", "");
					if (decimal.TryParse(value, out ret))
					{
						return ret;
					}
					else
					{
						return ret;  //何を返すべきか？
					}
				}
				else
				{
					return ret;  //何を返すべきか？
				}
			}
			set
			{
				this.Style.Set("width", value.ToString() + "px");
				//this.Style.Set("display", "inline-block");
			}
		}

	}



	public class HRViewClasses : IEnumerable<string>
	{
		private readonly List<string> _list;

		public HRViewClasses()
		{
			_list = new List<string>();
		}

		public IEnumerator<string> GetEnumerator()
		{
			foreach (var item in _list)
			{
				yield return item;
			}
		}
		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => this.GetEnumerator();

		public void Set(string value)  //SetよりAddの方がいい？
		{
			if (!_list.Contains(value))
			{
				_list.Add(value);
			}
		}

		public bool Contains(string value)
		{
			return _list.Contains(value);
		}

		public void Remove(string value)
		{
			if (_list.Contains(value))
			{
				_list.Remove(value);
			}
		}

		public string Value
		{
			get
			{
				var sb = new System.Text.StringBuilder();
				foreach (var item in _list)
				{
					if (sb.Length != 0)
					{
						sb.Append(" ");
					}
					sb.Append(item);
				}
				return sb.ToString();
			}
			set
			{
				_list.Clear();
				string[] classes = value.Split(" ");
				foreach (var cls in classes)
				{
					if (String.IsNullOrWhiteSpace(cls))
					{
						continue;
					}
					_list.Add(cls);
				}
			}
		}
	}

	public class HRViewStyles : IEnumerable<KeyValuePair<string, string>>
	{
		private readonly Dictionary<string, string> _dic;

		public HRViewStyles()
		{
			_dic = new Dictionary<string, string>();
		}

		public IEnumerator<KeyValuePair<string, string>> GetEnumerator()
		{
			foreach (var item in _dic)
			{
				yield return item;
			}
		}
		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => this.GetEnumerator();

		//public string this [string key]  //インデクサにするかメソッド作るか？
		//{
		//	get
		//	{
		//		return _dic[key];
		//	}
		//	set
		//	{
		//		if (_dic.ContainsKey(key))
		//		{
		//			_dic[key] = value;
		//		}
		//		else
		//		{
		//			_dic.Add(key, value);
		//		}
		//	}
		//}

		public string Get(string key)
		{
			if (_dic.ContainsKey(key))
			{
				return _dic[key];
			}
			else
			{
				return "";  //空白がよい？nullがよい？
			}
		}
		public void Set(string key, string value)
		{
			if (_dic.ContainsKey(key))
			{
				_dic[key] = value;
			}
			else
			{
				_dic.Add(key, value);
			}
		}

		public bool Contains(string key)
		{
			return _dic.ContainsKey(key);
		}

		public void Remove(string key)
		{
			if (_dic.ContainsKey(key))
			{
				_dic.Remove(key);
			}
		}

		public string Value
		{
			get
			{
				var sb = new System.Text.StringBuilder();
				foreach (var item in _dic)
				{
					if (sb.Length != 0)
					{
						sb.Append(" ");
					}
					sb.Append(item.Key + ": " + item.Value + ";");
				}
				return sb.ToString();
			}
			set
			{
				_dic.Clear();
				string[] styles = value.Split(";");
				foreach (var style in styles)
				{
					if (String.IsNullOrWhiteSpace(style) || !style.Contains(":"))
					{
						continue;
					}
					string[] wk = style.Split(":");
					_dic.Add(wk[0].Trim(), wk[1].Trim());
				}
			}
		}
	}

	public class HRViewAttributes : IEnumerable<KeyValuePair<string, string>>
	{
		private readonly Dictionary<string, string> _dic;

		public HRViewAttributes()
		{
			_dic = new Dictionary<string, string>();
		}

		public IEnumerator<KeyValuePair<string, string>> GetEnumerator()
		{
			foreach (var item in _dic)
			{
				yield return item;
			}
		}
		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => this.GetEnumerator();

		//public string this[string key]  //インデクサにするかメソッド作るか？
		//{
		//	get
		//	{
		//		return _dic[key];
		//	}
		//	set
		//	{
		//		if (_dic.ContainsKey(key))
		//		{
		//			_dic[key] = value;
		//		}
		//		else
		//		{
		//			_dic.Add(key, value);
		//		}
		//	}
		//}

		public string Get(string key)
		{
			if (_dic.ContainsKey(key))
			{
				return _dic[key];
			}
			else
			{
				return "";  //空白がよい？nullがよい？
			}
		}
		public void Set(string key, string value)
		{
			if (_dic.ContainsKey(key))
			{
				_dic[key] = value;
			}
			else
			{
				_dic.Add(key, value);
			}
		}

		public bool Contains(string key)
		{
			return _dic.ContainsKey(key);
		}

		public void Remove(string key)
		{
			if (_dic.ContainsKey(key))
			{
				_dic.Remove(key);
			}
		}

		public string Value
		{
			get
			{
				var sb = new System.Text.StringBuilder();
				foreach (var item in _dic)
				{
					if (sb.Length != 0)
					{
						sb.Append(" ");
					}
					sb.Append(item.Key + ": " + item.Value + ";");
				}
				return sb.ToString();
			}
			set
			{
				_dic.Clear();
				string[] Attributes = value.Split(";");
				foreach (var Attribute in Attributes)
				{
					if (String.IsNullOrWhiteSpace(Attribute) || !Attribute.Contains(":"))
					{
						continue;
					}
					string[] wk = Attribute.Split(":");
					_dic.Add(wk[0].Trim(), wk[1].Trim());
				}
			}
		}
	}

}
