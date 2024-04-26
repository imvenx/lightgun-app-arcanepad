
export type LightgunApp = { name: string, title: string, description: string, video?: string }

export const apps: LightgunApp[] = [
  {
    name: 'Tutorial',
    title: 'Tutorial',
    description: 'Learn how to calibrate your light-gun',
  },
  {
    name: 'HouseOfTheBread',
    title: 'House of the Bread',
    description: 'Support the developer by visiting https://theprinceofmars.itch.io/the-house-of-the-bread. This game is independently developed and is not affiliated with Arcanepad.',
    video: 'HouseOfTheBread.mp4'
  },
  {
    name: 'RushdownRivalsReloaded',
    title: 'Rushdown Rivals Reloaded',
    description: 'Support the developer by visiting https://spagato.itch.io/rushdown-reloaded. This game is independently developed and is not affiliated with Arcanepad.',
    video: 'Rushdown.mp4'
  },
]
