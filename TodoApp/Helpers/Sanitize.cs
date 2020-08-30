using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace TodoApp.Helpers
{
    public class Sanitize
    {
        public static string SanitizeInput(string input)
        {
            try
            {
                return Regex.Replace(input, @"[^\w\.@-]", "", RegexOptions.None, TimeSpan.FromSeconds(1.5));
            }
            catch (RegexMatchTimeoutException)
            {
                return String.Empty;
            }
        }
    }
}
