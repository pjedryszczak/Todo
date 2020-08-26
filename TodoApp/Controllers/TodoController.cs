namespace TodoApp.Controllers
{
    using TodoApp.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    [Authorize]
    [Produces("application/json")]
    [Route("api/[Controller]/[Action]")]
    public class TodosController : Controller
    {
        private readonly ITodoRepository _todoRepository;
        private readonly ITodoListRepository _todoListRepository;
        public TodosController(ITodoRepository todoRepository, ITodoListRepository todoListRepository)
        {
            _todoListRepository = todoListRepository;
            _todoRepository = todoRepository;
        }
        // GET api/todos/GetTodoLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoList>>> GetTodoLists()
        {
            var result = await _todoListRepository.GetAllTodoLists();
            return new ObjectResult(result);
        }


        // POST api/todos/SaveTodoList
        [HttpPost]
        public async Task<ActionResult<TodoList>> SaveTodoList([FromBody] TodoList todoList)
        {
            todoList.Id = await _todoListRepository.GetNextId();
            await _todoListRepository.Create(todoList);
            return new OkObjectResult(todoList);
        }

        // DELETE api/todos/DeleteTodoList
        [HttpDelete]
        public async Task<IActionResult> DeleteTodoList(long id)
        {
            var post = await _todoListRepository.GetTodoList(id);
            if (post == null)
                return new NotFoundResult();

            var todosToDelete = await _todoRepository.GetAllTodosForTodoListId(id);
            foreach (var todo in todosToDelete)
            {
                await _todoRepository.Delete(todo.Id);
            }

            await _todoListRepository.Delete(id);            

            return new OkResult();
        }

        // GET api/todos/GetTodos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos(long todoListId)
        {
            return new ObjectResult(await _todoRepository.GetAllTodosForTodoListId(todoListId));
        }


        // POST api/todos/SaveTodo
        [HttpPost]
        public async Task<ActionResult<TodoList>> SaveTodo([FromBody] Todo todo)
        {
            todo.Id = await _todoRepository.GetNextId();
            await _todoRepository.Create(todo);
            return new OkObjectResult(todo);
        }

        // DELETE api/todos/DeleteTodo
        [HttpDelete]
        public async Task<IActionResult> DeleteTodo(long id)
        {
            var post = await _todoRepository.GetTodo(id);
            if (post == null)
                return new NotFoundResult();
            await _todoRepository.Delete(id);
            return new OkResult();
        }
        [HttpPut]
        public async Task<ActionResult<Todo>> UpdateTodo([FromBody] Todo todo)
        {
            var todoFromDb = await _todoRepository.GetTodo(todo.Id);
            if (todoFromDb == null)
                return new NotFoundResult();

            todo.InternalId = todoFromDb.InternalId;
            await _todoRepository.Update(todo);
            return new OkObjectResult(todo);
        }
    }
}