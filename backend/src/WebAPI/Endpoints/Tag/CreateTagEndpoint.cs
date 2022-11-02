using FastEndpoints;
using WebAPI.Data.Repositories.Tag;
using WebAPI.Mapping.Tag;

namespace WebAPI.Endpoints.Tag;

public sealed class CreateTagRequest
{
    public int ObjectClassId { get; set; }
    public string Name { get; set; }
}

public sealed class CreateTagEndpoint:Endpoint<CreateTagRequest,CreateTagResponse,CreateTagMapper>
{
    public override void Configure()
    {
        AllowAnonymous();

        Post("tags");
        Summary(s=>{
            s.Summary="Create tag with given ObjectClassId and given Name";
        });
    }

    private readonly ITagRepository _repository;

    public CreateTagEndpoint(ITagRepository repository)
    {
        _repository = repository;
    }

    public override async Task<CreateTagResponse> ExecuteAsync(CreateTagRequest req, CancellationToken ct)
    {
        Models.Tag tag = Map.ToEntity(req);

        tag = await _repository.AddAsync(tag);

        return Map.ToResponseEntity(tag);

    }
    
    
}

public sealed class CreateTagResponse
{
    public int Id { get; set; }
    public int ObjectClassId { get; set; }
    public string Name { get; set; }
}