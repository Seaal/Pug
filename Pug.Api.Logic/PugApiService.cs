using System.Threading.Tasks;
using Pug.Data;
using Pug.Data.Models.Pugs;
using Pug.Api.ViewModels.Pugs;
using Pug.Api.ViewModels.Pugs.Phases;

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

            return new PickUpGameViewModel();
        }
    }
}
