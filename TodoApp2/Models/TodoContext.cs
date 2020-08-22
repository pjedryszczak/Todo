using System;
using System.Collections.Generic;

namespace TodoApp.Models
{
    using MongoDB.Driver;
    using TodoApp;
    public class TodoContext: ITodoContext
    {
        private readonly IMongoDatabase _db;
        public TodoContext(MongoDBConfig config)
        {
            string username = config.User;
            string password = config.Password;
            string mongoDbAuthMechanism = "SCRAM-SHA-1";
            MongoInternalIdentity internalIdentity =
                new MongoInternalIdentity("admin", username);
            PasswordEvidence passwordEvidence = new PasswordEvidence(password);
            MongoCredential mongoCredential =
                new MongoCredential(mongoDbAuthMechanism,
                    internalIdentity, passwordEvidence);
            List<MongoCredential> credentials =
                new List<MongoCredential>() { mongoCredential };


            MongoClientSettings settings = new MongoClientSettings();
            // comment this line below if your mongo doesn't run on secured mode
            settings.Credentials = credentials;
            String mongoHost = config.Host;//localhost:27017";
            MongoServerAddress address = new MongoServerAddress(mongoHost);
            settings.Server = address;
            var client = new MongoClient(settings);
            _db = client.GetDatabase(config.Database);
        }
        public IMongoCollection<Todo> Todos => _db.GetCollection<Todo>("Todos");
    }
}