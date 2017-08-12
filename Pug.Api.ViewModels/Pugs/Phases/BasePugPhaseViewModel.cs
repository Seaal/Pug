using System;

namespace Pug.Api.ViewModels.Pugs.Phases
{
    public abstract class BasePugPhaseViewModel
    {
        public int Type { get; set; }
        public DateTime Expiry { get; set; }
    }
}
