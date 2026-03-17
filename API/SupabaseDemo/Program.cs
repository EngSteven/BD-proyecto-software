// ------------------------------------------------------------
// Clase y método para verificar session_id en Supabase
// ------------------------------------------------------------
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace API
{
	public class Session
	{
		[JsonPropertyName("session_id")]
		public string SessionId { get; set; }
		[JsonPropertyName("name")]
		public string Name { get; set; }
		[JsonPropertyName("description")]
		public string Description { get; set; }
		[JsonPropertyName("presenter_id")]
		public string PresenterId { get; set; }
		[JsonPropertyName("created_at")]
		public string CreatedAt { get; set; }
	}

	public class Program
	{
		public static async Task Main(string[] args)
		{
			Console.WriteLine("Introduce el session_id a buscar:");
			string sessionId = Console.ReadLine();
			bool exists = await CheckSessionExists(sessionId);
			if (exists)
				Console.WriteLine($"La sesión {sessionId} SÍ existe en la base de datos.");
			else
				Console.WriteLine($"La sesión {sessionId} NO existe en la base de datos.");
		}

		public static async Task<bool> CheckSessionExists(string sessionId)
		{
			using var client = new HttpClient();
			client.BaseAddress = new Uri(Conexion.SupabaseUrl);
			client.DefaultRequestHeaders.Add("apikey", Conexion.SupabaseApiKey);
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

			var url = $"/rest/v1/sessions?session_id=eq.{sessionId}";
			var response = await client.GetAsync(url);
			if (!response.IsSuccessStatusCode)
				return false;

			var json = await response.Content.ReadAsStringAsync();
			var sessions = JsonSerializer.Deserialize<List<Session>>(json);
			return sessions != null && sessions.Count > 0;
		}
	}
}
