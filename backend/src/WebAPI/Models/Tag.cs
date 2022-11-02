using Newtonsoft.Json;
using WebAPI.Models.Common;

namespace WebAPI.Models;

public class Tag:Entity
{
    public int ObjectClassId { get; set; }
    public string Name { get; set; }

    public virtual ObjectClass ObjectClass { get; set; }


    public Tag()
    {
        //ObjectClass = new ObjectClass();
    }

    public Tag(int id,int objectClassId, string name):this()
    {
        Id = id;
        ObjectClassId = objectClassId;
        Name = name;
    }
}