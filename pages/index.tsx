import styled from 'styled-components';
import TitleSection from '../components/TitleSection/index';
import CarForm from '../components/CarForm/Index';
import { CarProvider } from '../context/CarContext';

const StyledCarFormWrapper = styled.div`
padding-top: 64px;
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`;

export default function Home() {
  return (
    <div className="container-main">
      <CarProvider>
        <main className={`flex min-h-screen flex-col items-center`}>
          <StyledCarFormWrapper>
          <TitleSection />
            <CarForm />
          </StyledCarFormWrapper>
        </main>
      </CarProvider>
    </div>
  );
}
