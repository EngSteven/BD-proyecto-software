import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabaseUrl, supabaseApiKey } from "./supabaseConfig";

function AudienceView() {

  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function checkSession() {

    setError("");

    if (!sessionId) {
      setError("Session ID is required");
      return;
    }

    try {

      const res = await fetch(`${supabaseUrl}/rest/v1/sessions?session_id=eq.${sessionId}`, {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          Accept: "application/json"
        }
      });

      if (!res.ok) throw new Error("Error de conexión");

      const sessions = await res.json();

      if (sessions.length > 0) {
        navigate("/audiencelobby");
      } else {
        setError("Session not found");
      }

    } catch (e) {
      setError("Error al conectar con el servidor");
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

        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(32px,5vw,56px)",
            mb: 2
          }}
        >
          Welcome audience
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(18px,2vw,26px)",
            mb: 5
          }}
        >
          Join session
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


        {/* SESSION ID */}

        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: "20px",
            mb: 1
          }}
        >
          ID session
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
          }}
        />


        {/* NAME */}

        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: "20px",
            mb: 1
          }}
        >
          Name
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
          }}
        />


        {error && (
          <Typography sx={{ color: "#ffbaba", mb: 3 }}>
            {error}
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
            onClick={checkSession}
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
            Join
          </Button>


          <Button
            variant="contained"
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
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>

        </Box>

      </Box>

    </Container>
  );
}

export default AudienceView;