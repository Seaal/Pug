using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pug.Api.ViewModels.Pugs;
using Pug.Data.Models.Pugs;
using Pug.Domain;

namespace Pug.Api.ModelMappers.Pugs
{
    public class TeamModelMapper : ITeamModelMapper
    {
        private readonly IPlayerModelMapper _playerModelMapper;

        public TeamModelMapper(IPlayerModelMapper playerModelMapper)
        {
            _playerModelMapper = playerModelMapper;
        }

        public TeamViewModel ToViewModel(Team team)
        {
            return new TeamViewModel()
            {
                Name = team.Name,
                Captain = _playerModelMapper.ToViewModel(team.Players.First(p => p.Type == TeamPlayerType.Captain)),
                Players = team.Players.Select(_playerModelMapper.ToViewModel)
            };
        }
    }
}
