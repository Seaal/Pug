using Pug.Api.ViewModels.Pugs.Phases;
using System.Collections.Generic;

namespace Pug.Api.ViewModels.Pugs
{
    public class PickUpGameViewModel
    {
        public string Id { get; set; }
        public IEnumerable<string> Path { get; set; }
        public BasePugPhaseViewModel CurrentPhase { get; set; }
        public IEnumerable<TeamViewModel> Teams { get; set; }
        public IEnumerable<PlayerViewModel> PickablePlayers { get; set; }
    }
}
