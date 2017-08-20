using System.Collections.Generic;

namespace Pug.Api.ViewModels.Pugs
{
    public class TeamViewModel
    {
        public string Name { get; set; }
        public PlayerViewModel Captain { get; set; }
        public IEnumerable<PlayerViewModel> Players { get; set; }
    }
}
