using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.Data.MongoDB
{
    public class MongoConnection : IMongoConnection
    {
        private readonly IMongoDatabase _database;

        public MongoConnection(MongoConfig config)
        {
            if(config == null)
            {
                throw new ArgumentNullException(nameof(config));
            }

            if(config.ConnectionString == null)
            {
                throw new ArgumentNullException(nameof(config.ConnectionString));
            }

            if (config.Database == null)
            {
                throw new ArgumentNullException(nameof(config.ConnectionString));
            }

            ConventionPack conventionPack = new ConventionPack();

            conventionPack.Add(new CamelCaseElementNameConvention());

            ConventionRegistry.Register("Seaal Standard Conventions", conventionPack, t => true);

            MongoClient client = new MongoClient(config.ConnectionString);

            _database = client.GetDatabase(config.Database);
        }

        public IDocumentCollection<TDocument, TId> GetCollection<TDocument, TId>(string collectionName) where TDocument : IDocument<TId>
        {
            return new DocumentCollection<TDocument, TId>(_database.GetCollection<TDocument>(collectionName));
        }
    }
}
