import ContactFrom from "@/components/pages/contact/ContactFrom";
import NavBar from "@/components/pages/header/NavBar/NavBar";
import { getUser } from "@/services/auth";
import { getCartProducts } from "@/services/cart";
import T2 from "../../../assets/texture/t8.jpg";

const Contact = async () => {
  const user = await getUser();
  const userId = user?.id;
  const coupon = "";
  const products = await getCartProducts(userId, coupon);
  return (
    <>
      <NavBar userCartProducts={products?.data} />
      <div
        style={{
          backgroundImage: `url(${T2.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-12"
      >
        <div className="max-w-[1280px] mx-auto text-white">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="text-3xl lg:text-5xl font-bold  mb-4">
                Contact{" "}
                <span className="text-transparent bg-clip-text">Us</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1  rounded-full"></div>
            </div>
            <p className=" mt-6 text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            {/* Contact Form Section */}
            <div className="">
              <div className="bg-white rounded-md shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Send us a Message
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                </div>
                <ContactFrom />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gray-100 rounded-md shadow-xl p-8 lg:p-10 text-gray-800 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                  Get in Touch
                </h3>
                <p className="text-gray-600 text-lg">
                  Ready to find your perfect fragrance? We're here to help!
                </p>
                <div className="flex items-center space-x-4 group mt-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center group-hover:bg-gray-400 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-1">Our Location</h4>
                    <p className="text-gray-700">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>


              {/* Contact Details */}
              <div className="space-y-6">
                {/* <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center group-hover:bg-gray-400 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-1">Our Location</h4>
                    <p className="text-gray-700">Dhaka, Bangladesh</p>
                  </div>
                </div> */}

                {/* Uncomment this block if you want Call Us info */}
                {/*
  <div className="flex items-start space-x-4 group">
    <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center group-hover:bg-gray-400 transition-all duration-300">
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </div>
    <div className="flex-1">
      <h4 className="text-xl font-semibold mb-1">Call Us</h4>
      <a href="tel:+8801700000000" className="text-gray-700 hover:text-gray-900 block">
        +880 1700000000
      </a>
      <p className="text-gray-500 text-sm">Available 24/7</p>
    </div>
  </div>
  */}
              </div>

              {/* Business Hours */}
              {/* <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-xl font-semibold mb-3">Business Hours</h4>
                <div className="space-y-1 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
