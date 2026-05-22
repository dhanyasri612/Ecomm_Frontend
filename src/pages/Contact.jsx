import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <PageTitle title="Contact Us | E-Commerce" />
      <NavBar />

      <main className="grow px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-700">
              Contact Information
            </p>
            <h1 className="mb-4 text-3xl font-bold text-slate-900">Get in touch</h1>
            <p className="mb-7 text-slate-600">
              Have a question about products, shipping, or your account? Reach out
              and we will help you quickly.
            </p>

            <div className="space-y-5 text-sm md:text-base">
              <div>
                <p className="font-semibold text-slate-800">Email</p>
                <p className="text-slate-600">support@ecommerce.com</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Phone</p>
                <p className="text-slate-600">+91 90000 12345</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Office Hours</p>
                <p className="text-slate-600">Mon - Sat, 9:00 AM to 7:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Address</p>
                <p className="text-slate-600">
                  4th Floor, Commerce Hub, Bengaluru, Karnataka, India
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-3">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">Send us a message</h2>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-blue-300 transition focus:ring"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-blue-300 transition focus:ring"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-blue-300 transition focus:ring"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Write your message"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-blue-300 transition focus:ring"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  className="rounded-lg bg-blue-700 px-6 py-2.5 font-semibold text-white shadow hover:bg-blue-800"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;