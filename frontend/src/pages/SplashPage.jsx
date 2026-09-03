import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

function SplashPage() {
  return (
    <main>
      <h1>PixelShare</h1>
      <SignInForm />
      <SignUpForm />
    </main>
  );
}

export default SplashPage;