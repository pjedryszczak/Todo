using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Models;

namespace TodoApp.DataAccess.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUser(long id);
        Task<User> GetUserByUsername(string username);
        Task Create(User user);
        Task<bool> Update(User user);
        Task<bool> Delete(long id);
        Task<long> GetNextId();
    }
}
