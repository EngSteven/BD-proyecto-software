import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Link,
  InputAdornment 
} from "@mui/material";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabase } from "./supabaseConfig"; // Usamos el cliente configurado

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      // Inicio de sesión utilizando Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (signInError) throw signInError;

      // Supabase guarda el rol y el nombre dentro de user_metadata
      const userRole = data.user.user_metadata?.role;

      // Validamos el rol para redirigir
      if (userRole === "presenter") {
        localStorage.setItem("presenter_id", data.user.id);
        navigate("/presenterview");
      } else {
        navigate("/audienceview");
      }
    } catch (e) {
      // Interceptamos el error específico de correo no confirmado
      if (e.message && e.message.includes("Email not confirmed")) {
        setError("Please check your inbox and confirm your email before logging in.");
      } else {
        // Mensaje genérico para contraseñas incorrectas u otros errores
        setError("Incorrect email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg,#0a3c5b,#0e6b5e)",
        padding: 2
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "30px",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: { xs: 3, sm: 5, md: 7 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(5px)"
        }}
      >

        {/* TITLE */}
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(32px, 6vw, 64px)",
            textAlign: "center",
            mb: 5
          }}
        >
          LiveShowVR
        </Typography>

        {/* IMAGES */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 4, md: 6 },
            flexWrap: "wrap",
            mb: 5
          }}
        >
          <Box
            component="img"
            src={computer}
            alt="computer"
            sx={{
              width: { xs: 120, sm: 160, md: 200 }
            }}
          />

          <Typography
            sx={{
              color: "white",
              fontSize: { xs: 28, sm: 36, md: 40 }
            }}
          >
            →
          </Typography>

          <Box
            component="img"
            src={lentes}
            alt="vr headset"
            sx={{
              width: { xs: 120, sm: 160, md: 200 }
            }}
          />
        </Box>

        {/* EMAIL */}
        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: "clamp(16px, 2vw, 20px)",
            mb: 1
          }}
        >
          Email
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
          }}
        />

        {/* PASSWORD */}
        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: "clamp(16px, 2vw, 20px)",
            mb: 1
          }}
        >
          Password
        </Typography>

        <TextField
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{
            mb: 4,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ textTransform: "none", color: "text.secondary", minWidth: "auto" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputAdornment>
            )
          }}
        />

        {/* LOGIN BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            backgroundColor: "#5c78a7",
            fontSize: "clamp(16px, 2vw, 20px)",
            padding: "14px",
            borderRadius: "14px",
            textTransform: "none",
            mb: 2,
            "&:hover": {
              backgroundColor: "#486592"
            }
          }}
        >
          {loading ? "Loading..." : "Login"}
        </Button>

        {/* ERROR MESSAGE */}
        {error && (
          <Typography sx={{ color: "#ffbdbd", mb: 2, textAlign: "center" }}>{error}</Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mt: 1 }}>
          {/* FORGOT PASSWORD */}
          <Link
            component="button"
            underline="none"
            sx={{
              color: "white",
              fontSize: "clamp(14px, 1.5vw, 18px)"
            }}
            onClick={() => navigate("/cambiarcontraseña")}
          >
            Forgot password?
          </Link>

          {/* REGISTER LINK */}
          <Link
            component="button"
            underline="none"
            sx={{
              color: "white",
              fontSize: "clamp(14px, 1.5vw, 18px)"
            }}
            onClick={() => navigate("/register")}
          >
            Don't have an account? Register
          </Link>
        </Box>

        {/* PROJECT TEXT */}
        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(12px, 1.5vw, 16px)",
            mt: 5,
            textAlign: "center",
            opacity: 0.9
          }}
        >
          Exploring Costa Rica’s biodiversity through its national currency
        </Typography>

      </Box>
    </Container>
  );
}

export default Login;