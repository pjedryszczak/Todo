using Microsoft.OpenApi.Any;
using Microsoft.VisualStudio.TestPlatform.ObjectModel.Client;
using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using NUnit.Framework;
using System.Threading.Tasks;
using TodoApp.Models;

namespace TodoApp.Test
{
    public class TodoListRepositoryTest : DataAccessTestBase
    {
        private ITodoListRepository _todoListRepository;
        //private Mock<ITodoListRepository> _mockedTodoListRepository;
        //private Mock<IMongoCollection<TodoList>> _mockedTodoList;
        //private Mock<IDbContext> _mockedDbContext;
        [SetUp]
        public void Setup()
        {
            //_mockedDbContext = new Mock<IDbContext>();
            //_mockedTodoList = new Mock<IMongoCollection<TodoList>>();
            //_mockedDbContext.SetupGet(db => db.TodoLists).Returns(_mockedTodoList.Object);
            //_mockedTodoListRepository = new Mock<ITodoListRepository>();

            _todoListRepository = new TodoListRepository(_dbContext);            
        }

        //[Test]
        //public async Task GetNextIdTest()
        //{
        //    await _todoListRepository.GetNextId();
        //    _mockedTodoList.Verify(m => m.CountDocumentsAsync(It.IsAny<BsonDocumentFilterDefinition<TodoList>>(), It.IsAny<CountOptions>(), It.IsAny<System.Threading.CancellationToken>()), Times.Once());
        //}
        //[Test]
        //public async Task CreateTest()
        //{
        //    await _todoListRepository.Create(new TodoList());
        //    _mockedTodoList.Verify(m => m.InsertOneAsync(It.IsAny<TodoList>(), It.IsAny<InsertOneOptions>(), It.IsAny<System.Threading.CancellationToken>() ), Times.Once());
        //}
        [Test]
        public void TodoListDbTest()
        {
            var id = _todoListRepository.GetNextId().Result;
            _todoListRepository.Create(new TodoList
            {
                Id = id,
                UserId = 99999,
                Title = "test",
            });
            var todoList = _todoListRepository.GetTodoList(id).Result;
            Assert.IsNotNull(todoList);
                    
            var deleted = _todoListRepository.Delete(todoList.Id).Result;
            Assert.IsTrue(deleted);

            var deletedTodoList = _todoListRepository.GetTodoList(todoList.Id).Result;
            Assert.IsNull(deletedTodoList);
        }
    }
}