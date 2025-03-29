// Figma-style mock for Canvas AEM 2-scroll landing page
// Focused on NAB event, with TG of OVPs, OTT platforms, and backend vendors

export default function CanvasAEMLanding() {
  return (
    <div className="bg-black text-white font-sans">
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-transparent bg-clip-text mb-4">
          Stop Losing Viewers After the Play.
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Canvas AEM is a plug-and-play conditional access layer that lets OTT platforms, OVPs, and media tech vendors
          unlock engagement, capture verified user data, and monetize smarter — right inside the video experience.
        </p>

        <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
          <span className="text-lg text-gray-400">[Interactive AEM Video Demo]</span>
        </div>
        <p className="text-sm text-gray-400 mb-8">
          Experience how Canvas AEM turns passive plays into active conversions.
        </p>

        <button className="bg-gradient-to-r from-orange-400 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-medium shadow-lg">
          Unlock Full Experience
        </button>
      </section>

      <section className="bg-gradient-to-br from-zinc-900 to-black px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Built for Modern Media Workflows
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-orange-300">For OVPs & Backend Platforms</h3>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li>Add Canvas AEM as a layer on top of your player stack</li>
              <li>Offer first-party engagement tools to your customers</li>
              <li>Plug into your existing APIs — REST, GraphQL, etc.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">For OTT & SVOD/AVOD Platforms</h3>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li>Capture viewer data post-play without disrupting UX</li>
              <li>Unlock access to premium content, episodes, or offers</li>
              <li>Drive retention and monetization with intent-based triggers</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h4 className="text-xl font-semibold mb-4">Deployment Options</h4>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-zinc-800 p-6 rounded-xl w-64">
              <h5 className="text-lg font-medium mb-2">☁️ On Cloud</h5>
              <p className="text-sm text-gray-400">Ready-to-integrate via REST APIs</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-xl w-64">
              <h5 className="text-lg font-medium mb-2">🏢 On Prem</h5>
              <p className="text-sm text-gray-400">Full control with custom integration options</p>
            </div>
          </div>

          <button className="mt-10 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-medium shadow-lg">
            Enquire Now
          </button>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        ©2024 Canvas Space Inc. | hello@canvas.space | Terms & Privacy
      </footer>
    </div>
  );
}
