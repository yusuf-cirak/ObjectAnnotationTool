using WebAPI.Data.Contexts;

namespace WebAPI.Data.Repositories.ObjectClass;

public sealed class ObjectClassRepository:EfRepositoryBase<Models.ObjectClass,ObjectAnnotationToolDbContext>,IObjectClassRepository
{
    public ObjectClassRepository(ObjectAnnotationToolDbContext context) : base(context)
    {
    }
}