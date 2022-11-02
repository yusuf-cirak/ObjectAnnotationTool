using WebAPI.Data.Contexts;

namespace WebAPI.Data.Repositories.Tag;

public sealed class TagRepository:EfRepositoryBase<Models.Tag,ObjectAnnotationToolDbContext>,ITagRepository
{
    public TagRepository(ObjectAnnotationToolDbContext context) : base(context)
    {
    }
}