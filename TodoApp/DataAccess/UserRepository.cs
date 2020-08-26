namespace TodoApp.Models
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using MongoDB.Bson;
    using System.Linq;
    using TodoApp.DataAccess.Interfaces;

    public class UserRepository : IUserRepository
    {
        private readonly IDbContext _context;
        public UserRepository(IDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context
                            .Users
                            .Find(_ => true)
                            .ToListAsync();
        }
        public Task<User> GetUser(long id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq(m => m.Id, id);
            return _context
                    .Users
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
        public Task<User> GetUserByUsername(string username)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq(m => m.Username, username);
            return _context
                    .Users
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
        public async Task Create(User user)
        {
            await _context.Users.InsertOneAsync(user);
        }
        public async Task<bool> Update(User user)
        {
            ReplaceOneResult updateResult =
                await _context
                        .Users
                        .ReplaceOneAsync(
                            filter: g => g.Id == user.Id,
                            replacement: user);
            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }
        public async Task<bool> Delete(long id)
        {
            FilterDefinition<User> filterUser = Builders<User>.Filter.Eq(m => m.Id, id);
            
            DeleteResult result = await _context.Users
                                              .DeleteOneAsync(filterUser);
            return result.IsAcknowledged
                && result.DeletedCount > 0;
        }
        public async Task<long> GetNextId()
        {
            return await _context.Users.CountDocumentsAsync(new BsonDocument()) + 1;
        }
    }
}