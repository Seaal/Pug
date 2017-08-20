using FluentAssertions;
using Pug.Api.ModelMappers.Pugs;
using Pug.Api.ViewModels.Pugs;
using Pug.Data.Models.Pugs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Pug.Api.ModelMappers.Tests.Pugs
{
    public class PlayerModelMapperTests
    {
        private readonly PlayerModelMapper _playerModelMapper;

        private readonly Player _player;

        public PlayerModelMapperTests()
        {
            _playerModelMapper = new PlayerModelMapper();

            _player = new Player();
        }

        public class ToViewModel : PlayerModelMapperTests
        {
            [Fact]
            public void Should_Set_Id_From_Player()
            {
                //Arrange
                _player.Id = "Test123";

                //Act
                PlayerViewModel playerViewModel = _playerModelMapper.ToViewModel(_player);

                //Assert
                playerViewModel.Id.Should().Be("Test123");
            }

            [Fact]
            public void Should_Set_Name_From_Player()
            {
                //Arrange
                _player.Name = "Name123";

                //Act
                PlayerViewModel playerViewModel = _playerModelMapper.ToViewModel(_player);

                //Assert
                playerViewModel.Name.Should().Be("Name123");
            }
        }
    }
}
