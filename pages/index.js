import Head from "next/head";
import TourCards from "../components/tourCards";
import pickYourTour from "../public/assets/pickYourTour.svg";
import shareYourStory from "../public/assets/shareYourStory.svg";
import Image from "next/image";

export default function Home() {
  const heroBanner = {
    container: {
      backgroundImage: `url(/assets/discoverMural.svg)`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "500px",
      height: "300px",
    },
  };

  return (
    <div className="px-5 py-5">
      <Head>
        <title>Wailuku Walking Tour</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center">
        <div style={heroBanner.container}></div>
        <h1 className="text-3xl text-primary font-bold mt-3">
          Remember your roots, explore Wailuku town
        </h1>
        <p className="font-light mt-2">
          Discover the history, art, and culture or share your own stories about
          the community.
        </p>
        <button className="btn btn-info mt-3">Get Started</button>
      </div>

      <div>
        <h1 className="text-3xl text-primary font-bold mt-5">How it Works</h1>
        <div>
          <div className="">
            <Image src={pickYourTour} height="300" alt="" />
          </div>
          <h2 className="text-2xl font-semibold">Pick your Tour</h2>
          <p className="font-light">
            Share your own story or history of the area and help build a
            community led story of Wailuku.
          </p>
        </div>
        <div className="mt-4">
          <div className="">
            <Image src={shareYourStory} height="300" alt="" />
          </div>
          <h2 className="text-2xl font-semibold">Share your Story</h2>
          <p className="font-light">
            Share your own story or history of the area and help build a
            community led story of Wailuku.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-3xl text-primary font-bold">Wailuku Walks</h1>
        <div>
          <TourCards />
        </div>
      </div>
    </div>
  );
}
