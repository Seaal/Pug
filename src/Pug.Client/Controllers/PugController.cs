using Microsoft.AspNetCore.Mvc;
using Pug.Client.ViewModels;
using Pug.Client.ViewModels.Phases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Client.Controllers
{
    [Route("api/pug")]
    public class PugController : Controller
    {
        [HttpGet("{id}")]
        public async Task<PickUpGame> GetPug(int id)
        {
            return new PickUpGame()
            {
                Id = "12345",
                Path = new[] { "Jedi Knight Academy", "ctfpug", "europug" },
                CurrentPhase = new PickPlayerPugPhase()
                {
                    TeamIndex = 0,
                    Type = 1,
                    Expiry = DateTime.Now.AddSeconds(45)
                },
                PickablePlayers = new[]
                {
                    new Player() { Id = "1", Name = "Dave" },
                    new Player() { Id = "2", Name = "Mercer" },
                    new Player() { Id = "3", Name = "Onasi" },
                    new Player() { Id = "4", Name = "Alpha" }
                },
                Teams = new[]
                {
                    new Team()
                    {
                        Name = "Blue",
                        Captain = new Player() { Id = "5", Name = "Seaal" },
                        Players = new[] { new Player() { Id = "5", Name = "Seaal" } }
                    },
                    new Team()
                    {
                        Name = "Red",
                        Captain = new Player() { Id = "6", Name = "Kimble" },
                        Players = new[] { new Player() { Id = "6", Name = "Kimble" } }
                    }
                }
            };
        }
    }
}
