using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Contexts;

namespace WebAPI.Extensions
{
    public static class DatabaseContextRegistration
    {
        public static IServiceCollection AddDbContextServices(this IServiceCollection services, IConfiguration configuration)
        {
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));
            // Context
            services.AddDbContext<ObjectAnnotationToolDbContext>(e=>e.UseMySql(configuration.GetConnectionString("ObjectAnnotationToolMySqlServer"), serverVersion));

            return services;
        }
    }
}