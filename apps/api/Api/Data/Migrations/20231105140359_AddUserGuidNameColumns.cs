using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations;

/// <inheritdoc />
public partial class AddUserGuidNameColumns : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<string>(
            name: "email",
            table: "users",
            type: "character varying(256)",
            maxLength: 256,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "character varying(256)",
            oldMaxLength: 256,
            oldNullable: true);

        migrationBuilder.AddColumn<DateTime>(
            name: "created_at",
            table: "users",
            type: "timestamp with time zone",
            nullable: false,
            defaultValueSql: "now()");

        migrationBuilder.AddColumn<Guid>(
            name: "guid",
            table: "users",
            type: "uuid",
            nullable: false,
            defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

        migrationBuilder.AddColumn<string>(
            name: "name",
            table: "users",
            type: "character varying(70)",
            maxLength: 70,
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddColumn<DateTime>(
            name: "updated_at",
            table: "users",
            type: "timestamp with time zone",
            nullable: false,
            defaultValueSql: "now()");

        migrationBuilder.CreateIndex(
            name: "ix_users_guid",
            table: "users",
            column: "guid",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "ix_users_guid",
            table: "users");

        migrationBuilder.DropColumn(
            name: "created_at",
            table: "users");

        migrationBuilder.DropColumn(
            name: "guid",
            table: "users");

        migrationBuilder.DropColumn(
            name: "name",
            table: "users");

        migrationBuilder.DropColumn(
            name: "updated_at",
            table: "users");

        migrationBuilder.AlterColumn<string>(
            name: "email",
            table: "users",
            type: "character varying(256)",
            maxLength: 256,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "character varying(256)",
            oldMaxLength: 256);
    }
}
