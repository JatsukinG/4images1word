'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { FaArrowCircleLeft } from "react-icons/fa"

const levels = [
  {
    word: ['R', 'A', 'T', 'O', 'N'],
    images: ['/images/RATON/RATON1.jpg', '/images/RATON/RATON2.jpg', '/images/RATON/RATON3.jpg', '/images/RATON/RATON4.jpg'],
    letters: ['A', 'R', 'W', 'T', 'L', 'S', 'F', 'E', 'T', 'G', 'O', 'D', 'N', 'I']
  },
  {
    word: ['F', 'R', 'E', 'S', 'A'],
    images: ['/images/FRESA/FRESA1.jpg', '/images/FRESA/FRESA2.jpg', '/images/FRESA/FRESA3.jpg', '/images/FRESA/FRESA4.jpg'],
    letters: ['F', 'R', 'G', 'T', 'L', 'S', 'A', 'E', 'T', 'G', 'O', 'Y', 'K', 'I']
  },
  {
    word: ['G', 'A', 'Y'],
    images: ['/images/GAY/GAY1.jpg', '/images/GAY/GAY2.jpg', '/images/GAY/GAY3.jpg', '/images/GAY/GAY4.jpg'],
    letters: ['F', 'R', 'G', 'T', 'L', 'S', 'A', 'E', 'T', 'G', 'O', 'Y', 'K', 'I']
  },
  {
    word: ['F', 'R', 'A', 'G', 'I', 'L'],
    images: ['/images/FRAGIL/FRAGIL1.jpeg', '/images/FRAGIL/FRAGIL2.jpg', '/images/FRAGIL/FRAGIL3.jpg', '/images/FRAGIL/FRAGIL4.jpg'],
    letters: ['U', 'R', 'G', 'T', 'F', 'S', 'A', 'L', 'T', 'G', 'O', 'Y', 'K', 'I']
  },
  {
    word: ['P', 'E', 'R', 'R', 'O'],
    images: ['/images/PERRO/PERRO1.jpg', '/images/PERRO/PERRO2.jpg', '/images/PERRO/PERRO3.png', '/images/PERRO/PERRO4.jpg'],
    letters: ['P', 'R', 'G', 'T', 'E', 'S', 'A', 'L', 'R', 'G', 'O', 'Y', 'K', 'I']
  },
  {
    word: ['P', 'I', 'N', 'G', 'A'],
    images: ['/images/PINGA/PINGA1.jpeg', '/images/PINGA/PINGA2.png', '/images/PINGA/PINGA3.jpeg', '/images/PINGA/PINGA4.jpeg'],
    letters: ['P', 'R', 'G', 'T', 'E', 'S', 'A', 'L', 'N', 'G', 'O', 'Y', 'K', 'I']
  },
]

const Game = () => {
  const [level, setLevel] = useState(0)
  const [word, setWord] = useState([])
  const [isWinner, setIsWinner] = useState(false)
  const [lettersSelected, setLettersSelected] = useState([])
  const [invalidWord, setInvalidWord] = useState(false)

  useEffect(() => {
    if (!word.includes("*")) {
      const isEqual = JSON.stringify(word) === JSON.stringify(levels[level].word)
      if (isEqual) {
        setIsWinner(true)
      } else {
        setInvalidWord(true)
        setIsWinner(false)
      }
    } else {
      setInvalidWord(false)
    }
  }, [word])

  useEffect(() => {
    const newWord = levels[level].word.map(letter => '*')
    setWord(newWord)
    setLettersSelected([])
  }, [level])

  const onClickLetter = (letter, i) => {
    let newWord = [...word]
    if (newWord.indexOf('*') === -1) return
    newWord[newWord.indexOf('*')] = letter
    setWord(newWord)

    let newLettersSelected = [...lettersSelected]
    newLettersSelected.push(i)
    setLettersSelected(newLettersSelected)
  }

  const onClickLetterInWord = (n, i) => {
    let newWord = [...word]
    newWord[i] = "*"
    setWord(newWord)

    if (n !== "*") {
      let newLettersSelected = [...lettersSelected]
      let isFounded = false
      lettersSelected.map((letterIndex, index) => {
        if (levels[level].letters[letterIndex] === n && !isFounded) {
          newLettersSelected.splice(index, 1)
          isFounded = true
        }
      })
      setLettersSelected(newLettersSelected)
    }
  }

  return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex">
          <div className="imagesContainer w-[500px] h-[500px] bg-white flex flex-wrap justify-around items-center">
            {
              levels[level].images.map((img, i) => (
                  <div key={i} className="w-[200px] h-[200px] rounded-md overflow-hidden">
                    <Image src={img} alt={img} width={200} height={200}/>
                  </div>
              ))
            }
          </div>
          <div className="grid grid-cols-2 gap-2 ml-4">
            {
              levels[level].letters.map((letter, i) => (
                  <button key={i} className={`buttonLetter ${lettersSelected.includes(i) && 'buttonLetterSelected'}`}
                          onClick={() => onClickLetter(letter, i)}>
                    {
                      letter
                    }
                  </button>
              ))
            }
          </div>
        </div>
        <div className="flex items-center gap-4 mt-8">
          {
            word.map((n, i) => (
                <button
                    key={i}
                    className={`buttonWord ${invalidWord && "buttonWordInvalid"}`}
                    onClick={() => onClickLetterInWord(n, i)}>
                  {
                    n === '*' ? '' : n
                  }
                </button>
            ))
          }
        </div>
        {
            isWinner &&
            <div
                className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md flex flex-col justify-center items-center">
              <Image src="/conffeti.webp" alt="conffeti" width={200} height={200}/>
              <h2 className="text-4xl text-white font-bold mb-8">
                Genial!, Has pasado este nivel
              </h2>
              <button className="bg-green-400 px-8 py-4 rounded-full font-bold hover:scale-105 duration-300"
                      onClick={() => {
                        setIsWinner(false)
                        setLevel(level < levels.length - 1 ? level + 1 : 0)
                      }}>
                Siguiente Nivel
              </button>
            </div>
        }
        {
            level > 0 && (
                <button
                    className="fixed bottom-4 left-4 flex items-center gap-2 bg-transparent text-white hover:text-green-300"
                    onClick={() => {
                      setIsWinner(false)
                      setLevel(level - 1)
                    }}>
                  <FaArrowCircleLeft/>
                  Nivel Anterior
                </button>
            )
        }
      </div>
  )
}

export default Game