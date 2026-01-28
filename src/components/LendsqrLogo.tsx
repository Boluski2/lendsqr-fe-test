import React from 'react';

interface LendsqrLogoProps {
  className?: string;
}

const LendsqrLogo: React.FC<LendsqrLogoProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      width="145" 
      height="30" 
      viewBox="0 0 145 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M6.14286 0C9.53571 0 12.2857 2.75 12.2857 6.14286V23.5714H0V6.14286C0 2.75 2.75 0 6.14286 0Z" 
        fill="#39CDCC"
      />
      <path 
        d="M12.2857 6.14286H24.5714V18.4286C24.5714 21.8214 21.8214 24.5714 18.4286 24.5714C15.0357 24.5714 12.2857 21.8214 12.2857 18.4286V6.14286Z" 
        fill="#213F7D"
      />
      <text 
        x="32" 
        y="21" 
        fontFamily="Work Sans, sans-serif" 
        fontSize="24" 
        fontWeight="600" 
        fill="#213F7D"
      >
        lendsqr
      </text>
    </svg>
  );
};

export default LendsqrLogo;
