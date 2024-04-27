
export type LightgunApp = { name: string, title: string, description: string, video?: string }

export const apps: LightgunApp[] = [
  {
    name: 'Tutorial',
    title: 'Tutorial',
    description: 'Learn how to calibrate your light-gun',
  },
  {
    name: 'MetroCop',
    title: 'Metro Cop',
    description: 'This game is independently developed and is not affiliated with Arcanepad. Support the developer by visiting helpcomputer.itch.io/metro-cop.',
  },
  {
    name: 'RushdownRivalsReloaded',
    title: 'Rushdown Rivals Reloaded',
    description: 'This game is independently developed and is not affiliated with Arcanepad. Support the developer by visiting spagato.itch.io/rushdown-reloaded.',
    video: 'Rushdown.mp4'
  },
  {
    name: 'HouseOfTheBread',
    title: 'House of the Bread',
    description: 'This game is independently developed and is not affiliated with Arcanepad. Support the developer by visiting theprinceofmars.itch.io/the-house-of-the-bread.',
    video: 'HouseOfTheBread.mp4'
  },
]
