using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data.Models.Pugs.Phases
{
    [BsonKnownTypes(typeof(PickPlayerPugPhase))]
    public class BasePugPhase
    {
        public int Type { get; set; }
        public DateTime Expiry { get; set; }
    }
}
