import Link from 'next/link'
import React from 'react'

const TourCards = ({}) => {
  const tourInfo = [
    {
      container: {
        backgroundImage: `url(/assets/artWalk.jpeg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px',
        borderRadius: '20px',
      },
      name: 'Art Walk',
      description:
        'Discover the public art of Wailuku through murals, installations, and interactive art.',
      link: '/map?type=Art',
    },
    {
      container: {
        backgroundImage: `url(/assets/historyWalk.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px',
        borderRadius: '20px',
      },
      name: 'History Walk',
      description:
        'Explore the history of Wailuku and add your own stories about the town!',
      link: '/map?type=History',
    },
    {
      container: {
        backgroundImage: `url(/assets/cultureWalk.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px',
        borderRadius: '20px',
      },
      name: 'Culture Walk',
      description:
        'Lean about the rich culture of Wailuku and the influences that make this town so unique.',
      link: '/map?type=Culture',
    },
  ]

  return (
    <>
      {tourInfo.map((tour, index) => (
        <Link href={tour.link} key={`tourCard${index}`}>
          <div className="mb-5 cursor-pointer">
            <div style={tour.container}></div>
            <h2 className="text-2xl font-semibold mt-3">{tour.name}</h2>
            <p className="font-light">{tour.description}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export default TourCards
