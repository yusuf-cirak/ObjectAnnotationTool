using Newtonsoft.Json;
using WebAPI.Models.Common;

namespace WebAPI.Models;

public class ObjectClass:Entity
{
    public string Name { get; set; }

    public virtual ICollection<Tag> Tags { get; set; }

    public ObjectClass()
    {
        //Tags = new HashSet<Tag>();
    }

    public ObjectClass(int id, string name) : this()
    {
        Id = id;
        Name = name;
    }
}