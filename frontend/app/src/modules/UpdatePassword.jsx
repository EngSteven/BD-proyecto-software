import React, { useState, useEffect } from "react";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabase } from "./supabaseConfig"; 

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Verificamos si el usuario realmente viene del enlace del correo
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError("Invalid or expired link. Please request a new password reset.");
      }
    });

    // Supabase escucha el cambio de estado en la URL (cuando el token se valida)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Recovery flow started");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      // Esta función actualiza la contraseña del usuario actualmente autenticado (el que hizo clic en el link)
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setSuccess("Password updated successfully! Redirecting to login...");
      
      // Esperamos 2 segundos y lo mandamos al login para que entre con su nueva clave
      setTimeout(() => {
        // Cerramos la sesión temporal de recuperación por seguridad
        supabase.auth.signOut(); 
        navigate("/login");
      }, 2000);

    } catch (e) {
      setError(e.message || "Error updating password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(180deg,#0a3c5b,#0e6b5e)", padding: 2 }}>
      <Box sx={{ width: "85%", maxWidth: "900px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.3)", padding: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "clamp(32px,5vw,56px)", mb: 2, textAlign: "center" }}>
          Set New Password
        </Typography>

        <Typography sx={{ color: "white", fontSize: "clamp(18px,2vw,26px)", mb: 5, textAlign: "center" }}>
          Enter your new password below
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 3, md: 6 }, mb: 6 }}>
          <Box component="img" src={computer} alt="computer" sx={{ width: { xs: 120, sm: 160, md: 200 } }} />
          <Typography sx={{ color: "white", fontSize: "40px" }}>→</Typography>
          <Box component="img" src={lentes} alt="vr headset" sx={{ width: { xs: 120, sm: 160, md: 200 } }} />
        </Box>

        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          New Password
        </Typography>

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 4, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={() => setShowPassword(!showPassword)} sx={{ textTransform: "none", color: "text.secondary", minWidth: "auto" }}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputAdornment>
            )
          }}
        />

        {error && <Typography sx={{ color: "#ffbaba", mb: 2 }}>{error}</Typography>}
        {success && <Typography sx={{ color: "#b9ffb9", mb: 2 }}>{success}</Typography>}

        <Button
          variant="contained"
          onClick={handleUpdatePassword}
          disabled={loading}
          sx={{ backgroundColor: "#5c78a7", fontSize: "20px", padding: "14px 50px", borderRadius: "14px", textTransform: "none", "&:hover": { backgroundColor: "#486592" } }}
        >
          {loading ? "Updating..." : "Save New Password"}
        </Button>

      </Box>
    </Container>
  );
}

export default UpdatePassword;