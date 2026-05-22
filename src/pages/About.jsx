import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const highlights = [
  {
    title: "Curated Product Selection",
    description:
      "We handpick trending and reliable products across electronics, accessories, and lifestyle categories.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Every listing shows clear pricing with no hidden checkout surprises.",
  },
  {
    title: "Fast Support",
    description:
      "Our support team responds quickly to order and account questions.",
  },
  {
    title: "Secure Shopping",
    description:
      "From browsing to checkout, we focus on keeping your data and transactions safe.",
  },
];

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <PageTitle title="About Us | E-Commerce" />
      <NavBar />

      <main className="grow">
        <section className="bg-linear-to-r from-blue-700 to-cyan-600 px-4 py-16 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-100">
              About Our Store
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
              Shopping made simple, reliable, and enjoyable.
            </h1>
            <p className="max-w-2xl text-base text-blue-50 md:text-lg">
              We built this platform to help you discover quality products quickly,
              place orders confidently, and enjoy a smooth buying experience from
              start to finish.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold text-blue-700">
                {item.title}
              </h2>
              <p className="text-slate-600">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mb-5 text-slate-600">
              Our mission is to connect customers with trustworthy products at fair
              prices while delivering an experience that feels fast, friendly, and
              dependable.
            </p>
            <h3 className="mb-2 text-xl font-semibold text-slate-800">Why people choose us</h3>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Modern, easy-to-use product browsing and filtering.</li>
              <li>Quick order handling with status visibility.</li>
              <li>Helpful customer service and clear communication.</li>
              <li>A growing catalog aligned with customer needs.</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;