using FluentAssertions;
using Pug.Api.ModelMappers.Pugs.Phases;
using Pug.Api.ViewModels.Pugs.Phases;
using Pug.Data.Models.Pugs.Phases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Pug.Api.ModelMappers.Tests.Pugs.Phases
{
    public class PickPlayerPhaseModelMapperTests
    {
        private readonly PickPlayerPhaseModelMapper _pickPlayerPhaseModelMapper;

        private readonly PickPlayerPugPhase _pickPlayerPhase;

        public PickPlayerPhaseModelMapperTests()
        {
            _pickPlayerPhaseModelMapper = new PickPlayerPhaseModelMapper();

            _pickPlayerPhase = new PickPlayerPugPhase();
        }

        public class ToViewModel : PickPlayerPhaseModelMapperTests
        {
            [Fact]
            public void Should_Set_TeamIndex_From_PickPlayerPhase()
            {
                //Arrange
                _pickPlayerPhase.TeamIndex = 1;

                //Act
                BasePugPhaseViewModel _pugPhaseViewModel = _pickPlayerPhaseModelMapper.ToViewModel(_pickPlayerPhase);

                //Assert
                _pugPhaseViewModel.As<PickPlayerPugPhaseViewModel>()
                    .TeamIndex.Should().Be(1);
            }
        }
    }
}
