import React from "react";
import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 2rem 0;
  margin-top: 4rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterText = styled.p`
  color: #a0a0a0;
  margin: 1rem 0;
  line-height: 1.6;
`;

const Copyright = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
  color: #a0a0a0;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          코드 포매터는 개발자들을 위한 무료 온라인 코드 포매팅 도구입니다.
          JavaScript, TypeScript, HTML, CSS, JSON 등의 코드를 쉽고 빠르게
          포매팅하세요.
        </FooterText>
        <Copyright>
          <p>&copy; {new Date().getFullYear()} Code Formatter</p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
