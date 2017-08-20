using FluentAssertions;
using NSubstitute;
using Pug.Api.ModelMappers.Pugs;
using Pug.Api.ViewModels.Pugs;
using Pug.Data.Models.Pugs;
using Pug.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Pug.Api.ModelMappers.Tests.Pugs
{
    public class TeamModelMapperTests
    {
        private readonly TeamModelMapper _teamModelMapper;
        private readonly IPlayerModelMapper _playerModelMapper;
        private readonly Team _team;

        public TeamModelMapperTests()
        {
            _playerModelMapper = Substitute.For<IPlayerModelMapper>();

            _teamModelMapper = new TeamModelMapper(_playerModelMapper);

            _team = new Team()
            {
                Players = new TeamPlayer[0]
            };
        }

        public class ToViewModel : TeamModelMapperTests
        {
            private readonly TeamPlayer _captain;

            public ToViewModel()
            {
                _captain = new TeamPlayer()
                {
                    Type = TeamPlayerType.Captain
                };

                _team.Players = new[] { _captain };
            }

            [Fact]
            public void Should_Set_Name_From_Team()
            {
                //Arrange
                _team.Name = "TeamName";

                //Act
                TeamViewModel teamViewModel = _teamModelMapper.ToViewModel(_team);

                //Assert
                teamViewModel.Name.Should().Be("TeamName");
            }

            [Fact]
            public void Should_Set_Captain_From_Team()
            {
                //Arrange
                PlayerViewModel captainViewModel = new PlayerViewModel();

                _playerModelMapper.ToViewModel(_captain).Returns(captainViewModel);

                //Act
                TeamViewModel teamViewModel = _teamModelMapper.ToViewModel(_team);

                //Assert
                teamViewModel.Captain.Should().Be(captainViewModel);
            }

            [Fact]
            public void Should_Set_Players_From_PlayerModelMapper()
            {
                //Arrange
                TeamPlayer player2 = new TeamPlayer();

                PlayerViewModel playerViewModel1 = new PlayerViewModel();
                PlayerViewModel playerViewModel2 = new PlayerViewModel();

                _playerModelMapper.ToViewModel(_captain).Returns(playerViewModel1);
                _playerModelMapper.ToViewModel(player2).Returns(playerViewModel2);

                _team.Players = new[] { _captain, player2 };

                //Act
                TeamViewModel teamViewModel = _teamModelMapper.ToViewModel(_team);

                //Assert
                teamViewModel.Players.Should().ContainInOrder(playerViewModel1, playerViewModel2);
            }
        }
    }
}
