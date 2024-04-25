const Footer = () => {
  return (
    <footer className="sticky bottom-0 py-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex justify-center items-center">
          <span className="text-zinc-700 text-sm">&copy; Phoenix Corp.</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex justify-center items-center">
          <span className="text-zinc-700 text-sm">
            {/* Made with{" "}
            <img src="../../public/heart.svg" alt="love" /> by
            Phoenix Corp. */}
            Made love by Phoenix Corp.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
