import LoginPage from "../components/Auth/LoginForm";

const LandingPage = () => {
  return (
    <div className=" w-screen h-screen flex flex-col">
      <div className="flex flex-grow items-center justify-center">
        <LoginPage />
      </div>
    </div>
  );
};

export default LandingPage;
