import Container from "./Container";

const Footer = () => {
  return (
    <footer className="pb-6 pt-6 px-4">
      <Container className="flex flex-col items-center text-center gap-2 text-gray-900">
        <p className="text-xs">
          Created by Moges Bekele with Next.js, Postgres, Xata, Clerk and Stripe
          for payments.
        </p>
        <p className="text-xs">
          Invoicing-app &copy; {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
