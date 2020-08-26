namespace TodoApp.Models
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ITodoListRepository
    {
        Task<IEnumerable<TodoList>> GetAllTodoLists();        
        Task<TodoList> GetTodoList(long id);        
        Task Create(TodoList todo);        
        Task<bool> Update(TodoList todo);        
        Task<bool> Delete(long id);
        Task<long> GetNextId();
    }
}