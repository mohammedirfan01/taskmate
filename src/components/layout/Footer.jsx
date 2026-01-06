const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-12 text-center md:text-left flex md:block flex-col items-center ">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-4 text-sm">
        <div>
          <h3 className="font-semibold mb-2">TaskMate</h3>
          <p className="text-slate-400">
            Find trusted professionals for every job in one place.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-slate-400">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-slate-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Stay Updated</h4>
          <form className="flex gap-2">
            <input
              type="email"
              className="w-full px-2 py-1 rounded-md text-slate-900 text-xs"
              placeholder="Enter your email"
            />
            <button className="px-3 py-1 bg-sky-600 rounded-md text-xs">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800 text-xs text-slate-500 py-3 text-center">
        © {new Date().getFullYear()} ServiceHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
