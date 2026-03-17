import React, { useState } from "react";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabaseUrl, supabaseApiKey } from "./supabaseConfig";

function ChangePasswordView() {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function changePassword() {
    setError("");
    setSuccess("");

    if (!email || !newPassword) {
      setError("Email and new password are required");
      return;
    }

    try {
      // Verificar si el email existe primero
      const checkRes = await fetch(`${supabaseUrl}/rest/v1/users?email=eq.${email}`, {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          Accept: "application/json"
        }
      });
      if (!checkRes.ok) throw new Error("Error checking email");
      const users = await checkRes.json();
      if (!users || users.length === 0) {
        setError("Email not found");
        return;
      }

      // Si existe, actualizar contraseña
      const res = await fetch(`${supabaseUrl}/rest/v1/users?email=eq.${email}`, {
        method: "PATCH",
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          password: newPassword
        })
      });

      if (!res.ok) throw new Error("Error updating password");

      setSuccess("Password updated successfully");
    } catch (e) {
      setError("Error connecting to server");
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
            mb: 2
          }}
        >
          Change Password
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(18px,2vw,26px)",
            mb: 5
          }}
        >
          Update your account password
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


        {/* NEW PASSWORD */}

        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: "20px",
            mb: 1
          }}
        >
          New Password
        </Typography>

        <TextField
          fullWidth
          type="password"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{
            mb: 4,
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
            justifyContent: "center"
          }}
        >

          <Button
            variant="contained"
            onClick={changePassword}
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
            Update Password
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