using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data.Models.Pugs.Phases
{
    [BsonDiscriminator("pickplayer")]
    public class PickPlayerPugPhase : BasePugPhase
    {
        public int TeamIndex { get; set; }
    }
}
