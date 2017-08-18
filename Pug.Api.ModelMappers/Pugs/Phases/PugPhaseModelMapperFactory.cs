using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Data.Models.Pugs.Phases;
using Pug.Domain;

namespace Pug.Api.ModelMappers.Pugs.Phases
{
    public class PugPhaseModelMapperFactory : IPugPhaseModelMapperFactory
    {
        public IPugPhaseModelMapper Make(BasePugPhase pugPhase)
        {
            IPugPhaseModelMapper modelMapper = GetModelMapper(pugPhase);

            return new BasePropertiesPugPhaseModelMapperDecorator(modelMapper);
        }

        private IPugPhaseModelMapper GetModelMapper(BasePugPhase pugPhase)
        {
            switch (pugPhase.Type)
            {
                case PugPhaseType.PickPlayer:
                    return new PickPlayerPhaseModelMapper();
                default:
                    throw new ArgumentException($"Pug Phase {pugPhase.Type} is not supported");
            }
        }
    }
}
