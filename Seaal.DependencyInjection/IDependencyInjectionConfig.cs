using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.DependencyInjection
{
    public interface IDependencyInjectionConfig
    {
        void RegisterTypes(IContainer container);
    }
}
