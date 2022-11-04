using FastEndpoints;
using WebAPI.Endpoints.Annotation;
using WebAPI.Endpoints.Tag;

namespace WebAPI.Mapping.Annotation;

public sealed class CreateAnnotationMapper:Mapper<CreateAnnotationRequest,bool,Models.Annotation>
{
    public IList<Models.Annotation> ToListEntity(CreateAnnotationRequest req)
    {
        List<Models.Annotation> listEntity = new();
        foreach (var annotationDto in req.Annotations)
        {
            var annotation = new Models.Annotation
            {
                ObjectClassId = annotationDto.ObjectClassId,
                X = annotationDto.X, 
                Y = annotationDto.Y,
                Height = annotationDto.Height,
                Width = annotationDto.Width,
                
            };
            listEntity.Add(annotation);
        }

        return listEntity;
    }
}