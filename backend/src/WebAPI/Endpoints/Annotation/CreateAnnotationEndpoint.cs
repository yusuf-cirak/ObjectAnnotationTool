using System.Text;
using FastEndpoints;
using WebAPI.Data.Repositories.Annotation;
using WebAPI.Data.Services.File;
using WebAPI.Mapping.Annotation;

namespace WebAPI.Endpoints.Annotation;


public sealed class CreateAnnotationsRequestDto
{
    public int ObjectClassId { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}

public sealed class CreateAnnotationRequest
{
    public IList<CreateAnnotationsRequestDto> Annotations { get; set; }
}


public sealed class CreateAnnotationEndpoint:Endpoint<CreateAnnotationRequest,CreateAnnotationResponse,CreateAnnotationMapper>
{
    public override void Configure()
    {
        AllowAnonymous();
        Post("annotations");
        Summary(s=>{
            s.Summary="Create annotations with parameters and save them to file";
        });
        
    }

    private readonly IAnnotationRepository _repository;
    private readonly IFileService _fileService;

    public CreateAnnotationEndpoint(IAnnotationRepository repository, IFileService fileService)
    {
        _repository = repository;
        _fileService = fileService;
    }


    public override async Task HandleAsync(CreateAnnotationRequest req, CancellationToken ct)
    {
        try
        {
            List<Models.Annotation> annotations = new(Map.ToListEntity(req));
        
            annotations = (List<Models.Annotation>)await _repository.AddRangeAsync(annotations);

            string annotationsToWrite = GetAnnotationsAsString(annotations);

            await _fileService.WriteToFileAsync($"logs","annotations","txt",annotationsToWrite);
        
            await SendAsync(Map.ToResponseEntity(annotations), cancellation: ct);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        

    }
    
    
    private string GetAnnotationsAsString(IList<Models.Annotation> annotations)
    {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < annotations.Count; i++)
        {
            sb.AppendLine($"AnnotationId:{annotations[i].Id} - ObjectClassId:{annotations[i].ObjectClassId} - X: {annotations[i].X} - Y: {annotations[i].Y} - Width: {annotations[i].Width} - Height: {annotations[i].Height}");
        }

        return  sb.ToString();
    }
}


public sealed class CreateAnnotationResponse
{
    public List<CreateAnnotationsRequestDto> Annotations { get; set; }

    public CreateAnnotationResponse()
    {
        Annotations = new List<CreateAnnotationsRequestDto>();
    }

}