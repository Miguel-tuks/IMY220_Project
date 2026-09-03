import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

function SplashPage() {
  return (
    <main>
      <h1>Grail</h1>
      <SignInForm />
      <SignUpForm />
    </main>
  );
}

export default SplashPage;