import Link from 'next/link'
import Story from './story'

const CommunityStories = ({ stories, id }) => {
  return (
    <div className="mt-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary text-center my-2">
        Community Stories
      </h1>
      <Link href={`/submit?id=${id}`}>
        <button className="btn btn-lg">Share Your Story</button>
      </Link>

      {stories.map((story, index) => {
        return <Story story={story} key={`indivStory${index}`} />
      })}
    </div>
  )
}

export default CommunityStories
