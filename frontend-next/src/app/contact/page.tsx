import Button from "../../components/helpers/Button";
const ContactUsPage: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-darkGreen text-center">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 font-medium mt-2">
          We&#39;d love to hear from you! Please fill out the form below.
        </p>

        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="text-center">
            <Button type="submit" loading={false}>
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUsPage;
