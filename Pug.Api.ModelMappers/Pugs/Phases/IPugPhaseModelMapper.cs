using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs.Phases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Api.ModelMappers.Pugs.Phases
{
    public interface IPugPhaseModelMapper
    {
        BasePugPhaseViewModel ToViewModel(BasePugPhase pugPhase);
    }
}
