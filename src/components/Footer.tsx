import Container from "./Container";

const Footer = () => {
  return (
    <footer className="pb-6 pt-6">
      <Container className="flex justify-center flex-col items-center text-gray-900">
        <p className="text-sm">
          Created by Moges Bekele with Next.js, Postgres, Xata, Clerk and Stripe for payments.
        </p>
        <p className="text-sm">
          Invoicing-app &copy; {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
