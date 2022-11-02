using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Repositories.Tag;

namespace WebAPI.Endpoints.Tag
{
    public class GetTagByObjectClassIdRequest
    {
        public int ObjectClassId { get; set; }
    }

    public class GetTagByObjectClassIdEndpoint:Endpoint<GetTagByObjectClassIdRequest,List<GetTagByIdDto>>
    {
        public override void Configure()
        {
            AllowAnonymous();
            Get("tags/{ObjectClassId}");

            Summary(s =>
            {
                s.Summary = "Get tags by object class id";
            });
        }

        private readonly ITagRepository _tagRepository;

        public GetTagByObjectClassIdEndpoint(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public override async Task HandleAsync(GetTagByObjectClassIdRequest req, CancellationToken ct)
        {
            var query = _tagRepository.Query().Select(e => new GetTagByIdDto
            {
                Id = e.Id,
                Name = e.Name,
                ObjectClassId = e.ObjectClassId
            }).Where(e => e.ObjectClassId == req.ObjectClassId);

            await SendAsync(await query.ToListAsync());
        }
    }

    public class GetTagByIdDto
    {
        public int Id { get; set; }
        public int ObjectClassId { get; set; }
        public string Name { get; set; }
    }
}
