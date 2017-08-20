using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs.Phases;

namespace Pug.Api.ModelMappers.Pugs.Phases
{
    public class BasePropertiesPugPhaseModelMapperDecorator : IPugPhaseModelMapper
    {
        IPugPhaseModelMapper _pugPhaseModelMapper;

        public BasePropertiesPugPhaseModelMapperDecorator(IPugPhaseModelMapper pugPhaseModelMapper)
        {
            _pugPhaseModelMapper = pugPhaseModelMapper;
        }

        public BasePugPhaseViewModel ToViewModel(BasePugPhase pugPhase)
        {
            BasePugPhaseViewModel viewModel = _pugPhaseModelMapper.ToViewModel(pugPhase);

            viewModel.Expiry = DateTime.Now.AddSeconds(30);
            viewModel.Type = pugPhase.Type;

            return viewModel;
        }
    }
}
