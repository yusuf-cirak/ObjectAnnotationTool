using System.Collections.Generic;
using System.Net;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Contexts
{
    public sealed class ObjectAnnotationToolDbContext : DbContext
    {
        public DbSet<Annotation> Annotations { get; set; }
        
        public DbSet<ObjectClass> ObjectClasses { get; set; }

        
        public DbSet<Tag> Tags { get; set; }

        public ObjectAnnotationToolDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ObjectClass[] objectClassesSeedData = { new(1,"Sebze"),new (2,"Meyve")};
            
            Tag[] tagsSeedData ={new(1,1,"Nohut"),new(2,1,"Fasulye"),new(3,2,"Elma"),new(4,2,"Armut")};

            modelBuilder.Entity<ObjectClass>().HasData(objectClassesSeedData);
            modelBuilder.Entity<Tag>().HasData(tagsSeedData);
        }

    }
}
