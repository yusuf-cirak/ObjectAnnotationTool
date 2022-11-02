using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Repositories.ObjectClass;
using WebAPI.Data.Repositories.Tag;

namespace WebAPI.Endpoints.ObjectClass
{

    public sealed class GetAllObjectClassesEndpoint : EndpointWithoutRequest<IList<GetAllObjectClassDto>>
    {
        public override void Configure()
        {
            AllowAnonymous();

            Get("objectClasses");

            Summary(s =>
            {
                s.Summary = "Get all object classes";
            });


        }

        private readonly IObjectClassRepository _objectClassRepository;

        public GetAllObjectClassesEndpoint(IObjectClassRepository objectClassRepository)
        {
            _objectClassRepository = objectClassRepository;
        }

        public override async Task HandleAsync(CancellationToken ct)
        {

            var objectClasses =await _objectClassRepository.Query().Include(e=>e.Tags).Select(e => new GetAllObjectClassDto
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync();


            await SendAsync(objectClasses);
        }


    }


    public class GetAllObjectClassDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }


}
