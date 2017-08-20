using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.Data.MongoDB
{
    internal class DocumentCollection<TDocument, TId> : IDocumentCollection<TDocument, TId> where TDocument: IDocument<TId>
    {
        private readonly IMongoCollection<TDocument> _mongoCollection;

        public DocumentCollection(IMongoCollection<TDocument> mongoCollection)
        {
            _mongoCollection = mongoCollection;
        }

        public Task<TDocument> GetDocumentByIdAsync(TId id)
        {
            return _mongoCollection.Find(document => document.Id.Equals(id)).SingleOrDefaultAsync();
        }
    }
}
