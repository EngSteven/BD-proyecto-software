import React, { useState } from "react";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabaseUrl, supabaseApiKey } from "./supabaseConfig";


function PresenterCreateSession() {
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [presenterId, setPresenterId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Leer presenter_id de localStorage al montar el componente
  React.useEffect(() => {
    const id = localStorage.getItem("presenter_id");
    if (id) setPresenterId(id);
  }, []);

  async function createSession() {
    setError("");
    setSuccess("");
    if (!sessionId || !name || !presenterId) {
      setError("Session ID, name and presenter ID are required");
      return;
    }
    try {
      // Verificar si el session_id ya existe
      const checkRes = await fetch(`${supabaseUrl}/rest/v1/sessions?session_id=eq.${sessionId}`, {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          Accept: "application/json"
        }
      });
      if (!checkRes.ok) throw new Error("Error checking session ID");
      const sessions = await checkRes.json();
      if (sessions && sessions.length > 0) {
        setError("Session ID already exists");
        return;
      }

      // Si no existe, crear la sesión
      const res = await fetch(`${supabaseUrl}/rest/v1/sessions`, {
        method: "POST",
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          session_id: sessionId,
          name: name,
          description: description,
          presenter_id: presenterId
        })
      });
      if (!res.ok) throw new Error("Error creating session");
      setSuccess("Session created successfully");
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

        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(32px,5vw,56px)",
            mb: 2
          }}
        >
          Create Session
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(18px,2vw,26px)",
            mb: 5
          }}
        >
          Create a new presentation session
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

          <Typography sx={{ color: "white", fontSize: "40px" }}>
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

        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Session ID
        </Typography>

        <TextField
          fullWidth
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          sx={{ mb: 3, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />


        {/* NAME */}

        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Name
        </Typography>

        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />


        {/* DESCRIPTION */}

        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Description
        </Typography>

        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />


        {/* PRESENTER ID */}

        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Presenter ID
        </Typography>

        <TextField
          fullWidth
          value={presenterId}
          onChange={(e) => setPresenterId(e.target.value)}
          sx={{ mb: 4, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
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
            onClick={createSession}
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
            Create
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
            Back
          </Button>

        </Box>

      </Box>

    </Container>
  );
}

export default PresenterCreateSession;