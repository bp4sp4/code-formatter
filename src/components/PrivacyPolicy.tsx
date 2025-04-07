import React from "react";
import styled from "@emotion/styled";

const PrivacyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #444;
`;

const Text = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #666;
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <PrivacyContainer>
      <Title>개인정보 처리방침</Title>

      <Section>
        <SectionTitle>1. 수집하는 개인정보</SectionTitle>
        <Text>
          본 웹사이트는 Google AdSense를 통해 광고를 제공하며, 이 과정에서
          다음과 같은 정보가 수집될 수 있습니다: - IP 주소 - 브라우저 종류 및
          버전 - 운영체제 - 접속 시간 - 방문한 페이지
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. 개인정보의 수집 및 이용목적</SectionTitle>
        <Text>
          수집된 정보는 다음과 같은 목적으로 사용됩니다: - 광고 제공 및 최적화 -
          서비스 이용 통계 - 웹사이트 개선
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. 개인정보의 보유 및 이용기간</SectionTitle>
        <Text>
          수집된 개인정보는 법정 보유기간 또는 이용목적 달성 시까지 보관됩니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. 쿠키 정책</SectionTitle>
        <Text>
          본 웹사이트는 쿠키를 사용하여 사용자 경험을 개선하고 광고를
          제공합니다. 브라우저 설정을 통해 쿠키 사용을 제한할 수 있습니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. 광고 관련 정보</SectionTitle>
        <Text>
          본 웹사이트는 Google AdSense를 통해 광고를 제공합니다. Google
          AdSense는 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수
          있습니다.
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. 개인정보 보호책임자</SectionTitle>
        <Text>
          본 웹사이트의 개인정보 보호책임자는 다음과 같습니다: - 이메일:
          contact@codeformatter.com
        </Text>
      </Section>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
