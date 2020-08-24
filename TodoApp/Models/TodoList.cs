using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class TodoList
    {
        [BsonId]
        public ObjectId InternalId { get; set; }
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Title { get; set; }
    }
}
