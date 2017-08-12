using Pug.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data
{
    public interface IPickUpGameRepository
    {
        Task<PickUpGame> Get(string id);
    }
}
