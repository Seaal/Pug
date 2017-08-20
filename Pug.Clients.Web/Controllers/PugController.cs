using Microsoft.AspNetCore.Mvc;
using Pug.Api.Logic;
using Pug.Api.ViewModels.Pugs;
using System.Threading.Tasks;

namespace Pug.Client.Controllers
{
    [Route("api/pug")]
    public class PugController : Controller
    {
        private readonly IPugApiService _pugApiService;

        public PugController(IPugApiService pugApiService)
        {
            _pugApiService = pugApiService;
        }

        [HttpGet("{id}")]
        public Task<PickUpGameViewModel> GetPug(string id)
        {
            return _pugApiService.GetPugAsync(id);
        }
    }
}
