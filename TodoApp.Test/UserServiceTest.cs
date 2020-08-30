using Moq;
using NUnit.Framework;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TodoApp.DataAccess.Interfaces;
using TodoApp.Models;
using TodoApp.Services;

namespace TodoApp.Test
{
    public class UserServiceTest : DataAccessTestBase
    {
        private IUserService _userService;
        private IUserRepository _userRepository;

        [SetUp]
        public void Setup()
        {
            _userRepository = new UserRepository(_dbContext);
            _userService = new UserService(_userRepository);
        }

        [Test]
        public void AuthenticateTest()
        {
            var user = _userService.Create(new User
            {
                Username = "userTest",
                FirstName = "User Test"
            }, "testPassword").Result;

            var createdUser = _userService.GetById(user.Id).Result;
            Assert.IsNotNull(createdUser);

            var authenticatedUser = _userService.Authenticate("userTest", "testPassword").Result;
            Assert.IsNotNull(authenticatedUser);

            var deleted = _userRepository.Delete(authenticatedUser.Id).Result;
            Assert.IsTrue(deleted);
        }

    }
}