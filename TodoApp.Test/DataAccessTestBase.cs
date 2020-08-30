using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using TodoApp.Models;

namespace TodoApp.Test
{
    public class DataAccessTestBase
    {
        protected readonly IDbContext _dbContext;
        private readonly ServerConfig _config;
        public DataAccessTestBase()
        {
            var configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.AddJsonFile(Path.Combine(TestContext.CurrentContext.TestDirectory, "testsettings.json"));
            var build = configurationBuilder.Build();

            var config = new ServerConfig();
            build.Bind(config);
            _dbContext = new DbContext(config.MongoDB);
        }

        [TearDown]
        public void DeleteTestDatabase()
        {
            _dbContext.Client.DropDatabase(_config.MongoDB.Database);
        }
        
    }
}
