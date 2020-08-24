namespace TodoApp.Models
{
    using MongoDB.Driver;
    public interface IDbContext
    {
        IMongoCollection<TodoList> TodoLists { get; }
        IMongoCollection<Todo> Todos { get; }
        IMongoCollection<User> Users { get; }
    }
}