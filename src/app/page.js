import Link from "next/link"

export default function Home() {
  return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 mb-12">
          <div className="numberBox">
            <span>4</span>
          </div>
          <h1 className="text-6xl font-black text-white">
            Images
          </h1>
          <div className="numberBox">
            <span>1</span>
          </div>
          <h1 className="text-6xl font-black text-white">
            Word
          </h1>
        </div>
        <Link href='/game'>
          <button className="buttonStart">
            <span>Play now</span><i></i>
          </button>
        </Link>
        <p className="absolute bottom-4 right-4 text-white">
          Created by Jatsuking Entertainment @ All rights reserved
        </p>
      </div>
  )
}
