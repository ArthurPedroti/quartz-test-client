import { Character } from 'graphql/generated/graphql'
import Image from 'next/image'

export type AvatarProps = Pick<Character, 'name' | 'image'>

const placeholderImage =
  'https://rickandmortyapi.com/api/character/avatar/19.jpeg'

const placeholderName = 'Rick and Morty Character'

const Avatar = ({ name, image }: AvatarProps) => (
  <div>
    <Image
      src={image || placeholderImage}
      width={300}
      height={300}
      alt={name || placeholderName}
    />
    <h2>{name || placeholderName}</h2>
  </div>
)

export default Avatar
