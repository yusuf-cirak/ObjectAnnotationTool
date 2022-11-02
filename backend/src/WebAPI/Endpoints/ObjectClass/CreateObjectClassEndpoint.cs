using FastEndpoints;
using WebAPI.Data.Repositories.ObjectClass;

namespace WebAPI.Endpoints.ObjectClass;

public sealed class CreateObjectClassRequest
{
    public string Name { get; set; }
}

public sealed class CreateObjectClassEndpoint:Endpoint<CreateObjectClassRequest>
{
    public override void Configure()
    {
        AllowAnonymous();

        Post("objectClasses");
        Summary(s=>{
            s.Summary="Create tag with given Name";
        });
    }

    private readonly IObjectClassRepository _repository;

    public CreateObjectClassEndpoint(IObjectClassRepository repository)
    {
        _repository = repository;
    }

    public override async Task HandleAsync(CreateObjectClassRequest req, CancellationToken ct)
    {
        Models.ObjectClass objectClass = new Models.ObjectClass { Name = req.Name };

        objectClass = await _repository.AddAsync(objectClass);

        await SendAsync(objectClass, cancellation: ct);
    }
}