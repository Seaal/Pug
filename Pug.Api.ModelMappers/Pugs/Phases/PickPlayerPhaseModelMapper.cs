using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs.Phases;

namespace Pug.Api.ModelMappers.Pugs.Phases
{
    public class PickPlayerPhaseModelMapper : IPugPhaseModelMapper
    {
        public BasePugPhaseViewModel ToViewModel(BasePugPhase pugPhase)
        {
            PickPlayerPugPhase pickPlayerPugPhase = (PickPlayerPugPhase)pugPhase;

            return new PickPlayerPugPhaseViewModel()
            {
                TeamIndex = pickPlayerPugPhase.TeamIndex
            };
        }
    }
}
