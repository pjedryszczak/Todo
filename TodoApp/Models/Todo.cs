namespace TodoApp.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    public class Todo
    {
        [BsonId]
        public ObjectId InternalId { get; set; }
        public long Id { get; set; }
        public long TodoListId { get; set; }
        public string Content { get; set; }
        public bool Checked { get; set; }
    }
}