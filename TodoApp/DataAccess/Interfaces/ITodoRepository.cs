namespace TodoApp.Models
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodosForTodoListId(long id);
        Task<Todo> GetTodo(long id);
        Task Create(Todo todo);
        Task<bool> Update(Todo todo);
        Task<bool> Delete(long id);
        Task<long> GetNextId();
    }
}