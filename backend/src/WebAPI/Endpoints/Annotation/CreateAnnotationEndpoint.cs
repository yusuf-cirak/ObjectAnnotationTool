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


public sealed class CreateAnnotationEndpoint:Endpoint<CreateAnnotationRequest,bool,CreateAnnotationMapper>
{
    public override void Configure()
    {
        AllowAnonymous();
        Post("annotations");
        Summary(s=>{
            s.Summary="Create annotations with parameters and save them to file";
        });
        
    }

    private readonly IFileService _fileService;

    public CreateAnnotationEndpoint(IFileService fileService)
    {
        _fileService = fileService;
    }


    public override async Task HandleAsync(CreateAnnotationRequest req, CancellationToken ct)
    {
        try
        {
            string annotationsToWrite = GetAnnotationsAsString(req.Annotations);

            await _fileService.WriteToFileAsync($"logs","annotations","txt",annotationsToWrite);
        
            await SendAsync(true, cancellation: ct);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        

    }
    
    
    private string GetAnnotationsAsString(IList<CreateAnnotationsRequestDto> annotations)
    {
        StringBuilder sb = new StringBuilder();

        foreach (var annotation in annotations)
        {
            sb.AppendLine(
                $"ObjectClassId:{annotation.ObjectClassId} - X: {annotation.X} - Y: {annotation.Y} - Width: {annotation.Width} - Height: {annotation.Height}");
        }

        return  sb.ToString();
    }
}