import { useState } from 'react';
import Logo from '../components/Logo';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const frames = [
  { number: '01A', colours: 'from-edge to-wash/70' },
  { number: '02', colours: 'from-ink to-wash' },
  { number: '03A', colours: 'from-surface to-safelight' },
  { number: '04', colours: 'from-edge to-paper/40' },
  { number: '05A', colours: 'from-surface to-paper/60' }
];

function SplashPage({ onLogin }) {
  const [mode, setMode] = useState('signup');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-edge">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <Logo />
          <div className="flex items-center gap-5 text-sm">
            <button className="cursor-pointer hover:text-wash" onClick={() => setMode('login')}>Log in</button>
            <button className="btn" onClick={() => setMode('signup')}>Create account</button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-12 md:grid-cols-[1fr_420px]">
        <section>
          <p className="meta">35mm · 120 · Instant · Digital</p>
          <h1 className="mt-6 text-6xl leading-none md:text-8xl">
            Post the whole roll. <span className="text-safelight">Not just</span> the keeper.
          </h1>
          <p className="mt-6 max-w-md text-lg text-paper/80">
            Grain is where photographers share complete rolls — the frames that worked, the ones that didn't, and the story between them.
          </p>
        </section>

        <section className="card">
          <div className="flex">
            <button className={mode === 'signup' ? 'tab tab-active' : 'tab'} onClick={() => setMode('signup')}>Create account</button>
            <button className={mode === 'login' ? 'tab tab-active' : 'tab'} onClick={() => setMode('login')}>Log in</button>
          </div>
          {mode === 'signup' ? <SignUpForm onLogin={onLogin} /> : <SignInForm onLogin={onLogin} />}
          <p className="mt-4 text-center text-sm text-paper/60">
            {mode === 'signup' ? 'Already have an account? ' : 'New to Grain? '}
            <button className="link" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
              {mode === 'signup' ? 'Log in instead' : 'Create an account'}
            </button>
          </p>
        </section>
      </main>

      <div className="border-y border-edge bg-ink">
        <div className="sprockets" />
        <div className="grid grid-cols-5 gap-2 px-2">
          {frames.map((frame) => (
            <div key={frame.number} className={'relative h-24 rounded-sm bg-linear-to-br md:h-32 ' + frame.colours}>
              <span className="absolute bottom-1 left-2 font-mono text-[10px] text-paper">{frame.number}</span>
            </div>
          ))}
        </div>
        <div className="sprockets" />
      </div>

      <footer className="meta mx-auto flex w-full max-w-6xl justify-between px-4 py-5">
        <span>Grain © 2026</span>
        <span>Built for IMY 220</span>
      </footer>
    </div>
  );
}

export default SplashPage;
