import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseUrl, supabaseApiKey } from "./supabaseConfig";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";

function PresenterView() {

  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function checkSession() {

    setError("");

    if (!sessionId) {
      setError("Session ID is required");
      return;
    }

    try {

      const res = await fetch(
        `${supabaseUrl}/rest/v1/sessions?session_id=eq.${sessionId}`,
        {
          headers: {
            apikey: supabaseApiKey,
            Authorization: `Bearer ${supabaseApiKey}`,
            Accept: "application/json"
          }
        }
      );

      if (!res.ok) throw new Error("Error de conexión");

      const sessions = await res.json();

      if (sessions.length > 0) {
        navigate("/presenterlobby");
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

        {/* TITLE */}

        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(32px,5vw,56px)",
            mb: 2
          }}
        >
          Welcome presenter
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(18px,2vw,26px)",
            mb: 5
          }}
        >
          Create and join session
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
            mb: 2,
            backgroundColor: "#e0e0e0",
            borderRadius: "6px"
          }}
        />

        {error && (
          <Typography sx={{ color: "#ffbaba", mb: 2 }}>
            {error}
          </Typography>
        )}


        {/* JOIN BUTTON */}

        <Button
          variant="contained"
          onClick={checkSession}
          sx={{
            backgroundColor: "#5c78a7",
            fontSize: "20px",
            padding: "14px 60px",
            borderRadius: "14px",
            textTransform: "none",
            mb: 7,
            "&:hover": {
              backgroundColor: "#486592"
            }
          }}
        >
          Join
        </Button>


        {/* OPTIONS */}

        <Box
          sx={{
            display: "flex",
            gap: { xs: 6, md: 12 },
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >

          {/* CREATE SESSION */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >

            <Button
              onClick={() => navigate("/createsession")}
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.4)",
                color: "white",
                fontSize: "50px"
              }}
            >
              +
            </Button>

            <Typography sx={{ color: "white", fontSize: "18px" }}>
              Create session
            </Typography>

          </Box>


          {/* HELP */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >

            <Button
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.4)",
                color: "white",
                fontSize: "50px"
              }}
            >
              ?
            </Button>

            <Typography sx={{ color: "white", fontSize: "18px" }}>
              Help
            </Typography>

          </Box>

        </Box>

      </Box>

    </Container>

  );
}

export default PresenterView;