using System.Threading.Tasks;
using Pug.Data;
using Pug.Data.Models.Pugs;
using Pug.Api.ViewModels.Pugs;
using System.Linq;
using Pug.Api.ViewModels.Pugs.Phases;
using System;
using Pug.Domain;

namespace Pug.Api.Logic
{
    public class PugApiService : IPugApiService
    {
        private readonly IPickUpGameRepository _pugRepository;

        public PugApiService(IPickUpGameRepository pugRepository)
        {
            _pugRepository = pugRepository;
        }

        public async Task<PickUpGameViewModel> GetPugAsync(string id)
        {
            PickUpGame pug = await _pugRepository.Get(id);

            return new PickUpGameViewModel()
            {
                Id = pug.Id.ToString(),
                Path = pug.Path,
                PickablePlayers = new[]
                {
                    new PlayerViewModel() { Id = "3", Name = "Onasi" },
                    new PlayerViewModel() { Id = "4", Name = "Alpha" },
                    new PlayerViewModel() { Id = "5", Name = "Dave" },
                    new PlayerViewModel() { Id = "6", Name = "Max" },
                },
                Teams = pug.Teams.Select(t => new TeamViewModel()
                {
                    Name = t.Name,
                    Captain = t.Players.Where(p => p.Type == TeamPlayerType.Captain).Select(p => new PlayerViewModel()
                    {
                        Id = p.Id,
                        Name = p.Name
                    }).FirstOrDefault(),
                    Players = t.Players.Select(p => new PlayerViewModel()
                    {
                        Id = p.Id,
                        Name = p.Name
                    })
                }),
                CurrentPhase = new PickPlayerPugPhaseViewModel()
                {
                    Expiry = DateTime.UtcNow.AddSeconds(30),
                    Type = 1,
                    TeamIndex = 0
                }
            };
        }
    }
}
