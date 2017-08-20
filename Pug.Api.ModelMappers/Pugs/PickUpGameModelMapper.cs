using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Api.ViewModels.Pugs;
using Pug.Data.Models.Pugs;
using Pug.Api.ModelMappers.Pugs.Phases;

namespace Pug.Api.ModelMappers.Pugs
{
    public class PickUpGameModelMapper : IPickUpGameModelMapper
    {
        private readonly ITeamModelMapper _teamModelMapper;
        private readonly IPugPhaseModelMapper _pugPhaseModelMapper;

        public PickUpGameModelMapper(ITeamModelMapper teamModelMapper, IPugPhaseModelMapper pugPhaseModelMapper)
        {
            _teamModelMapper = teamModelMapper;
            _pugPhaseModelMapper = pugPhaseModelMapper;
        }

        public PickUpGameViewModel ToViewModel(PickUpGame pug)
        {
            return new PickUpGameViewModel()
            {
                Id = pug.Id.ToString(),
                Path = pug.Path,
                Teams = pug.Teams.Select(_teamModelMapper.ToViewModel),
                CurrentPhase = _pugPhaseModelMapper.ToViewModel(pug.CurrentPhase)
            };
        }
    }
}
