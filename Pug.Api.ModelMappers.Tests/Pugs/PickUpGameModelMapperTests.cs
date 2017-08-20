using FluentAssertions;
using MongoDB.Bson;
using NSubstitute;
using Pug.Api.ModelMappers.Pugs;
using Pug.Api.ModelMappers.Pugs.Phases;
using Pug.Api.ViewModels.Pugs;
using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs;
using Pug.Data.Models.Pugs.Phases;
using System;
using Xunit;

namespace Pug.Api.ModelMappers.Tests.Pugs
{
    public class PickUpGameModelMapperTests
    {
        private readonly PickUpGameModelMapper _pugModelMapper;

        private readonly ITeamModelMapper _teamModelMapper;
        private readonly IPugPhaseModelMapper _pugPhaseModelMapper;
        private readonly PickUpGame _pug;

        public PickUpGameModelMapperTests()
        {
            _teamModelMapper = Substitute.For<ITeamModelMapper>();
            _pugPhaseModelMapper = Substitute.For<IPugPhaseModelMapper>();

            _pugModelMapper = new PickUpGameModelMapper(_teamModelMapper, _pugPhaseModelMapper);

            _pug = new PickUpGame()
            {
                Teams = new Team[0]
            };
        }

        public class ToViewModel : PickUpGameModelMapperTests
        {
            [Fact]
            public void Should_Set_Id_From_Pug()
            {
                //Arrange
                _pug.Id = new ObjectId();

                //Act
                PickUpGameViewModel pugViewModel = _pugModelMapper.ToViewModel(_pug);

                //Assert
                pugViewModel.Id.Should().Be(_pug.Id.ToString());
            }

            [Fact]
            public void Should_Set_Path_From_Pug()
            {
                //Arrange
                _pug.Path = new[] { "Path1", "Path2" };

                //Act
                PickUpGameViewModel pugViewModel = _pugModelMapper.ToViewModel(_pug);

                //Assert
                pugViewModel.Path.Should().ContainInOrder("Path1", "Path2");
            }

            [Fact]
            public void Should_Set_Teams_From_TeamModelMapper()
            {
                //Arrange
                Team team1 = new Team();
                Team team2 = new Team();
                TeamViewModel teamViewModel1 = new TeamViewModel();
                TeamViewModel teamViewModel2 = new TeamViewModel();

                _teamModelMapper.ToViewModel(team1).Returns(teamViewModel1);
                _teamModelMapper.ToViewModel(team2).Returns(teamViewModel2);

                _pug.Teams = new[] { team1, team2 };

                //Act
                PickUpGameViewModel pugViewModel = _pugModelMapper.ToViewModel(_pug);

                //Assert
                pugViewModel.Teams.Should().ContainInOrder(teamViewModel1, teamViewModel2);
            }

            [Fact]
            public void Should_Set_CurrentPhase_From_PugPhaseModelMapper()
            {
                //Arrange
                _pug.CurrentPhase = new PickPlayerPugPhase();

                BasePugPhaseViewModel currentPhaseViewModel = new PickPlayerPugPhaseViewModel();

                _pugPhaseModelMapper.ToViewModel(_pug.CurrentPhase).Returns(currentPhaseViewModel);

                //Act
                PickUpGameViewModel pugViewModel = _pugModelMapper.ToViewModel(_pug);

                //Assert
                pugViewModel.CurrentPhase.Should().Be(currentPhaseViewModel);
            }
        }
    }
}
