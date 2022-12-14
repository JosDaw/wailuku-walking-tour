import Head from 'next/head'
import TourCards from '../components/tourCards'
import pickYourTour from '../public/assets/pickYourTour.svg'
import shareYourStory from '../public/assets/shareYourStory.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const heroBanner = {
    container: {
      backgroundImage: `url(/assets/discoverMural.svg)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '17rem',
    },
  }

  return (
    <div className="px-4 py-4">
      <Head>
        <title>Wailuku Walking Tour</title>
        <meta name="description" content="Discover the history, art, and culture or share your own stories about the community." />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>

      <div className="min-h-full flex flex-col">
        <div style={heroBanner.container}></div>
        <h1 className="text-3xl text-primary font-bold mt-3">
          Remember your roots, explore Wailuku town
        </h1>
        <p className="font-light mt-2">
          Discover the history, art, and culture or share your own stories about
          the community.
        </p>
        <Link href="/map">
          <button className="btn btn-neutral mt-4">Get Started</button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl text-primary font-bold mt-6 mb-3">
          How it Works
        </h1>
        <div>
          <div>
            <Image src={pickYourTour} height="300" alt="" />
          </div>
          <h2 className="text-2xl font-semibold">Pick your Tour</h2>
          <p className="font-light">
            Choose a tour of Wailuku’s public art, history, culture, or mix and
            match!
          </p>
        </div>
        <div className="mt-4">
          <div>
            <Image src={shareYourStory} height="300" alt="" />
          </div>
          <h2 className="text-2xl font-semibold">Share your Story</h2>
          <p className="font-light">
            Share your own story or history of the area and help build a
            community led story of Wailuku.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl text-primary font-bold mb-3">Wailuku Walks</h1>
        <div>
          <TourCards />
        </div>
      </div>
    </div>
  )
}
