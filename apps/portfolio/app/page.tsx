"use client";
import Link from "next/link";
import HeroImage from '@/assets/images/hero-image.png';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ui/theme-toggle";


export default function Home() {
  const router = useRouter();

  function handleLink(){
    router.push('/about')
  }

  return (
    <main className="\flex flex-col bg-gradient-to-br  dark:bg-black gray-200 transition-all duration-300 py-20">
      <div className="flex flex-col h-full p-8 gap-4">
        <div className="flex flex-col gap-6 md:flex-row ">
          <div className='flex justify-center md:w-1/2'>
            <img className='h-auto w-8/10' 
                src={HeroImage.src}></img>
          </div>
          <div className="flex text-center md:w-1/2 items-center">
            <h1 className="text-[clamp(1.5rem,3vw,7rem)] text-secondary md:border-8 rounded-xl border-black dark:border-white p-5">Hi, I'm Nick! A budding software engineer based in Melbourne, Australia.</h1>
          </div>
        </div>
        <div className="border-4 border-white rounded-lg">
          <p className='p-4 text-center dark:text-gray-300 text-black-400 text-[clamp(0.75rem,3vw,1.25rem)]'>
          From frontend to backend, I am passionate about building intuitive and aesthetically pleasing web pages for a variety of purposes. 
          Driven by continuous development and a natural curiosity for problem-solving, let me show you what I can bring to your business or venture.
          </p>
        </div>
        <div className="flex flex-col h-200 gap-6 text-white">
          <div className="h-1/3 relative rounded-xl contain-content">
            <Link href="./about">
              <h2 className="absolute bottom-4 right-4 text-[clamp(1.5rem,3vw,7rem)] font-bold  dark:bg-black bg-white rounded-lg p-2 dark:text-white text-black dark:border-4 dark:border-white">About</h2>
              <img src="https://res.cloudinary.com/dfgnpoymx/image/upload/v1760430088/pexels-luis-gomes-166706-546819_eaafkt.jpg" 
                  alt="" 
                  className="h-full w-full object-cover"/>
            </Link>
          </div>
          <div className="h-1/3 relative text-white rounded-xl contain-content">
            <Link href="./blog">
              <h2 className="absolute bottom-4 right-4 text-[clamp(1.5rem,3vw,7rem)] font-bold dark:bg-black bg-white rounded-lg p-2 dark:text-white text-black dark:border-4 dark:border-white">Blog</h2>
              <img src="https://res.cloudinary.com/dfgnpoymx/image/upload/v1760430365/aaron-burden-y02jEX_B0O0-unsplash_znaxax.jpg" 
                alt="" 
                className="h-full w-full object-cover"/>
            </Link>
          </div>
          
          <div className="h-1/3 relative text-white rounded-xl contain-content">
            <Link href='./projects'>
              <h2 className="absolute bottom-4 right-4 text-[clamp(1.5rem,3vw,7rem)] font-bold dark:bg-black bg-white rounded-lg p-2 dark:text-white text-black dark:border-4  dark:border-white">Projects</h2>
              <img src="https://res.cloudinary.com/dfgnpoymx/image/upload/v1760429345/rt-grips-image_ms1eko.png"
                  alt=""
                  className="h-full w-full object-cover object-top"/>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
