using MongoDB.Bson;
using Pug.Data.Models;
using Seaal.Data.MongoDB;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data
{
    public class PickUpGameRepository : IPickUpGameRepository
    {
        private readonly IDocumentCollection<PickUpGame, ObjectId> _documentCollection;
        private const string _collectionName = "pugs";

        public PickUpGameRepository(IMongoConnection connection)
        {
            _documentCollection = connection.GetCollection<PickUpGame, ObjectId>(_collectionName);
        }

        public Task<PickUpGame> Get(string id)
        {
            return _documentCollection.GetDocumentByIdAsync(new ObjectId(id));
        }
    }
}
