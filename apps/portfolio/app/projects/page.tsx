import ThemeToggle from "@/components/ui/theme-toggle";
import GWQImage from "@/assets/images/gwq-image.png";
import TopTenImage from "@/assets/images/top-ten-image.png";
import RTGripsImage from"@/assets/images/rt-grips-image.png";

import CSSIcon from "@/assets/icons/mini icons/icons8-css.svg";
import ExpressIcon from "@/assets/icons/mini icons/icons8-express-js.svg";
import GitHubIcon from "@/assets/icons/mini icons/icons8-github.svg";
import HTMLIcon from "@/assets/icons/mini icons/icons8-html.svg";
import JavascriptIcon from "@/assets/icons/mini icons/icons8-javascript.svg";
import MySQLIcon from "@/assets/icons/mini icons/icons8-mysql.svg";
import NodeIcon from "@/assets/icons/mini icons/icons8-node-js.svg";
import ReactIcon from "@/assets/icons/mini icons/icons8-react-native (1).svg";
import KnexIcon from "@/assets/icons/mini icons/knex-svgrepo-com.svg";
import NestIcon from "@/assets/icons/mini icons/nestjs-svgrepo-com.svg";
import TypeScriptIcon from "@/assets/icons/mini icons/typescript-16-svgrepo-com.svg";


export default function Projects(){
    
    interface Icons {
        name: string;
        imageLink: string;
        alt: string;
      }

    const GWQIconList: Icons [] =[
          { name: "CSS",
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
            imageLink: TypeScriptIcon.src,
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
    ]

    const TopTenIconList: Icons [] =[
        { name: "CSS",
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
        { name: "React",
          imageLink: ReactIcon.src,
          alt: "React Logo"
        }, 
        {
          name: "NodeJS",
          imageLink: NodeIcon.src,
          alt: "NodeJS Logo"
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
  ]

  const RTGripsIconList: Icons [] =[
        { name: "CSS",
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
        }
    ]

return(
    <main className="min-h-screen min-w-screen flex flex-col bg-gradient-to-br dark:bg-black  bg-white transition-all duration-300 py-30">
        <div className="flex flex-col ml-3 mr-3 md:ml-10 md:mr-10 gap-10">
            <h1 className='dark:text-gray-200 text-[clamp(2rem,4vw,3rem)]'>Projects</h1>
            <div className="flex flex-col lg:flex-row gap-10 border-4 border-black dark:border-gray-200 rounded-xl p-4">
                <div className="relative w-full h-[10%] lg:w-1/3 rounded-md overflow-hidden z-index-10 bg-gradient-to-t from-black to-transparent">
                    <img className="h-50 w-full object-cover object-top lg:h-full lg:w-full" src={GWQImage.src} alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none lg:hidden"></div>
                </div>
                <article className="w-full lg:w-2/3 flex flex-col gap-4 items-center justify-center">
                    <p>The Good Weekend quiz has long been used as a competitive measuring stick of general knowledge intelligence. 
                        However, until now, competitors have never had a platform to compare their scores with peers, join competing leagues and access metrics on their performance.
                        The Good Weekend Quiz Leaderboard is a React-based app which uses Node.Js with Express and Nest.js in the backend to access a MySQL database, containing user scores and data.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {GWQIconList.map((icon)=> 
                        <div className="flex items-center gap-4 dark:bg-white dark:text-black rounded-md p-2">
                            <p className="text-sm md:text-base">{icon.name}</p>
                            <img src={icon.imageLink}
                                alt={icon.alt}
                                className="h-4 w-4"/>
                        </div>)}
                    </div>
                </article>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 border-4 border-black dark:border-gray-200 rounded-xl p-4">
            <div className="relative w-full h-[10%] lg:w-1/3 rounded-md overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none lg:hidden"></div>
                    <img className="h-50 w-full object-cover object-top lg:h-full lg:w-full" src={TopTenImage.src} alt="" />
                </div>
                <article className=" w-full lg:w-2/3 flex flex-col gap-4 items-center justify-center">
                    <p>The product of many long road trips with friends during my college years, The Top 10 Game was developed and re-invented with a React frontend and a Node.js backend, leveraged with Express and Knex to query a MySQL database. 
                        Players are tasked with correctly guessing a list of 10 items based on the provided question.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {TopTenIconList.map((icon)=> 
                        <div className="flex items-center gap-4 dark:bg-white dark:text-black rounded-md p-2">
                            <p className="text-sm md:text-base">{icon.name}</p>
                            <img src={icon.imageLink}
                                alt={icon.alt}
                                className="h-4 w-4"/>
                        </div>)}
                    </div>
                </article>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 border-4 border-black dark:border-gray-200 rounded-xl p-4">
                <div className="relative w-full h-[10%] lg:w-1/3 rounded-md overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none lg:hidden"></div>
                    <img className="h-50 w-full object-cover object-top lg:h-full lg:w-full" src={RTGripsImage.src} alt="" />
                </div>
                <article className="w-full lg:w-2/3 flex flex-col gap-4 items-center justify-center">
                    <p>With a previous career in Film and Television, I had the opportunity to build a website for a former employer who works as a Key Grip. 
                        Built with HTML, CSS and some very minor Javascript, the page is used to promote the business's services to production companies and cinematographers around the world.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {RTGripsIconList.map((icon)=> 
                        <div className="flex items-center gap-4 dark:bg-white dark:text-black rounded-md p-2">
                            <p className="text-sm md:text-base">{icon.name}</p>
                            <img src={icon.imageLink}
                                alt={icon.alt}
                                className="h-4 w-4"/>
                        </div>)}
                    </div>
                </article>
            </div>
        </div>
        
    </main>
)
}