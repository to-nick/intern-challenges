"use client";

import CSSIcon from '@/assets/icons/css-3.svg';
import HTMLIcon from '@/assets/icons/html-5.svg';
import JavascriptIcon from '@/assets/icons/javascript.svg';
import TypescriptIcon from '@/assets/icons/typescript.svg';
import ReactIcon from '@/assets/icons/react.svg';
import NodeIcon from '@/assets/icons/nodejs.svg';
import NestIcon from '@/assets/icons/nestjs-icon.svg';
import MySQLIcon from '@/assets/icons/mysql.svg';
import ExpressIcon from '@/assets/icons/express.svg';
import KnexIcon from '@/assets/icons/knex.svg';
import VSCodeIcon from '@/assets/icons/vs-code-svgrepo-com.svg';
import GithubIcon from '@/assets/icons/github-color-svgrepo-com.svg';
import InsomniaIcon from '@/assets/icons/insomnia-svgrepo-com.svg';
import DockerIcon from '@/assets/icons/docker-svgrepo-com.svg';

export default function About() {

  interface Icons {
    name: string;
    imageLink: string;
    alt: string;
  }

  const iconList: Icons[] = [
    { name: "css",
      imageLink: CSSIcon.src,
      alt: "CSS Logo"
    },
    { name: "HTML",
      imageLink: HTMLIcon.src,
      alt: "HTML Logo"
    }, 
    {
      name: "Javascript",
      imageLink: JavascriptIcon.src,
      alt: "Javascript Logo"
    },
    { name: "Typescript",
      imageLink: TypescriptIcon.src,
      alt: "Typescript Logo"
    },
    { name: "React",
      imageLink: ReactIcon.src,
      alt: "React Logo"
    }, 
    {
      name: "NodeJS",
      imageLink: NodeIcon.src,
      alt: "NodeJS Logo"
    },
    { name: "NestJS",
      imageLink: NestIcon.src,
      alt: "NestJS Logo"
    },
    { name: "MySQL",
      imageLink: MySQLIcon.src,
      alt: "MySQL Logo"
    }, 
    {
      name: "Express",
      imageLink: ExpressIcon.src,
      alt: "Express Logo"
    },
    { name: "Knex",
      imageLink: KnexIcon.src,
      alt: "Knex Logo"
    },
    { name: "VS Code",
      imageLink: VSCodeIcon.src,
      alt: "VS Code Logo"
    }, 
    {
      name: "GitHub",
      imageLink: GithubIcon.src,
      alt: "GitHub Logo"
    },
    { name: "Insomnia",
      imageLink: InsomniaIcon.src,
      alt: "Insomnia Logo"
    },
    { name: "Docker",
      imageLink: DockerIcon.src,
      alt: "Docker Logo"
    }, 

  ]
  

    return (
      <main className="min-h-screen flex bg-gradient-to-br dark:from-black dark:via-gray-700 dark:to-gray-500 from-white via-gray-200 to-gray-500 transition-all duration-300 ">
        <div className="flex flex-col ml-10 mr-10">
        <div className="ml-auto p-4">
        </div>
         
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <div className="prose prose-lg ">
            <h1 className='dark:text-gray-200 text-[clamp(2rem,4vw,3rem)]'>About Me</h1>
            <p className="dark:text-gray-200 text-[clamp(0.75rem,3vw,1.25rem)]">
                From Higher Education, to management, to film and television, I have worn many hats in my professional career but during a career transition I found my passion for full-stack development and have worked tirelessly to build a skill set that can be a valuable asset to businesses and online ventures.
                Since graduating from Queensland University of Technology with a Post Graduate Certificate of Web Development, I have dedicated my time to gaining a solid understanding of full stack development with Javascript, Typescript, HTML and CSS. 
                Leveraging these languages with the likes of React on the frontend and Node.js, Nest.js and Express in the backend, I can create intuitive and user focused web apps for a range of purposes.
            </p>  
          </div>
        </div>
        <h2 className='self-center dark:text-gray-200 text-[clamp(1.5rem,3vw,2rem)]'>The Stack</h2>
        <div className="flex gap-2 justify-center flex-wrap bg-blue-50 dark:bg-gray-200 m-4 border rounded-xl border-black">
          {iconList.map((icon) => 
          <div className="flex p-2 flex-col justify-center items-center gap-3"
                                        key={icon.name}>
            <div className="h-25 w-20 p-2 flex justfy-center items-center" >
              <img src={icon.imageLink} />
            </div> 
            <p className="dark:bg-gray-500 dark:text-white p-2 rounded-md">{icon.name}</p>
          </div> )}
          
        </div>
        </div>
        
      </main>
    );
  }