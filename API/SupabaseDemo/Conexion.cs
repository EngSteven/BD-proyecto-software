using Supabase;
using System.Threading.Tasks;

namespace API
{
    public static class Conexion
    {
        // Mantienes tus variables ocultas
        public static string SupabaseUrl => "https://qfjjprdpytwodagcvhqx.supabase.co";
        public static string SupabaseApiKey => "sb_publishable_mxerFCKUojd-8Xa9wcNKBg_iESGO_3y";

        // Variable privada para mantener una única conexión (Patrón Singleton)
        private static Client _cliente;

        // Método para inicializar y obtener el cliente
        public static async Task<Client> ObtenerClienteAsync()
        {
            if (_cliente == null)
            {
                var options = new SupabaseOptions
                {
                    AutoConnectRealtime = true
                };
                
                _cliente = new Client(SupabaseUrl, SupabaseApiKey, options);
                await _cliente.InitializeAsync();
            }
            return _cliente;
        }
    }
}