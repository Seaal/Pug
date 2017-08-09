using System;

namespace Pug.ViewModels.Phases
{
    public abstract class BasePugPhase
    {
        public int Type { get; set; }
        public DateTime Expiry { get; set; }
    }
}
