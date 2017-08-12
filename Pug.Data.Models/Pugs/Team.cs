using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data.Models.Pugs
{
    public class Team
    {
        public string Name { get; set; }
        public IEnumerable<TeamPlayer> Players { get; set; }
    }
}
