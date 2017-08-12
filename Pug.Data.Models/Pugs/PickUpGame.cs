using MongoDB.Bson;
using Seaal.Data.MongoDB;
using Pug.Data.Models.Pugs.Phases;
using System.Collections.Generic;

namespace Pug.Data.Models.Pugs
{
    public class PickUpGame : IDocument<ObjectId>
    {
        public ObjectId Id { get; set; }
        public IEnumerable<string> Path { get; set; }
        public BasePugPhase CurrentPhase { get; set; }
        public IEnumerable<Team> Teams { get; set; }
    }
}
