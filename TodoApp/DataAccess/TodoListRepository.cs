namespace TodoApp.Models
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using MongoDB.Bson;
    using System.Linq;
    public class TodoListRepository : ITodoListRepository
    {
        private readonly IDbContext _context;
        public TodoListRepository(IDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TodoList>> GetAllTodoListsForUser(long id)
        {
            FilterDefinition<TodoList> filter = Builders<TodoList>.Filter.Eq(m => m.UserId, id);
            return await _context
                            .TodoLists
                            .Find(filter)
                            .ToListAsync();
        }
        public Task<TodoList> GetTodoList(long id)
        {
            FilterDefinition<TodoList> filter = Builders<TodoList>.Filter.Eq(m => m.Id, id);
            return _context
                    .TodoLists
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
        public async Task Create(TodoList todoList)
        {
            await _context.TodoLists.InsertOneAsync(todoList);
        }
        public async Task<bool> Update(TodoList todoList)
        {
            ReplaceOneResult updateResult =
                await _context
                        .TodoLists
                        .ReplaceOneAsync(
                            filter: g => g.Id == todoList.Id,
                            replacement: todoList);
            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }
        public async Task<bool> Delete(long id)
        {
            FilterDefinition<TodoList> filterTodoList = Builders<TodoList>.Filter.Eq(m => m.Id, id);
            FilterDefinition<Todo> filterTodos = Builders<Todo>.Filter.Eq(m => m.TodoListId, id);
            DeleteResult deleteTodosResult = await _context
                                                .Todos
                                              .DeleteOneAsync(filterTodos);
            DeleteResult deleteListResult = await _context
                                                .TodoLists
                                              .DeleteOneAsync(filterTodoList);
            return deleteListResult.IsAcknowledged
                && deleteListResult.DeletedCount > 0 && deleteTodosResult.IsAcknowledged;
        }
        public async Task<long> GetNextId()
        {
            return await _context.TodoLists.CountDocumentsAsync(new BsonDocument()) + 1;
        }
    }
}