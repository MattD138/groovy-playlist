import Head from "next/head"
import GroovyApp from "../components/App/GroovyApp"

export default function Home() {
  return (
    <>
      <Head>
        <title>Groovy Playlist</title>
        <meta name="description" content="Create groovy new Spotify playlists" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GroovyApp />
    </>
  )
}
