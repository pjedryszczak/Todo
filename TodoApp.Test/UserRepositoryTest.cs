using NUnit.Framework;
using TodoApp.DataAccess.Interfaces;
using TodoApp.Models;

namespace TodoApp.Test
{
    public class UserRepositoryTest : DataAccessTestBase
    {
        private IUserRepository _userRepository;
        [SetUp]
        public void Setup()
        {
            _userRepository = new UserRepository(_dbContext);
        }

        [Test]
        public void UserDbTest()
        {
            var id = _userRepository.GetNextId().Result;
            _userRepository.Create(new User
            {
                Id = id,
                FirstName = "Test Name",
                Username = "testName",
                PasswordHash = new byte[] { 123 },
                PasswordSalt = new byte[] { 124 }
            });
            var user = _userRepository.GetUser(id).Result;
            Assert.IsNotNull(user);

            var deleted = _userRepository.Delete(user.Id).Result;
            Assert.IsTrue(deleted);

            var deletedUser = _userRepository.GetUser(user.Id).Result;
            Assert.IsNull(deletedUser);
        }
    }
}