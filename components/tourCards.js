import React from 'react'

const TourCards = ({}) => {
  const tourInfo = [
    {
      image: '',
      name: 'Art Walk',
      description:
        'Discover the public art of Wailuku through murals, installations, and interactive art.',
      link: '',
    },
    {
      image: '',
      name: 'History Walk',
      description:
        'Explore the history of Wailuku and add your own stories about the town!',
      link: '',
    },
    {
      image: '',
      name: 'Culture Walk',
      description:
        'Lean about the rich culture of Wailuku and the influences that make this town so unique.',
      link: '',
    },
  ]

  return (
    <>
      {tourInfo.map((tour, index) => (
        <div className="mb-3" key={`tourCard${index}`}>
          <div>{tour.image}</div>
          <h2 className="text-2xl font-semibold">{tour.name}</h2>
          <p className="font-light">{tour.description}</p>
        </div>
      ))}
    </>
  )
}

export default TourCards
