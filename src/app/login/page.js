import Header from "@/components/Header";
import FormLogin from "@/components/Form/Auth/FormLogin";
export default function LoginPage() {
  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <FormLogin />
          </div>
        </div>
      </section>
    </>
  );
}
