import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  title?: string;
  message: string | null;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Произошла ошибка',
  message,
  className = '',
}) => {
  if (!message) return null;

  return (
    <div
      className={`bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-200 p-4 rounded-md shadow ${className}`}
      role="alert"
    >
      <div className="flex items-center">
        <FaExclamationTriangle className="text-xl text-red-500 dark:text-red-400 mr-3" />
        <div>
          <p className="font-bold">{title}</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;