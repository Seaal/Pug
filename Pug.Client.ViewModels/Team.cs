using System.Collections.Generic;

namespace Pug.Client.ViewModels
{
    public class Team
    {
        public string Name { get; set; }
        public Player Captain { get; set; }
        public IEnumerable<Player> Players { get; set; }
    }
}
