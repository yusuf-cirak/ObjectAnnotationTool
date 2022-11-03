using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Repositories.Tag;

namespace WebAPI.Endpoints.Tag;

public sealed class GetAllTagsEndpoint:EndpointWithoutRequest<List<GetTagResponseDto>>
{
    public override void Configure()
    {
        AllowAnonymous();
        
        Get("tags");
        
        Summary(e=>e.Summary="Get all tags");
    }

    private readonly ITagRepository _tagRepository;

    public GetAllTagsEndpoint(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var tags = await _tagRepository.Query().AsNoTracking().Select(e => new GetTagResponseDto
        {
            Id = e.Id,
            Name = e.Name,
            ObjectClassId = e.ObjectClassId
        }).ToListAsync();

        await SendAsync(tags);
    }
}

public sealed class GetTagResponseDto
{
    public int Id { get; set; }
    public int ObjectClassId { get; set; }
    public string Name { get; set; }
}