const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} GoAviaTickets. Все права защищены.</p>
        <p className="text-sm text-gray-400 mt-2">
          Сайт разработан Алексеем и Асланом.
        </p>
      </div>
    </footer>
  );
};

export default Footer;