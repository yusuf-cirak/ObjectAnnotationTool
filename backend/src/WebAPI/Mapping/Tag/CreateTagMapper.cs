using FastEndpoints;
using WebAPI.Endpoints.Tag;

namespace WebAPI.Mapping.Tag;

public  sealed class CreateTagMapper:Mapper<CreateTagRequest,CreateTagResponse,Models.Tag>
{
    public override Models.Tag ToEntity(CreateTagRequest r)
        => new() { Name = r.Name, ObjectClassId = r.ObjectClassId };

    public CreateTagResponse ToResponseEntity(Models.Tag tag) =>
        new() { Id = tag.Id, Name = tag.Name, ObjectClassId = tag.ObjectClassId };
}