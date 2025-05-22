import Container from '@/components/layout/Container';
import Link from 'next/link';
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegramPlane, FaPaperPlane, FaUserFriends } from 'react-icons/fa';

interface ContactSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ title, icon: Icon, children, className = '' }) => (
  <section className={`mb-10 ${className}`}>
    <div className="flex items-center mb-4">
      <Icon className="text-3xl text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
    </div>
    <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
      {children}
    </div>
  </section>
);

interface ContactLinkProps {
  href: string;
  icon: React.ElementType;
  text: string;
  isExternal?: boolean;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, icon: Icon, text, isExternal = false }) => (
  <a
    href={href}
    target={isExternal ? "_blank" : "_self"}
    rel={isExternal ? "noopener noreferrer" : ""}
    className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group transition-colors"
  >
    <Icon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
    <span>{text}</span>
  </a>
);


export default function ContactPage() {
  return (
    <Container className="py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <FaPaperPlane className="text-6xl text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Свяжитесь с нами
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Мы всегда рады вашим вопросам, предложениям и отзывам!
          </p>
        </header>

        <ContactSection title="Электронная почта" icon={FaEnvelope}>
          <p>
            Для общих вопросов, предложений или сообщений об ошибках пишите нам на:
          </p>
          <ContactLink href="mailto:info@goaviatickets.com" icon={FaEnvelope} text="info@goaviatickets.com" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Мы постараемся ответить вам как можно скорее.
          </p>
        </ContactSection>

        <ContactSection title="Разработчики" icon={FaUserFriends}>
          <p>
            Вы также можете связаться с разработчиками проекта:
          </p>
          <div className="space-y-3 mt-3">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Алексей</h4>
              <div className="flex space-x-4 mt-1">
                <ContactLink href="https://github.com/ale742" icon={FaGithub} text="GitHub" isExternal />
                {}
                {}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Аслан</h4>
              <div className="flex space-x-4 mt-1">
                <ContactLink href="https://github.com/Wheazzyy1" icon={FaGithub} text="GitHub" isExternal />
                {}
                {}
              </div>
            </div>
          </div>
        </ContactSection>

        <ContactSection title="Форма обратной связи" icon={FaPaperPlane}>
          <p>
            В настоящее время форма обратной связи находится в разработке. Мы планируем добавить ее в ближайшем будущем.
          </p>
          <p>
            А пока, пожалуйста, используйте указанный выше адрес электронной почты для связи с нами.
          </p>
        </ContactSection>

         <div className="mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
            <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Вернуться на главную
            </Link>
        </div>

      </div>
    </Container>
  );
}

