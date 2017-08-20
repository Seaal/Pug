using FluentAssertions;
using MongoDB.Bson;
using NSubstitute;
using Pug.Data.Models.Pugs;
using Seaal.Data.MongoDB;
using System.Threading.Tasks;
using Xunit;

namespace Pug.Data.Tests
{
    public class PickUpGameRepositoryTests
    {
        private readonly PickUpGameRepository _pupRepository;

        private readonly IDocumentCollection<PickUpGame, ObjectId> _pugCollection;

        private readonly PickUpGame _pug;

        public PickUpGameRepositoryTests()
        {
            IMongoConnection connection = Substitute.For<IMongoConnection>();

            _pugCollection = connection.GetCollection<PickUpGame, ObjectId>("pugs");

            _pupRepository = new PickUpGameRepository(connection);

            _pug = new PickUpGame();
        }

        public class GetAsync : PickUpGameRepositoryTests
        {
            private readonly ObjectId _id;

            public GetAsync()
            {
                _id = ObjectId.GenerateNewId();

                _pugCollection.GetDocumentByIdAsync(_id).Returns((ci) => _pug);
            }

            [Fact]
            public async Task Should_Return_Pug_From_DocumentCollection()
            {
                //Act
                PickUpGame pug = await _pupRepository.GetAsync(_id.ToString());

                //Assert
                pug.Should().Be(_pug);
            }
        }
    }
}
