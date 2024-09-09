import Image from "next/image";

const AboutUsPage: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-24 lg:px-32">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg text-brown mb-12 font-medium">
          At TeaLife, we are dedicated to delivering the finest selection of
          teas from around the globe, crafted with care and brewed to
          perfection. Discover serenity in every sip.
        </p>
      </div>

      <div className="max-w-5xl mx-auto text-left space-y-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-yellow">
              Our Story
            </h3>
            <p className="text-gray-600 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              elementum, velit ut elementum convallis, nisl ex aliquet odio, ut
              posuere neque magna in eros. Curabitur sit amet mi ac erat
              efficitur scelerisque ac nec augue.
            </p>
            <p className="text-gray-600 mt-4">
              Phasellus sit amet felis eget ligula interdum interdum nec vitae
              orci. Vestibulum tempus est eu ipsum feugiat pharetra. Nunc vitae
              nisi non nunc auctor porttitor. Proin aliquam fermentum libero,
              vitae tempor lorem.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="https://via.placeholder.com/500"
              width={500}
              height={500}
              alt="Our Story"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-[darkGreen]">
              Our Mission
            </h3>
            <p className="text-gray-600 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              elementum, velit ut elementum convallis, nisl ex aliquet odio, ut
              posuere neque magna in eros. Curabitur sit amet mi ac erat
              efficitur scelerisque ac nec augue.
            </p>
            <p className="text-gray-600 mt-4">
              Phasellus sit amet felis eget ligula interdum interdum nec vitae
              orci. Vestibulum tempus est eu ipsum feugiat pharetra. Nunc vitae
              nisi non nunc auctor porttitor. Proin aliquam fermentum libero,
              vitae tempor lorem.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="https://via.placeholder.com/500"
              width={500}
              height={500}
              alt="Our Mission"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="https://via.placeholder.com/150"
                width={150}
                height={150}
                alt="Team Member 1"
                className="w-32 h-32 mx-auto rounded-full shadow-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">John Doe</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <Image
                src="https://via.placeholder.com/150"
                width={150}
                height={150}
                alt="Team Member 2"
                className="w-32 h-32 mx-auto rounded-full shadow-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Jane Smith
              </h4>
              <p className="text-gray-600">Head of Marketing</p>
            </div>
            <div className="text-center">
              <Image
                src="https://via.placeholder.com/150"
                width={150}
                height={150}
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full shadow-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Emily Johnson
              </h4>
              <p className="text-gray-600">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
