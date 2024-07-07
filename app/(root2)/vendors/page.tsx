
const Vendors = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/your-background-image.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white p-6">
        <h1 className="text-5xl font-bold opacity-0 animate-fadeInUp">Welcome to My Website</h1>
        <p className="mt-4 text-lg opacity-0 animate-fadeInUp delay-200">Experience the best services with us</p>
        <button className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-700 transition-colors duration-300 rounded-full text-white font-semibold opacity-0 animate-fadeInUp delay-400">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Vendors