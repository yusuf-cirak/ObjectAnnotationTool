using Newtonsoft.Json;
using WebAPI.Models.Common;

namespace WebAPI.Models;

public class Annotation : Entity // Tag
{
    public int ObjectClassId { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public virtual ObjectClass ObjectClass { get; set; }

    public Annotation()
    {
        //ObjectClasses = new HashSet<ObjectClass>();
    }

    public Annotation(int id, int objectClassId, int x, int y, int width, int height) :this()
    {
        Id = id;
        ObjectClassId = objectClassId;
        X = x;
        Y = y;
        Width = width;
        Height = height;
    }
}