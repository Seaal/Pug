using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Api.ViewModels.Pugs;
using Pug.Data.Models.Pugs;

namespace Pug.Api.ModelMappers.Pugs
{
    public class PlayerModelMapper : IPlayerModelMapper
    {
        public PlayerViewModel ToViewModel(Player player)
        {
            return new PlayerViewModel()
            {
                Id = player.Id,
                Name = player.Name
            };
        }
    }
}
