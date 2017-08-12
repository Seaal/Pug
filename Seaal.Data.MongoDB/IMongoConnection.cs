using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.Data.MongoDB
{
    public interface IMongoConnection
    {
        IDocumentCollection<TDocument, TId> GetCollection<TDocument, TId>(string collectionName) where TDocument : IDocument<TId>;
    }
}
