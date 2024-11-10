import styled from "styled-components";
import { mobile } from "../smallScreen";
import { useDispatch, useSelector } from "react-redux";
import { resetpassword } from "../redux/apiCalls";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "../assets/home.svg";

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(${backgroundImage}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 20px;
  background-color: beige;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
  font-size: 24px;
`;

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 18px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
  border-radius: 10px;
`;

const ResetPassword = () => { //TODO
  const [newPassword, setNewPassword] = useState("");
  const[confirmNewPassword, setConfirmNewPassword] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    e.preventDefault();
    await dispatch(resetpassword( token, newPassword));

    setTimeout(() => {
      navigate("/login");
    }, 5000);

    // setIsSubmitted(true);

  };
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Wrapper>
        <Title>Reset Password</Title>
        <Form>
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="confirm password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          
          <Button onClick={handleSubmit} disabled={isFetching}>
            Continue
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
