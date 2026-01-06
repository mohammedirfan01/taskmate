const HeroIllustration = () => {
  return (
    <div className="w-full max-w-md mx-auto animate-float">
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <circle cx="150" cy="150" r="140" fill="#E0F2FE" />

        <rect x="80" y="120" width="140" height="90" rx="12" fill="#0284C7" />
        <rect x="95" y="135" width="110" height="12" rx="6" fill="white" />
        <rect x="95" y="160" width="80" height="12" rx="6" fill="#BAE6FD" />
        <rect x="95" y="185" width="60" height="12" rx="6" fill="#7DD3FC" />

        <path
          d="M110 90 L130 110 L170 70"
          stroke="#10B981"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export default HeroIllustration;
