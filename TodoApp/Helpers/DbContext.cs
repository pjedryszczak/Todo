using System;
using System.Collections.Generic;

namespace TodoApp.Models
{
    using MongoDB.Driver;
    using TodoApp;
    public interface IDbContext
    {
        IMongoCollection<TodoList> TodoLists { get; }
        IMongoCollection<Todo> Todos { get; }
        IMongoCollection<User> Users { get; }
    }
    public class DbContext: IDbContext
    {
        private readonly IMongoDatabase _db;
        public DbContext(MongoDBConfig config)
        {
            var client = new MongoClient(config.ConnectionString);
            _db = client.GetDatabase(config.Database);
        }
        public IMongoCollection<TodoList> TodoLists => _db.GetCollection<TodoList>("TodoLists");
        public IMongoCollection<Todo> Todos => _db.GetCollection<Todo>("Todos");
        public IMongoCollection<User> Users => _db.GetCollection<User>("Users");
    }
}