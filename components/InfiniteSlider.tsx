import React from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const infiniteScroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #f9fafb;
  padding: 2rem 0;
  height: 20vh;
  display: flex;
  align-items: center;
`;

const SliderTrack = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AnimatedTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4rem;
  animation: ${infiniteScroll} 20s linear infinite;
`;

const LogoItem = styled.div`
  flex-shrink: 0;
`;

const LogoImageContainer = styled.div`
  position: relative;
  height: 4rem;
  width: 8rem;
  transition: filter 0.3s ease;
  
  /* Black and white filter */
  filter: grayscale(100%) contrast(0.9);
  
  /* Smooth color transition on hover */
  &:hover {
    filter: grayscale(0) contrast(1);
  }

  @media (min-width: 768px) {
    height: 5rem;
    width: 10rem;
  }
`;

interface LogoSliderProps {
  logos: string[];
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos = [] }) => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <SliderContainer>
      <SliderTrack>
        <AnimatedTrack>
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`logo-${index}`}>
              <LogoImageContainer>
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </LogoImageContainer>
            </LogoItem>
          ))}
        </AnimatedTrack>
      </SliderTrack>
    </SliderContainer>
  );
};

export default LogoSlider;