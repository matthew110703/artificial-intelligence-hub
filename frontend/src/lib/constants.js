export const FEATURES = [
  {
    name: "Imagen AI",
    headline: "Create stunning visuals in seconds.",
    textContent: `Unlock your creativity with the ultimate solution for generating
            high-quality, custom visuals in just a few clicks.
            <br /><br />
            Whether you're a
            <span className="dark:text-primary font-semibold">designer</span>,
            <span className="dark:text-primary font-semibold"> marketer</span>,
            or<span className="dark:text-primary font-semibold">
              content creator
            </span>, our AI-powered tool makes it easy to bring your ideas to life
            without the need for complex software or design skills.`,
    tagline:
      "Your Imagination, Our AI – Let’s Create Something Amazing Together!",
    ctaLink: "/imagen",
  },
  {
    name: "Vocalize AI",
    headline: "Turn Text into Natural-Sounding Speech.",
    textContent: ` Say goodbye to robotic voices and hello to seamless, human-like
            audio with <span className="dark:text-primary font-semibold">ElevenLabs</span>
            Multilingual Speech Synthesizer Model.
            <br />
            <br />
            Whether you're creating
            <span className="dark:text-primary font-semibold">podcasts</span>,
            <span className="dark:text-primary font-semibold"> videos</span>,
            <span className="dark:text-primary font-semibold">e-learning content</span>, 
            or
            <span className="dark:text-primary font-semibold">voiceovers</span>,
            our AI-powered tool transforms written text into clear, natural, and
            engaging speech in just a few clicks.`,
    tagline: "Sign up now and experience the future of voice technology!",
    ctaLink: "/vocalize",
    disableReverse: true,
  },
  {
    name: "MailBot",
    headline: "Craft the Perfect Email in Seconds.",
    textContent: `Struggling to craft the perfect email? Let MailBot which is powered
            with <span className="dark:text-primary font-semibold">Google Gemini</span>
            Flash 1.5 Model do the heavy lifting for you!.
            <br />
            <br />
            Whether you're sending a <span className="dark:text-primary font-semibold">business proposal</span>,
            <span className="dark:text-primary font-semibold"> follow-up</span>,
            <span className="dark:text-primary font-semibold">marketing campaign</span>, 
            or
            <span className="dark:text-primary font-semibold">voiceovers</span>,
            our tool helps you create clear, concise, and compelling emails in
            seconds.`,

    tagline: "Elevate Your Email Game with MailBot!",
    ctaLink: "/mailbot",
  },
];

// Purposes
import { work, personal, school } from "../assets";
export const PURPOSES = [
  {
    title: "Work",
    icon: work,
  },
  {
    title: "Personal",
    icon: personal,
  },
  {
    title: "School",
    icon: school,
  },
];

// Tools
import { sparks, info, audioWave, envelope } from "../assets";
export const TOOLS = [
  {
    title: "Imagen AI",
    icon: sparks,
    description: "Generate stunning visuals of your choice.",
    cover: "/media/imagen/3.webp",
    link: "/imagen",
  },
  {
    title: "Vocalize AI",
    icon: audioWave,
    description: "Convert text to natural-sounding speech.",
    link: "/vocalize",
  },
  {
    title: "MailBot",
    icon: envelope,
    description: "Craft the perfect email in seconds.",
    link: "/mailbot",
  },
  {
    title: "How To Use",
    icon: info,
    description: "Learn how to use the AI tools.",
  },
];

// Preview AI Images
export const PREVIEW_IMAGES = [
  {
    src: "/media/imagen/1.webp",
    prompt:
      "a highly detailed epic cinematic concept art CG render digital painting artwork costume design: young James Dean as a well-kept neat mechanic in 1950s USSR green dungarees and big boots, reading a book. By Greg Rutkowski, Ilya Kuvshinov, WLOP, Stanley Artgerm Lau, Ruan Jia and Fenghua Zhong, trending on ArtStation, subtle muted cinematic colors, made in Maya, Blender and Photoshop, octane render, excellent composition, cinematic atmosphere, dynamic dramatic cinematic lighting, aesthetic, very inspirational, arthouse",
  },
  {
    src: "/media/imagen/2.webp",
    prompt:
      "A photorealistic portrait of a young woman with vibrant, multicolored hair, intricate facial tattoos, and piercing green eyes, wearing ornate elven-inspired clothing.",
  },
  {
    src: "/media/imagen/3.webp",
    prompt:
      "Environment castle nathria in world of warcraft ::gothic style fully developed castle :cinematic, raining, night time, detailed, epic , concept art, Matte painting, shafts of lighting, mist, photorealistic, concept art, volumetric light, cinematic epic + rule of thirds, movie concept art, 8k, cinematic, trending on artstation, movie concept art, cinematic composition , ultra detailed, realistic , hyper realistic , volumetric lighting",
  },
  {
    src: "/media/imagen/4.webp",
    prompt:
      "a digital concept ar by artgerm and greg rutkowski and alphonse mucha. clear portrait of a lonely attractive men in uniform of tang dynasty!! heavy armored cavalry of the tang dynasty!! light effect. hyper detailed, character concept, full body!! dynamic pose, glowing lights!! intricate, elegant, artstation, concept art, smooth, sharp focus, illustration",
  },
  {
    src: "/media/imagen/5.webp",
    prompt:
      "Generate an image featuring celestial bodies in the vastness of space. Include planets, stars, and galaxies to create a captivating cosmic scene.",
  },
  {
    src: "/media/imagen/6.webp",
    prompt:
      "Generate an image capturing the atmosphere of a sporting event in a crowded stadium. Showcase the energy, excitement, and competition as athletes engage in their respective sports. The scene is alive with action, capturing the essence of a thrilling sporting event.",
  },
  {
    src: "/media/imagen/7.webp",
    prompt:
      "a lone skyscraper landscape vista photography by Carr Clifton & Galen Rowell, 16K resolution, Landscape veduta photo by Dustin Lefevre & tdraw, 8k resolution, detailed landscape painting by Ivan Shishkin, DeviantArt, Flickr, rendered in Enscape, Miyazaki, Nausicaa Ghibli, Breath of The Wild, 4k detailed post processing, atmospheric, hyper realistic, 8k, epic composition, cinematic, artstation –w 1024 –h 1280",
  },
  {
    src: "/media/imagen/8.webp",
    prompt:
      "Generate a surreal landscape image featuring floating islands, upside-down mountains, and unconventional flora. Include a dreamlike quality, pushing the boundaries of reality. Conjure a scene that has imaginative and otherworldly elements.",
  },
  {
    src: "/media/imagen/9.webp",
    prompt:
      "very complex hyper-maximalist overdetailed cinematic tribal fantasy closeup macro portrait of a heavenly beautiful young royal dragon queen with long platinum blonde windblown hair and dragon scale wings, Magic the gathering, pale wet skin and dark eyes and red lipstick ,flirting smiling passion seductive, vibrant high contrast, by andrei riabovitchev, tomasz alen kopera,moleksandra shchaslyva, peter mohrbacher, Omnious intricate, octane, moebius, arney freytag, Fashion photo shoot, glamorous pose, trending on ArtStation, dramatic lighting, ice, fire and smoke, orthodox symbolism Diesel punk, mist, ambient occlusion, volumetric lighting, Lord of the rings, BioShock, glamorous, emotional, tattoos,shot in the photo studio, professional studio lighting, backlit, rim lighting, Deviant-art, hyper detailed illustration, 8k",
  },
  {
    src: "/media/imagen/10.webp",
    prompt:
      "beautiful fashion elegant goddness of water, chic strapless dress, tropical sea background, character design, in the style of artgerm, and wlop, chanel jewelry, cinematic lighting, hyperdetailed, 8 k realistic, symmetrical, global illumination, radiant light, love and mercy, frostbite 3 engine, cryengine, dof, trending on artstation, digital art, crepuscular ray",
  },
  {
    src: "/media/imagen/11.webp",
    prompt:
      "Create an anime scene of a neon-clad samurai engaged in a fierce battle with futuristic, cybernetic dragons amidst a neon-lit Japanese landscape",
  },
  {
    src: "/media/imagen/12.webp",
    prompt:
      "Create a busy metropolis city with large skyscrapers shining in warm hues of orange and pink as the sun sets. Make it futuristic as well",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/matthew110703/",
    icon: "/social/linkedin.svg",
  },
  {
    name: "GitHub",
    url: "https://github.com/matthew110703",
    icon: "/social/github.svg",
  },
  { name: "Twitter", url: "https://www.x.com/", icon: "/social/twitter.svg" },
];
