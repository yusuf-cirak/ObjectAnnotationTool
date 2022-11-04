using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ObjectClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectClasses", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Annotations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ObjectClassId = table.Column<int>(type: "int", nullable: false),
                    X = table.Column<int>(type: "int", nullable: false),
                    Y = table.Column<int>(type: "int", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Annotations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Annotations_ObjectClasses_ObjectClassId",
                        column: x => x.ObjectClassId,
                        principalTable: "ObjectClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ObjectClassId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_ObjectClasses_ObjectClassId",
                        column: x => x.ObjectClassId,
                        principalTable: "ObjectClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "ObjectClasses",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Sebze" });

            migrationBuilder.InsertData(
                table: "ObjectClasses",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Meyve" });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name", "ObjectClassId" },
                values: new object[,]
                {
                    { 1, "Nohut", 1 },
                    { 2, "Fasulye", 1 },
                    { 3, "Elma", 2 },
                    { 4, "Armut", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Annotations_ObjectClassId",
                table: "Annotations",
                column: "ObjectClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_ObjectClassId",
                table: "Tags",
                column: "ObjectClassId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Annotations");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "ObjectClasses");
        }
    }
}
