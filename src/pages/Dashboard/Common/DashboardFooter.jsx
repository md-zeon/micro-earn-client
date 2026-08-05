const DashBoardFooter = () => {
  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 py-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gradient">MicroEarn</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Built by</span>
            <a
              href="https://zeon-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gradient transition-opacity hover:opacity-80"
            >
              Zeanur Rahaman Zeon
            </a>
            <span className="hidden sm:inline">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashBoardFooter;
