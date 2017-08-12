using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.DependencyInjection
{
    public interface IContainer
    {
        void RegisterSingleton<TInterface, TImplementation>() where TImplementation : class, TInterface where TInterface : class;
    }
}
