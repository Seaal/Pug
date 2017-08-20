using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.DependencyInjection
{
    public class Registration
    {
        public Type Interface { get; set; }
        public Type Implementation { get; set; }
    }
}
