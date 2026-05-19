import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Page Not Found — Eden Music Academy</title>
      </Helmet>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <p className="text-7xl font-display font-bold text-primary/20">404</p>
          <h1 className="text-3xl font-display font-bold text-charcoal">Page not found</h1>
          <p className="text-charcoal/60 leading-relaxed">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary/20 text-charcoal font-semibold text-sm hover:border-primary/40 transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
