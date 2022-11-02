using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data.Repositories;
using WebAPI.Data.Repositories.Annotation;
using WebAPI.Data.Repositories.ObjectClass;
using WebAPI.Data.Repositories.Tag;
using WebAPI.Data.Services.File;

namespace WebAPI.Extensions
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
        {

            services.AddScoped<IAnnotationRepository, AnnotationRepository>();

            services.AddScoped<IObjectClassRepository, ObjectClassRepository>();

            services.AddScoped<ITagRepository, TagRepository>();
            
            
            
            services.AddScoped<IFileService, FileService>();

            return services;
        }
    }
}