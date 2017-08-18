using System.Threading.Tasks;
using Pug.Data;
using Pug.Data.Models.Pugs;
using Pug.Api.ViewModels.Pugs;
using System.Linq;
using Pug.Api.ViewModels.Pugs.Phases;
using System;
using Pug.Domain;
using Pug.Api.ModelMappers.Pugs;

namespace Pug.Api.Logic
{
    public class PugApiService : IPugApiService
    {
        private readonly IPickUpGameRepository _pugRepository;
        private readonly IPickUpGameModelMapper _pugModelMapper;

        public PugApiService(IPickUpGameRepository pugRepository, IPickUpGameModelMapper pugModelMapper)
        {
            _pugRepository = pugRepository;
            _pugModelMapper = pugModelMapper;
        }

        public async Task<PickUpGameViewModel> GetPugAsync(string id)
        {
            PickUpGame pug = await _pugRepository.Get(id);

            PickUpGameViewModel pugViewModel = _pugModelMapper.ToViewModel(pug);

            pugViewModel.PickablePlayers = new[]
            {
                new PlayerViewModel() { Id = "3", Name = "Onasi" },
                new PlayerViewModel() { Id = "4", Name = "Alpha" },
                new PlayerViewModel() { Id = "5", Name = "Dave" },
                new PlayerViewModel() { Id = "6", Name = "Max" },
            };

            return pugViewModel;
        }
    }
}
