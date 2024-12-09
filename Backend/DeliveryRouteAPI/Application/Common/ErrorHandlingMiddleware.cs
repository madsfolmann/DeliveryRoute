using Microsoft.AspNetCore.Mvc;

namespace DeliveryRouteAPI.Application.Common;

public class GlobalExceptionHandlerMiddleware(ILogger<GlobalExceptionHandlerMiddleware> logger) : IMiddleware
{
	private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger = logger;

	public async Task InvokeAsync(HttpContext context, RequestDelegate next)
	{
		try
		{
			await next(context);
		}
		catch (Exception ex)
		{
			var traceId = Guid.NewGuid();
			_logger.LogError($"Error occure while processing the request, TraceId : ${traceId}, Message : ${ex.Message}, StackTrace: ${ex.StackTrace}");

			context.Response.StatusCode = StatusCodes.Status500InternalServerError;

			var problemDetails = new ProblemDetails
			{
				Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
				Title = "Internal Server Error",
				Status = (int)StatusCodes.Status500InternalServerError,
				Instance = context.Request.Path,
				Detail = "Internal server error occurred. Please contact support.",
			};

			problemDetails.Extensions["traceId"] = traceId;

			await context.Response.WriteAsJsonAsync(problemDetails);
		}
	}
}
