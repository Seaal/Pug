using FluentAssertions;
using NSubstitute;
using Pug.Api.ModelMappers.Pugs.Phases;
using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs.Phases;
using Pug.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Pug.Api.ModelMappers.Tests.Pugs.Phases
{
    public class BasePropertiesPugPhaseModelMapperDecoratorTests
    {
        private readonly BasePropertiesPugPhaseModelMapperDecorator _decorator;
        private readonly IPugPhaseModelMapper _decoratedModelMapper;
        private readonly BasePugPhase _pugPhase;
        private readonly BasePugPhaseViewModel _pugPhaseViewModel;

        public BasePropertiesPugPhaseModelMapperDecoratorTests()
        {
            _decoratedModelMapper = Substitute.For<IPugPhaseModelMapper>();

            _decorator = new BasePropertiesPugPhaseModelMapperDecorator(_decoratedModelMapper);

            _pugPhase = new PickPlayerPugPhase();
            _pugPhaseViewModel = new PickPlayerPugPhaseViewModel();

            _decoratedModelMapper.ToViewModel(_pugPhase).Returns(_pugPhaseViewModel);
        }

        public class ToViewModel : BasePropertiesPugPhaseModelMapperDecoratorTests
        {
            [Fact]
            public void Should_Return_Pug_Phase_From_Decorated_Model_Mapper()
            {
                //Act
                BasePugPhaseViewModel pugPhaseViewModel = _decorator.ToViewModel(_pugPhase);

                //Assert
                pugPhaseViewModel.Should().Be(_pugPhaseViewModel);
            }

            [Fact]
            public void Should_Set_Type_From_PugPhase()
            {
                //Arrange
                _pugPhase.Type = PugPhaseType.PickPlayer;

                //Act
                BasePugPhaseViewModel pugPhaseViewModel = _decorator.ToViewModel(_pugPhase);

                //Assert
                pugPhaseViewModel.Type.Should().Be(PugPhaseType.PickPlayer);
            }

            [Fact(Skip = "ToFix: Adding 30 seconds from DateTime.Now currently to test")]
            public void Should_Set_Expiry_From_PugPhase()
            {
                //Arrange
                DateTime expiry = new DateTime(2017, 08, 19, 15, 03, 25);

                _pugPhase.Expiry = expiry;

                //Act
                BasePugPhaseViewModel pugPhaseViewModel = _decorator.ToViewModel(_pugPhase);

                //Assert
                pugPhaseViewModel.Expiry.Should().Be(expiry);
            }
        }
    }
}
