// ------------------------------------------------------------
// Clase y método para verificar session_id en Supabase (Usando SDK Oficial)
// ------------------------------------------------------------
using System;
using System.Threading.Tasks;
using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;

namespace API
{
    // Mapeo directo a la tabla "sessions"
    [Table("sessions")]
    public class Session : BaseModel
    {
        [PrimaryKey("session_id", false)]
        public string SessionId { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("presenter_id")]
        public string PresenterId { get; set; }

        [Column("created_at")]
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

        // Método separado, tal cual lo tenías, devolviendo un booleano
        public static async Task<bool> CheckSessionExists(string sessionId)
        {
            try
            {
                // Obtenemos la conexión centralizada
                var supabase = await Conexion.ObtenerClienteAsync();

                // Hacemos la consulta equivalente a: GET /rest/v1/sessions?session_id=eq.{sessionId}
                var response = await supabase.From<Session>()
                                             .Where(x => x.SessionId == sessionId)
                                             .Get();

                // Si la lista de modelos tiene al menos 1 elemento, retorna true
                return response.Models.Count > 0;
            }
            catch (Exception)
            {
                // Si hay algún error de red o de Supabase, retorna false (comportamiento original)
                return false;
            }
        }
    }
}