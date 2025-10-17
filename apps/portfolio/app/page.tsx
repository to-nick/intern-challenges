import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-700 to-gray-500 flex">
      <div className="flex flex-col h-full p-8 gap-4">
        <div className="flex flex-col gap-6 ">
          <div className='flex justify-center'>
            <img className='h-auto w-8/10' src='https://res.cloudinary.com/dfgnpoymx/image/upload/v1760340859/IMG_1073-4_l6efjo.png'></img>
          </div>
          <div className="max-h-full flex text-center">
            <h1 className="text-[clamp(1.5rem,3vw,7rem)] text-secondary">Hi, I'm Nick! A budding software engineer based in Melbourne, Australia.</h1>
          </div>
        </div>
        <div className="border-4 border-white rounded-lg">
          <p className='p-4 text-center'>
          From frontend to backend, I am passionate about building intuitive and aesthetically pleasing web pages for a variety of purposes. 
          Driven by continuous development and a natural curiosity for problem-solving, let me show you what I can bring to your business or venture.
          </p>
        </div>
        <div className="flex flex-col h-200 gap-6">
          <div className="h-1/3 relative">
            <h2 className="absolute bottom-4 right-4 text-[clamp(1.5rem,3vw,7rem)] font-bold  ">About</h2>
            <img src="https://res.cloudinary.com/dfgnpoymx/image/upload/v1760430088/pexels-luis-gomes-166706-546819_eaafkt.jpg" 
                  alt="" 
                  className="h-full w-full object-cover"/>
          </div>
          <div className="h-1/3 relative">
            <h2 className="absolute bottom-4 right-4 text-[clamp(1.5rem,3vw,7rem)] font-bold">Blog</h2>
            <img src="https://res.cloudinary.com/dfgnpoymx/image/upload/v1760430365/aaron-burden-y02jEX_B0O0-unsplash_znaxax.jpg" 
                  alt="" 
                  className="h-full w-full object-cover"/>
          </div>
          <div className="h-1/3 relative">
            <h2 className="absolute bottom-4 right-4 text-[clamp(1.5rem,3vw,7rem)] font-bold">Projects</h2>
            <img src="https://res.cloudinary.com/dfgnpoymx/image/upload/v1760429345/rt-grips-image_ms1eko.png"
                   alt=""
                   className="h-full w-full object-cover"/>
          </div>
        </div>
      </div>
    </main>
  );
}
