namespace WebAPI.Data.Services.File;

public interface IFileService
{
    Task<bool> WriteToFileAsync(string path,string fileName,string fileType,string annotations);
}