import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
  size?: string | number;
  color?: string;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'text-4xl',
  color = 'text-blue-600 dark:text-blue-400',
  text,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <FaSpinner className={`animate-spin ${size} ${color}`} />
      {text && <p className={`mt-2 text-lg ${color}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;