namespace TodoApp.Models
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ITodoListRepository
    {
        // api/[GET]
        Task<IEnumerable<TodoList>> GetAllTodoLists();
        // api/1/[GET]
        Task<TodoList> GetTodoList(long id);
        // api/[POST]
        Task Create(TodoList todo);
        // api/[PUT]
        Task<bool> Update(TodoList todo);
        // api/1/[DELETE]
        Task<bool> Delete(long id);
        Task<long> GetNextId();
    }
}