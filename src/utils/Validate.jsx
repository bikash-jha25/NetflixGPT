export const CheckValidData = (email, pass) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);

  if (!isValidEmail) return "Email is not valid";
  if (!isValidPass) return "Password is not valid";

  return null;
};
