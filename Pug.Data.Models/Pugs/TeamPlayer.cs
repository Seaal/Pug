using Pug.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data.Models.Pugs
{
    public class TeamPlayer : Player
    {
        public TeamPlayerType Type { get; set; }
    }
}
