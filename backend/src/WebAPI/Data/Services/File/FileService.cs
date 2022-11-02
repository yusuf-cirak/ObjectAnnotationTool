using System.Text;
using WebAPI.Models;

namespace WebAPI.Data.Services.File;

public sealed class FileService : IFileService
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public FileService(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task<bool> WriteToFileAsync(string path,string fileName,string fileType, string annotations)
    {
        string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath,path);

        if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);

        //if (!System.IO.File.Exists($"{uploadPath}\\{fileName}"))
        //    System.IO.File.CreateText($"{uploadPath}\\{fileName}.{fileType}");


        try
        {
            path = $"{uploadPath}\\{fileName}.{fileType}";
            await using FileStream fileStream = new(path, FileMode.OpenOrCreate, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);

            StreamWriter sw = new(fileStream);

            await sw.WriteAsync(annotations);

            sw.Close();

            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

}