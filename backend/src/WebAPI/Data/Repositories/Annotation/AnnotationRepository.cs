using WebAPI.Data.Contexts;

namespace WebAPI.Data.Repositories.Annotation;

public sealed class AnnotationRepository:EfRepositoryBase<Models.Annotation,ObjectAnnotationToolDbContext>,IAnnotationRepository
{
    public AnnotationRepository(ObjectAnnotationToolDbContext context) : base(context)
    {
    }
}