using Seaal.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.Data.MongoDB
{
    public class DependencyInjectionConfig : IDependencyInjectionConfig
    {
        public void RegisterTypes(IContainer container)
        {
            container.RegisterSingleton<IMongoConnection, MongoConnection>();
        }
    }
}
