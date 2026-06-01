import React, { useState } from "react";
import styled from "styled-components";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Container>
      <Hero>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Have questions, feedback, or need help
          with an order? Get in touch.
        </p>
      </Hero>

      <Content>
        <ContactInfo>
          <InfoCard>
            <Icon>📞</Icon>
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </InfoCard>

          <InfoCard>
            <Icon>📧</Icon>
            <h3>Email</h3>
            <p>support@foodie.com</p>
          </InfoCard>

          <InfoCard>
            <Icon>📍</Icon>
            <h3>Address</h3>
            <p>New Delhi, India</p>
          </InfoCard>

          <InfoCard>
            <Icon>⏰</Icon>
            <h3>Working Hours</h3>
            <p>9:00 AM - 11:00 PM</p>
          </InfoCard>
        </ContactInfo>

        <FormWrapper>
          <FormTitle>Send Us A Message</FormTitle>

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <TextArea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <SubmitButton type="submit">
              Send Message
            </SubmitButton>
          </form>
        </FormWrapper>
      </Content>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 8%;
  background: #f8f9fc;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 48px;
    margin-bottom: 10px;
    color: #111;
  }

  p {
    color: #666;
    max-width: 650px;
    margin: auto;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 34px;
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 35px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  gap: 20px;
`;

const InfoCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);

  h3 {
    margin: 10px 0;
  }

  p {
    color: #666;
  }
`;

const Icon = styled.div`
  font-size: 30px;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 15px;

  &:focus {
    border-color: #ff4d6d;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  resize: none;
  outline: none;
  font-size: 15px;

  &:focus {
    border-color: #ff4d6d;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 15px;
  border: none;
  border-radius: 12px;
  background: #ff4d6d;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;