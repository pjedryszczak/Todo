using NUnit.Framework;
using TodoApp.Models;

namespace TodoApp.Test
{
    public class TodoRepositoryTest : DataAccessTestBase
    {
        private ITodoRepository _todoRepository;
        [SetUp]
        public void Setup()
        {
            _todoRepository = new TodoRepository(_dbContext);
        }

        [Test]
        public void TodoDbTest()
        {
            var id = _todoRepository.GetNextId().Result;
            _todoRepository.Create(new Todo
            {
                Id = id,
                TodoListId = 99999,
                Content = "test",
                Checked = false
            });
            var todo = _todoRepository.GetTodo(id).Result;
            Assert.IsNotNull(todo);

            todo.Checked = true;
            var updated = _todoRepository.Update(todo).Result;
            Assert.IsTrue(updated);

            var updatedTodo = _todoRepository.GetTodo(todo.Id).Result;
            Assert.IsTrue(updatedTodo.Checked);

            var deleted = _todoRepository.Delete(todo.Id).Result;
            Assert.IsTrue(deleted);

            var deletedTodo = _todoRepository.GetTodo(todo.Id).Result;
            Assert.IsNull(deletedTodo);
        }
    }
}