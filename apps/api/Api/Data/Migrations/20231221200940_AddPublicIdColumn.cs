using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations;

/// <inheritdoc />
public partial class AddPublicIdColumn : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "ix_users_guid",
            table: "users");

        migrationBuilder.DropColumn(
            name: "guid",
            table: "users");

        migrationBuilder.AddColumn<string>(
            name: "public_id",
            table: "users",
            type: "character varying(12)",
            maxLength: 12,
            nullable: false,
            defaultValue: "");

        migrationBuilder.CreateIndex(
            name: "ix_users_public_id",
            table: "users",
            column: "public_id",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "ix_users_public_id",
            table: "users");

        migrationBuilder.DropColumn(
            name: "public_id",
            table: "users");

        migrationBuilder.AddColumn<Guid>(
            name: "guid",
            table: "users",
            type: "uuid",
            nullable: false,
            defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

        migrationBuilder.CreateIndex(
            name: "ix_users_guid",
            table: "users",
            column: "guid",
            unique: true);
    }
}
