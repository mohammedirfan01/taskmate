const ContactUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        We're here to help. Reach out to our Australia‑based support team
        anytime.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <form className="bg-white p-6 rounded-xl shadow-sm border">
          <label className="block mb-3">
            <span className="text-sm font-medium">Name</span>
            <input className="w-full mt-1 p-2 border rounded-md" />
          </label>

          <label className="block mb-3">
            <span className="text-sm font-medium">Email</span>
            <input className="w-full mt-1 p-2 border rounded-md" />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium">Message</span>
            <textarea className="w-full mt-1 p-2 border rounded-md h-32" />
          </label>

          <button className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700">
            Send Message
          </button>
        </form>

        <div>
          <h3 className="font-semibold mb-2">ServiceHub Australia</h3>
          <p className="text-slate-600 mb-4">
            Sydney NSW, Australia support@servicehub.com.au +61 2 8000 1234
          </p>

          <div className="w-full h-64 bg-slate-200 rounded-xl">
            {/* Map placeholder */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
