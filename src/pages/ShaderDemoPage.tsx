import { ShaderViolin } from '../components/ui/ShaderViolin';

/**
 * Temporary demo route at /shader-demo. Not linked from the nav.
 * Delete this file and its route in App.tsx when you're done with it.
 */
export function ShaderDemoPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center gap-6 px-6">
      <div className="w-full max-w-2xl h-[70vh]">
        <ShaderViolin />
      </div>
      <p className="text-sm text-gray-400 font-mono text-center">
        custom GLSL ShaderMaterial — hand-written diffuse lighting + animated sweep
      </p>
    </main>
  );
}
