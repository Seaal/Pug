using Microsoft.AspNetCore.Mvc;

namespace Pug.Clients.Web.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        [Route("renewtoken")]
        public IActionResult RenewToken()
        {
            return View();
        }
    }
}
