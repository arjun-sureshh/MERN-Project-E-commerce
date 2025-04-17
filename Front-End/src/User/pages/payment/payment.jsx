import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
  Chip,
  FormHelperText,
} from "@mui/material";
import {
  Payment as PaymentIcon,
  CreditCard,
  Lock,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Security,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import supabase from "../../utils/supabase";

// Define types for the component
type CardDetails = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
};

type Errors = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
};

type Touched = {
  number: boolean;
  name: boolean;
  expiry: boolean;
  cvv: boolean;
};

const PaymentGateway = () => {
  const { id } = useParams<{ id: string }>();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Errors>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [touched, setTouched] = useState<Touched>({
    number: false,
    name: false,
    expiry: false,
    cvv: false,
  });
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);
  const [showCvv, setShowCvv] = useState<boolean>(false);
  const [cardType, setCardType] = useState<string>("");
  const navigate = useNavigate();

  // Refs for GSAP animations
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  // Card brand logos (simplified for demo)
  const cardBrands: Record<string, string> = {
    Visa: "VISA",
    MasterCard: "MC",
    "American Express": "AMEX",
    Discover: "DISC",
    "Diners Club": "DINERS",
    JCB: "JCB",
  };

  // CVV length based on card type
  const getCvvLength = (): number => {
    return cardType === "American Express" ? 4 : 3;
  };

  useEffect(() => {
    // Initial animations
    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, []);

  useEffect(() => {
    // Animate card flip
    if (cardFrontRef.current && cardBackRef.current) {
      if (cardFlipped) {
        gsap.to(cardFrontRef.current, { rotationY: 180, duration: 0.6 });
        gsap.to(cardBackRef.current, { rotationY: 0, duration: 0.6 });
      } else {
        gsap.to(cardFrontRef.current, { rotationY: 0, duration: 0.6 });
        gsap.to(cardBackRef.current, { rotationY: -180, duration: 0.6 });
      }
    }
  }, [cardFlipped]);

  // Luhn algorithm for card number validation
  const isValidCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s+/g, "");
    if (!/^\d+$/.test(cleaned)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string): string => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  const validateExpiry = (expiry: string): string => {
    if (!expiry || expiry.length < 5) return "Invalid expiry date";

    const [month, year] = expiry.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return "Invalid format (MM/YY)";
    }

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) {
      return "Invalid month (1-12)";
    }

    if (
      yearNum < currentYear ||
      (yearNum === currentYear && monthNum < currentMonth)
    ) {
      return "Card has expired";
    }

    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "number") {
      const formattedValue = formatCardNumber(value);
      setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
      detectCardType(formattedValue.replace(/\s/g, ""));

      // Validate card number
      const cleanedValue = formattedValue.replace(/\s/g, "");
      if (cleanedValue.length < 16) {
        setErrors((prev) => ({
          ...prev,
          number: "Card number must be 16 digits",
        }));
      } else if (!isValidCardNumber(cleanedValue)) {
        setErrors((prev) => ({ ...prev, number: "Invalid card number" }));
      } else {
        setErrors((prev) => ({ ...prev, number: "" }));
      }
    } else if (name === "expiry") {
      const formattedValue = formatExpiry(value);
      setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));

      // Validate expiry
      const expiryError = validateExpiry(formattedValue);
      setErrors((prev) => ({ ...prev, expiry: expiryError }));
    } else if (name === "cvv") {
      const cvvLength = getCvvLength();
      if (value.length > cvvLength) return;

      setCardDetails((prev) => ({ ...prev, [name]: value }));

      // Validate CVV
      if (value.length < cvvLength) {
        setErrors((prev) => ({
          ...prev,
          cvv: `CVV must be ${cvvLength} digits`,
        }));
      } else if (!/^\d+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          cvv: "CVV must contain only numbers",
        }));
      } else {
        setErrors((prev) => ({ ...prev, cvv: "" }));
      }
    } else {
      // Card holder name
      setCardDetails((prev) => ({ ...prev, [name]: value }));

      // Validate name
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          name: "Card holder name is required",
        }));
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "Name can only contain letters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }
  };

  const detectCardType = (cardNumber: string) => {
    if (/^4/.test(cardNumber)) setCardType("Visa");
    else if (/^5[1-5]/.test(cardNumber)) setCardType("MasterCard");
    else if (/^3[47]/.test(cardNumber)) setCardType("American Express");
    else if (/^6(?:011|5)/.test(cardNumber)) setCardType("Discover");
    else if (/^3(?:0[0-5]|[68])/.test(cardNumber)) setCardType("Diners Club");
    else if (/^(?:2131|1800|35)/.test(cardNumber)) setCardType("JCB");
    else setCardType("");
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    };

    // Validate card number
    const cleanedNumber = cardDetails.number.replace(/\s/g, "");
    if (!cleanedNumber) {
      newErrors.number = "Card number is required";
    } else if (cleanedNumber.length < 16) {
      newErrors.number = "Card number must be 16 digits";
    } else if (!isValidCardNumber(cleanedNumber)) {
      newErrors.number = "Invalid card number";
    }

    // Validate name
    if (!cardDetails.name.trim()) {
      newErrors.name = "Card holder name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(cardDetails.name)) {
      newErrors.name = "Name can only contain letters";
    }

    // Validate expiry
    const expiryError = validateExpiry(cardDetails.expiry);
    if (expiryError) {
      newErrors.expiry = expiryError;
    }

    // Validate CVV
    const cvvLength = getCvvLength();
    if (!cardDetails.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (cardDetails.cvv.length < cvvLength) {
      newErrors.cvv = `CVV must be ${cvvLength} digits`;
    } else if (!/^\d+$/.test(cardDetails.cvv)) {
      newErrors.cvv = "CVV must contain only numbers";
    }

    setErrors(newErrors);

    // Check if form is valid
    return !Object.values(newErrors).some((error) => error);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error: error1 } = await supabase
      .from("tbl_booking")
      .update({ booking_status: 1 })
      .eq("id", id);

    // Mark all fields as touched
    setTouched({
      number: true,
      name: true,
      expiry: true,
      cvv: true,
    });

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors).find((key) => errors[key as keyof Errors]);
      if (firstErrorField) {
        const inputElement = document.getElementsByName(firstErrorField)[0];
        if (inputElement) {
          inputElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
      return;
    }

    setProcessingPayment(true);

    // Add processing animation
    gsap.to(".pay-button", {
      scale: 0.95,
      repeat: 3,
      yoyo: true,
      duration: 0.3,
      ease: "power1.inOut",
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate payment processing

      setPaymentSuccess(true);
      setShowConfetti(true);
      setProcessingPayment(false);

      // Animate success transition
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          onComplete: () => {
            gsap.from(".success-message", {
              opacity: 0,
              y: 50,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
            });
          },
        });
      }

      setTimeout(() => {
        navigate("/User/ViewElection");
      }, 3500);
    } catch (error) {
      setProcessingPayment(false);
      Swal.fire({
        title: "Payment Failed",
        text: "Please check your card details and try again",
        icon: "error",
        confirmButtonColor: "#ff4081",
      });
      console.error("Payment error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #000428 0%,rgb(78, 132, 179) 100%)",
        p: 3,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating credit card icons */}
      <CreditCard
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontSize: 60,
          opacity: 0.1,
          transform: "rotate(-15deg)",
        }}
      />
      <PaymentIcon
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          fontSize: 70,
          opacity: 0.1,
          transform: "rotate(20deg)",
        }}
      />
      <Security
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          fontSize: 50,
          opacity: 0.1,
          transform: "rotate(10deg)",
        }}
      />

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={800}
          gravity={0.15}
          initialVelocityY={5}
          colors={["#ff4081", "#2196F3", "#4CAF50", "#FFEB3B"]}
        />
      )}

      {paymentSuccess ? (
        <Box
          className="success-message"
          sx={{
            textAlign: "center",
            opacity: 0,
            transform: "scale(0.8)",
            maxWidth: "500px",
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 100,
              color: "#4caf50",
              mb: 3,
              filter: "drop-shadow(0 0 8px rgba(76, 175, 80, 0.6))",
            }}
          />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Payment Successful!
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Your transaction has been completed successfully.
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "4px",
              bgcolor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "2px",
              mt: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                bgcolor: "#4caf50",
                animation: "progressBar 3s linear forwards",
                "@keyframes progressBar": {
                  "0%": { width: "0%" },
                  "100%": { width: "100%" },
                },
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          ref={formRef}
          sx={{
            width: "100%",
            maxWidth: "500px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold", letterSpacing: "1px" }}
          >
            Secure Payment
          </Typography>

          {/* 3D Credit Card */}
          <Box
            ref={cardRef}
            onClick={() => setCardFlipped(!cardFlipped)}
            sx={{
              perspective: "1000px",
              marginBottom: "40px",
              cursor: "pointer",
              position: "relative",
              height: "280px",
            }}
          >
            {/* Front of Card */}
            <Card
              ref={cardFrontRef}
              sx={{
                background: cardType
                  ? "linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)"
                  : "linear-gradient(45deg, #9E9E9E 0%, #E0E0E0 100%)",
                borderRadius: "16px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                color: "white",
                height: "100%",
                position: "absolute",
                width: "100%",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 3,
                transition: "background 0.5s ease",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Chip
                  label={cardType ? cardBrands[cardType] : "CARD"}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Tap to flip
                </Typography>
              </Box>

              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    letterSpacing: "3px",
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: cardDetails.number ? "1.5rem" : "1.3rem",
                  }}
                >
                  {cardDetails.number || "•••• •••• •••• ••••"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Card Holder
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "medium",
                      letterSpacing: "1px",
                    }}
                  >
                    {cardDetails.name || "YOUR NAME"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Expires
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {cardDetails.expiry || "••/••"}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Back of Card */}
            <Card
              ref={cardBackRef}
              sx={{
                background: cardType
                  ? "linear-gradient(45deg, #1976D2 0%, #2196F3 100%)"
                  : "linear-gradient(45deg, #757575 0%, #9E9E9E 100%)",
                borderRadius: "16px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                color: "white",
                height: "100%",
                position: "absolute",
                width: "100%",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                transform: "rotateY(-180deg)",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 3,
                transition: "background 0.5s ease",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  bgcolor: "black",
                  width: "calc(100% + 48px)",
                  mx: -3,
                  mt: -3,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  bgcolor: "rgba(0, 0, 0, 0.2)",
                  p: 1,
                  borderRadius: "4px",
                }}
              >
                <Typography variant="body1" sx={{ mr: 1 }}>
                  CVV:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Courier Prime', monospace",
                    letterSpacing: "2px",
                  }}
                >
                  {showCvv ? cardDetails.cvv : "•••"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  For verification purposes only
                </Typography>
                {cardType && (
                  <Chip
                    label={cardBrands[cardType]}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                )}
              </Box>
            </Card>
          </Box>

          {/* Payment Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Card Number"
                name="number"
                value={cardDetails.number}
                onChange={handleInputChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                placeholder="1234 5678 9012 3456"
                error={touched.number && !!errors.number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: touched.number && errors.number && (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 19 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.number
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.number
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.number ? "#f44336" : "#2196F3",
                      boxShadow: errors.number
                        ? "0 0 0 2px rgba(244, 67, 54, 0.3)"
                        : "0 0 0 2px rgba(33, 150, 243, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.number
                      ? "#f44336"
                      : "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": {
                      color: errors.number ? "#f44336" : "#2196F3",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    letterSpacing: "1px",
                  },
                }}
              />
              {touched.number && errors.number && (
                <FormHelperText
                  error
                  sx={{ ml: 2, display: "flex", alignItems: "center" }}
                >
                  <ErrorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {errors.number}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Card Holder Name"
                name="name"
                value={cardDetails.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                placeholder="John Doe"
                error={touched.name && !!errors.name}
                InputProps={{
                  endAdornment: touched.name && errors.name && (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.name
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.name
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.name ? "#f44336" : "#2196F3",
                      boxShadow: errors.name
                        ? "0 0 0 2px rgba(244, 67, 54, 0.3)"
                        : "0 0 0 2px rgba(33, 150, 243, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.name ? "#f44336" : "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": {
                      color: errors.name ? "#f44336" : "#2196F3",
                    },
                  },
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />
              {touched.name && errors.name && (
                <FormHelperText
                  error
                  sx={{ ml: 2, display: "flex", alignItems: "center" }}
                >
                  <ErrorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {errors.name}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  margin="normal"
                  variant="outlined"
                  placeholder="MM/YY"
                  error={touched.expiry && !!errors.expiry}
                  inputProps={{ maxLength: 5 }}
                  InputProps={{
                    endAdornment: touched.expiry && errors.expiry && (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.expiry
                          ? "#f44336"
                          : "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.expiry
                          ? "#f44336"
                          : "rgba(255, 255, 255, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.expiry ? "#f44336" : "#2196F3",
                        boxShadow: errors.expiry
                          ? "0 0 0 2px rgba(244, 67, 54, 0.3)"
                          : "0 0 0 2px rgba(33, 150, 243, 0.3)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: errors.expiry
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                      "&.Mui-focused": {
                        color: errors.expiry ? "#f44336" : "#2196F3",
                      },
                    },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
                {touched.expiry && errors.expiry && (
                  <FormHelperText
                    error
                    sx={{ ml: 2, display: "flex", alignItems: "center" }}
                  >
                    <ErrorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    {errors.expiry}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label={`CVV ${
                    cardType === "American Express"
                      ? "(4 digits)"
                      : "(3 digits)"
                  }`}
                  name="cvv"
                  type={showCvv ? "text" : "password"}
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  onFocus={() => setCardFlipped(true)}
                  onBlur={(e) => {
                    handleBlur(e);
                    setCardFlipped(false);
                  }}
                  margin="normal"
                  variant="outlined"
                  placeholder={cardType === "American Express" ? "••••" : "•••"}
                  error={touched.cvv && !!errors.cvv}
                  inputProps={{
                    maxLength: cardType === "American Express" ? 4 : 3,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {touched.cvv && errors.cvv && (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        )}
                        <InputAdornment position="end">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCvv(!showCvv);
                            }}
                            edge="end"
                            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                          >
                            {showCvv ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.cvv
                          ? "#f44336"
                          : "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.cvv
                          ? "#f44336"
                          : "rgba(255, 255, 255, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.cvv ? "#f44336" : "#2196F3",
                        boxShadow: errors.cvv
                          ? "0 0 0 2px rgba(244, 67, 54, 0.3)"
                          : "0 0 0 2px rgba(33, 150, 243, 0.3)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: errors.cvv
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                      "&.Mui-focused": {
                        color: errors.cvv ? "#f44336" : "#2196F3",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                      letterSpacing: "1px",
                    },
                  }}
                />
                {touched.cvv && errors.cvv && (
                  <FormHelperText
                    error
                    sx={{ ml: 2, display: "flex", alignItems: "center" }}
                  >
                    <ErrorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    {errors.cvv}
                  </FormHelperText>
                )}
              </Box>
            </Box>

            <Button
              className="pay-button"
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              startIcon={<PaymentIcon />}
              disabled={processingPayment}
              onClick={handleSubmit}
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "#ff4081",
                "&:hover": { bgcolor: "#f50057" },
                "&:disabled": { bgcolor: "rgba(255, 64, 129, 0.5)" },
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(255, 64, 129, 0.3)",
                transition: "all 0.3s ease",
                letterSpacing: "1px",
              }}
            >
              {processingPayment ? "Processing..." : "Pay Now"}
            </Button>
          </form>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              p: 1.5,
              borderRadius: "8px",
            }}
          >
            <Lock sx={{ fontSize: "1.2rem", mr: 1.5, color: "#4CAF50" }} />
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.9)" }}
            >
              Your payment is secured with 256-bit SSL encryption
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PaymentGateway;