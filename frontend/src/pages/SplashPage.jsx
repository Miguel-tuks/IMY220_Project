import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

function SplashPage({ onLogin }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-bold">Grail</h1>
        <p className="mt-3 text-lg text-muted">Share your photos, build albums and follow your friends.</p>
      </div>
      <div className="grid items-start gap-6 md:grid-cols-2">
        <SignInForm onLogin={onLogin} />
        <SignUpForm onLogin={onLogin} />
      </div>
    </main>
  );
}

export default SplashPage;
