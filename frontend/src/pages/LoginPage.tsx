import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const { user } = useAuth();
  console.log("Este es el usuario actual: ", user);
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center bg-sst-gray/10">
        <LoginForm />
      </section>
    </>
  );
};

export { LoginPage };
