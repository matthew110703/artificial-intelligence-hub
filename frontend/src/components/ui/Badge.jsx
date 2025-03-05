const Badge = ({ text }) => {
  return (
    <div className="bg-primary/50 dark:bg-primary/15 dark:text-primary font-primary rounded-full px-2 py-1 text-sm font-semibold text-gray-600 capitalize shadow-sm">
      {text}
    </div>
  );
};

export default Badge;
