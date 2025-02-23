// UI
import Header from "./Header";
import Footer from "./Footer";

const Container = ({
  children,
  disableFooter = false,
  className,
  contentClassname,
}) => {
  return (
    <>
      <div className={`container mx-auto space-y-4 lg:space-y-8 ${className}`}>
        <Header />
        <main className={`w-full ${contentClassname}`}>{children}</main>
      </div>
      {!disableFooter && <Footer />}
    </>
  );
};

export default Container;
