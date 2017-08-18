using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs.Phases;

namespace Pug.Api.ModelMappers.Pugs.Phases
{
    public class PugPhaseModelMapper : IPugPhaseModelMapper
    {
        private readonly IPugPhaseModelMapperFactory _modelMapperFactory;

        public PugPhaseModelMapper(IPugPhaseModelMapperFactory modelMapperFactory)
        {
            _modelMapperFactory = modelMapperFactory;
        }
        
        public BasePugPhaseViewModel ToViewModel(BasePugPhase pugPhase)
        {
            IPugPhaseModelMapper modelMapper = _modelMapperFactory.Make(pugPhase);

            return modelMapper.ToViewModel(pugPhase);
        }
    }
}
