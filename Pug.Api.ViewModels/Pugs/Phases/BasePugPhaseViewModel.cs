using Pug.Domain;
using System;

namespace Pug.Api.ViewModels.Pugs.Phases
{
    public abstract class BasePugPhaseViewModel
    {
        public PugPhaseType Type { get; set; }
        public DateTime Expiry { get; set; }
    }
}
