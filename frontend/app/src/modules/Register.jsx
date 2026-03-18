import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Link,
  FormControl,
  Select,
  MenuItem,
  InputAdornment
} from "@mui/material";
import { supabase } from "./supabaseConfig"; 

function Register() {
  const navigate = useNavigate();

  // Estado de los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "audience"
  });

  // Estados para la interfaz y lógica
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    // check password strength (at least 6 characters)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    setLoading(true);
    try {
      // Registro seguro utilizando Supabase Auth
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role
            // created_at se genera automáticamente en Supabase Auth
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Registro exitoso, redirigimos al login
      navigate("/login");

    } catch (err) {
      setError(err.message || "Error connecting to the server.");
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
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "30px",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: { xs: 3, sm: 5, md: 7 },
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
            fontSize: "clamp(28px, 5vw, 48px)",
            textAlign: "center",
            mb: 4
          }}
        >
          Create Account
        </Typography>

        {/* NOMBRE */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "clamp(16px, 2vw, 20px)", mb: 1 }}>
          Full Name
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />

        {/* EMAIL */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "clamp(16px, 2vw, 20px)", mb: 1 }}>
          Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
        />

        {/* ROL */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "clamp(16px, 2vw, 20px)", mb: 1 }}>
          Role
        </Typography>
        <FormControl fullWidth sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: "6px" }}>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="audience">Audience</MenuItem>
            <MenuItem value="presenter">Presenter</MenuItem>
          </Select>
        </FormControl>

        {/* PASSWORD */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "clamp(16px, 2vw, 20px)", mb: 1 }}>
          Password
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
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

        {/* CONFIRM PASSWORD */}
        <Typography sx={{ alignSelf: "flex-start", color: "white", fontSize: "clamp(16px, 2vw, 20px)", mb: 1 }}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          sx={{ mb: 4, backgroundColor: "#e0e0e0", borderRadius: "6px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ textTransform: "none", color: "text.secondary", minWidth: "auto" }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </InputAdornment>
            )
          }}
        />

        {/* REGISTER BUTTON */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* ERROR MESSAGE */}
        {error && (
          <Typography sx={{ color: "#ffbdbd", mb: 2, textAlign: "center" }}>{error}</Typography>
        )}

        {/* BACK TO LOGIN */}
        <Link
          component="button"
          type="button"
          underline="none"
          sx={{
            color: "white",
            fontSize: "clamp(14px, 1.5vw, 18px)",
            mt: 2
          }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Log in
        </Link>
      </Box>
    </Container>
  );
}

export default Register;