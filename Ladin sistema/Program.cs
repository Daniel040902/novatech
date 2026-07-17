using System.ComponentModel.DataAnnotations;
using Ladin_sistema.Models;

// --- Configuración del servidor ASP.NET Core ---
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();                              // Soporte para controladores API
builder.Services.AddOpenApi();                                   // Documentación OpenAPI/Swagger

// Configuración de CORS para desarrollo (permitir peticiones desde el frontend en Vite)
builder.Services.AddCors(options =>
{
    options.AddPolicy("Dev", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("Dev");
}

// Sirve los archivos estáticos del frontend (React build) desde client/dist
var reactDistPath = Path.GetFullPath(Path.Combine(app.Environment.ContentRootPath, "client", "dist"));
if (Directory.Exists(reactDistPath))
{
    app.UseDefaultFiles();
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(reactDistPath)
    });
}

// Middleware de seguridad: headers HTTP estrictos
app.UseHsts();
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    await next(context);
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Endpoint para recibir mensajes del formulario de contacto
app.MapPost("/api/contact", async (ContactRequest request) =>
{
    // Validación del modelo
    if (!Validator.TryValidateObject(request, new ValidationContext(request), null, true))
    {
        return Results.BadRequest(new { error = "Datos inválidos. Verifique los campos." });
    }

    // Sanitización contra XSS antes de guardar
    var safeName = System.Net.WebUtility.HtmlEncode(request.Name);
    var safeEmail = System.Net.WebUtility.HtmlEncode(request.Email);
    var safeMessage = System.Net.WebUtility.HtmlEncode(request.Message);

    // Guarda el mensaje en un archivo de logs
    var logPath = Path.Combine("logs", "contact.txt");
    Directory.CreateDirectory("logs");
    await File.AppendAllTextAsync(logPath,
        $"[{DateTime.UtcNow:O}] {safeName} <{safeEmail}>: {safeMessage}{Environment.NewLine}");

    return Results.Ok(new { message = "Mensaje recibido correctamente. Te contactaremos pronto." });
});

// Fallback: cualquier ruta no capturada redirige al index.html del SPA
if (Directory.Exists(reactDistPath))
{
    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(reactDistPath)
    });
}

app.Run();
