# Getting started

```
dotnet new -h
dotnet new sln
dotnet new webapi -o API
dotnet sln add API
dotnet dev-certs https –trust
dotnet run
dotnet ef migrations add InitialCreate -o Data/Migrations
dotnet ef database update
dotnet new gitignore
dotnet ef database drop
dotnet add package Microsoft.AspNetCore.Mvc

// kill port 5001 on mac.
lsof -t -i tcp:5001 | xargs kill -9
```