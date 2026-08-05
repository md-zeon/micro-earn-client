const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`group relative rounded-2xl backdrop-blur-xl transition-all duration-500 ease-out hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 overflow-hidden ${className}`}
    >
      {/* Glow background on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Actual content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
