using MongoDB.Bson;
using Seaal.Data.MongoDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
