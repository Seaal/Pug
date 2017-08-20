using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.Data.MongoDB
{
    public interface IDocumentCollection<TDocument, TId> where TDocument : IDocument<TId>
    {
        Task<TDocument> GetDocumentByIdAsync(TId id);
    }
}
