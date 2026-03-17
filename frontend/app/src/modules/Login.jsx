
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, TextField, Link } from "@mui/material";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabaseUrl, supabaseApiKey } from "./supabaseConfig";
// import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      // Consulta a Supabase REST API
      const res = await fetch(`${supabaseUrl}/rest/v1/users?email=eq.${email}`, {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          Accept: "application/json"
        }
      });
      if (!res.ok) throw new Error("Error de conexión");
      const users = await res.json();
      if (users.length > 0 && users[0].password === password) {
        // Login correcto
        if (users[0].role === "presenter") {
          localStorage.setItem("presenter_id", users[0].id);
          navigate("/presenterview");
        } else {
          navigate("/audienceview");
        }
      } else {
        setError("Email o contraseña incorrectos");
      }
    } catch (e) {
      setError("Error al conectar con el servidor");
    }
    setLoading(false);
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
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{
            mb: 4,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
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
          {loading ? "Cargando..." : "Login"}
        </Button>

        {/* ERROR MESSAGE */}
        {error && (
          <Typography sx={{ color: "#ffbdbd", mb: 2, textAlign: "center" }}>{error}</Typography>
        )}

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