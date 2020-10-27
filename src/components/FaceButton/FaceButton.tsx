import React from 'react'
import { Image, Text, Flex } from '@chakra-ui/core'
import { useRouter } from 'next/router'

const faceInfo: { [key: string]: any } = {
  faceZero: {
    img: 'img/faces/FaceZero.svg',
    number: '0',
    description: 'No duele',
    click: 'zero',
  },
  faceTwo: {
    img: 'img/faces/FaceTwo.svg',
    number: '2',
    description: 'Duele un poco',
    click: 'two',
  },
  faceFour: {
    img: 'img/faces/FaceFour.svg',
    number: '4',
    description: 'Duele un poco más',
    click: 'four',
  },
  faceSix: {
    img: 'img/faces/FaceSix.svg',
    number: '6',
    description: 'Duele mucho',
    click: 'six',
  },
  faceEight: {
    img: 'img/faces/FaceEight.svg',
    number: '8',
    description: 'Duele mucho más',
    click: 'eight',
  },
  faceTen: {
    img: 'img/faces/FaceTen.svg',
    number: '10',
    description: 'Duele al máximo',
    click: 'ten',
  },
}

type FaceButtonProps = {
  painValue: string
}

const FaceButton = ({ painValue }: FaceButtonProps) => {
  const router = useRouter()
  return (
    <Flex direction="column" align="center">
      <button
        onClick={() => {
          router.push({
            pathname: '/symptoms-registry',
            query: { 'pain-level': faceInfo[painValue].click },
          })
        }}
      >
        <Image
          src={faceInfo[painValue].img}
          alt={faceInfo[painValue].description}
        />
      </button>
      <Text textAlign="center">{faceInfo[painValue].number}</Text>
      <Text
        paddingLeft={[1, 2, 3, 10]}
        textAlign="center"
        fontSize={['sm', 'md', 'lg', 'xl']}
      >
        {faceInfo[painValue].description}
      </Text>
    </Flex>
  )
}
export { FaceButton }
