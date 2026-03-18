import React, { useState } from "react";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabase } from "./supabaseConfig"; // Usamos el cliente oficial

function ChangePasswordView() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Nuevos estados para controlar la interfaz y evitar doble clic (Rate Limit)
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const navigate = useNavigate();

  async function sendResetLink() {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      // Supabase Auth maneja el envío del correo de recuperación de forma segura
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        // Redirigimos al usuario a una página segura para actualizar su contraseña después de validar el token
        redirectTo: 'http://localhost:3000/update-password', 
      });

      if (resetError) throw resetError;

      setSuccess("If the email is registered, a secure reset link has been sent.");
      
      // Activamos un cooldown de 60 segundos para evitar que gasten su cuota de correos
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, 60000); 

    } catch (e) {
      // Capturamos específicamente el error del límite de correos (Too Many Requests)
      if (e.message && e.message.toLowerCase().includes("rate limit")) {
        setError("You have requested too many emails. Please wait a while before trying again.");
      } else {
        setError(e.message || "Error connecting to server");
      }
    } finally {
      setLoading(false);
    }
  }

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
          width: "85%",
          maxWidth: "900px",
          borderRadius: "30px",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >

        {/* TITLE */}

        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(32px,5vw,56px)",
            mb: 2,
            textAlign: "center"
          }}
        >
          Reset Password
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(18px,2vw,26px)",
            mb: 5,
            textAlign: "center"
          }}
        >
          Enter your email to receive a secure recovery link
        </Typography>


        {/* IMAGES */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 3, md: 6 },
            mb: 6
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
              fontSize: "40px"
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
            fontSize: "20px",
            mb: 1
          }}
        >
          Email
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
          }}
        />

        {error && (
          <Typography sx={{ color: "#ffbaba", mb: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography sx={{ color: "#b9ffb9", mb: 2 }}>
            {success}
          </Typography>
        )}


        {/* BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 2
          }}
        >

          <Button
            variant="contained"
            onClick={sendResetLink}
            disabled={loading || cooldown} 
            sx={{
              backgroundColor: "#5c78a7",
              fontSize: "20px",
              padding: "14px 50px",
              borderRadius: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#486592"
              },
              // Estilo visual cuando está deshabilitado para que no se pierda en el fondo oscuro
              "&.Mui-disabled": { 
                backgroundColor: "rgba(92, 120, 167, 0.5)", 
                color: "rgba(255,255,255,0.7)" 
              }
            }}
          >
            {loading ? "Sending..." : cooldown ? "Wait 60s" : "Send Link"}
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "#5c78a7",
              fontSize: "20px",
              padding: "14px 50px",
              borderRadius: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#486592"
              }
            }}
          >
            Back to Login
          </Button>

        </Box>

      </Box>

    </Container>

  );
}

export default ChangePasswordView;