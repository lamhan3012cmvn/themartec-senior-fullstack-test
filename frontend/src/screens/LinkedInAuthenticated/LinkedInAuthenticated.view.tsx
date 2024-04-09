import useLinkedInAuthenticated from './LinkedInAuthenticated.hook'

type Props = {}

const LinkedInAuthenticated = (props: Props) => {
  useLinkedInAuthenticated()
  return (
    <div>LinkedInAuthenticated</div>
  )
}

export default LinkedInAuthenticated