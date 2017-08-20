using FluentAssertions;
using NSubstitute;
using Pug.Api.ModelMappers.Pugs;
using Pug.Api.ViewModels.Pugs;
using Pug.Data;
using Pug.Data.Models.Pugs;
using System.Threading.Tasks;
using Xunit;

namespace Pug.Api.Logic.Tests
{
    public class PugApiServiceTests
    {
        private readonly PugApiService _pugApiService;

        private readonly IPickUpGameRepository _pugRepository;
        private readonly IPickUpGameModelMapper _pugModelMapper;

        public PugApiServiceTests()
        {
            _pugRepository = Substitute.For<IPickUpGameRepository>();
            _pugModelMapper = Substitute.For<IPickUpGameModelMapper>();

            _pugApiService = new PugApiService(_pugRepository, _pugModelMapper);
        }

        public class GetPugAsyncTests : PugApiServiceTests
        {
            private const string pugId = "pugid";

            private PickUpGame _pug;

            private PickUpGameViewModel _pugViewModel;

            public GetPugAsyncTests()
            {
                _pugRepository.GetAsync(pugId).Returns((ci) => _pug);

                _pugModelMapper.ToViewModel(Arg.Is<PickUpGame>((pug) => pug == _pug)).Returns((ci) => _pugViewModel);

                _pug = new PickUpGame();

                _pugViewModel = new PickUpGameViewModel();
            }

            [Fact]
            public async Task Should_Return_ViewModel_From_ModelMapper()
            {
                //Act
                PickUpGameViewModel pugViewModel = await _pugApiService.GetPugAsync(pugId);

                //Assert
                pugViewModel.Should().BeSameAs(_pugViewModel);
            }
        }
    }
}
