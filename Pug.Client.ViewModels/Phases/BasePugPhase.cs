using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Client.ViewModels.Phases
{
    public abstract class BasePugPhase
    {
        public int Type { get; set; }
        public DateTime Expiry { get; set; }
    }
}
