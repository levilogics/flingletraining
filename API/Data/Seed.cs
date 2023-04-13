using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;

namespace API.Data;

public class Seed
{
    public static void SeedUsers(DataContext context)
    {
        if (context.Users.Any()) return;
        var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
        if (users == null) return;
        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();
            user.UserName = user.UserName.ToLower();
            user.PasswordSalt = hmac.Key;
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            context.Users.Add(user);
        }

        context.SaveChangesAsync();
    }
}