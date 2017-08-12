using Pug.Api.ViewModels.Pugs;
using System.Threading.Tasks;

namespace Pug.Api.Logic
{
    public interface IPugApiService
    {
        Task<PickUpGameViewModel> GetPugAsync(string id);
    }
}
