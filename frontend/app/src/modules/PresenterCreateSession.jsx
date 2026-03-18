import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import computer from "../aseets/computer.png";
import lentes from "../aseets/lentes.png";
import { supabase } from "./supabaseConfig"; // Usamos el cliente oficial

function PresenterCreateSession() {
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [presenterId, setPresenterId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Generador de códigos alfanuméricos aleatorios de 6 caracteres
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Leer presenter_id de localStorage y generar el código al montar el componente
  useEffect(() => {
    const id = localStorage.getItem("presenter_id");
    if (id) {
      setPresenterId(id);
    } else {
      // Si por alguna razón no hay ID, lo mandamos al login por seguridad
      navigate("/login");
    }
    
    // Asignamos un código autogenerado a la sesión
    setSessionId(generateSessionId());
  }, [navigate]);

  async function createSession() {
    setError("");
    setSuccess("");

    if (!sessionId || !name || !presenterId) {
      setError("Session name is required");
      return;
    }

    setLoading(true);
    try {
      // Inserción utilizando el SDK oficial de Supabase
      const { error: insertError } = await supabase
        .from('sessions')
        .insert([
          {
            session_id: sessionId,
            name: name,
            description: description,
            presenter_id: presenterId
          }
        ]);

      if (insertError) {
        // Error código 23505 = Conflicto de llave primaria (Primary Key)
        if (insertError.code === '23505') {
          // Si por una casualidad extrema el código se repitió, generamos uno nuevo
          setSessionId(generateSessionId());
          throw new Error("Collision detected. A new code has been generated, please try clicking Create again.");
        }
        throw insertError;
      }

      setSuccess("Session created successfully! Share the Session ID with your audience.");
      
      // Opcional: Redirigir a la vista del presentador después de unos segundos
      // setTimeout(() => navigate("/presenterview"), 2000);

    } catch (e) {
      setError(e.message || "Error connecting to server");
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
          alignItems: "center",
          backdropFilter: "blur(5px)"
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(32px,5vw,56px)",
            mb: 2,
            textAlign: "center"
          }}
        >
          Create Session
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: "clamp(18px,2vw,26px)",
            mb: 5,
            textAlign: "center"
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
            sx={{ width: { xs: 120, sm: 160, md: 200 } }}
          />

          <Typography sx={{ color: "white", fontSize: "40px" }}>
            →
          </Typography>

          <Box
            component="img"
            src={lentes}
            alt="vr headset"
            sx={{ width: { xs: 120, sm: 160, md: 200 } }}
          />
        </Box>

        {/* SESSION ID (Solo lectura) */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Session ID (Share this code)
        </Typography>

        <TextField
          fullWidth
          value={sessionId}
          InputProps={{
            readOnly: true, // Evita que el usuario lo modifique
          }}
          sx={{ 
            mb: 3, 
            backgroundColor: "#c5d1df", // Un color ligeramente diferente para indicar que es de solo lectura
            borderRadius: "6px",
            "& .MuiInputBase-input": {
              fontWeight: "bold",
              letterSpacing: "2px",
              textAlign: "center",
              fontSize: "22px"
            }
          }}
        />

        {/* NAME */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Name
        </Typography>

        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. My Awesome VR Show"
          sx={{ mb: 3, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />

        {/* DESCRIPTION */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "20px", mb: 1 }}>
          Description
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this session about?"
          sx={{ mb: 4, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />

        {/* El PRESENTER ID ya no se dibuja en pantalla por seguridad, pero sigue estando en el state y se envía */}

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
            disabled={loading}
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
            {loading ? "Creating..." : "Create"}
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/presenterview")}
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