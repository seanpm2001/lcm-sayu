import React from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { Flex, Image, Text, Stack } from '@chakra-ui/core'

import { CustomButton } from 'src/components/CustomButton'
import withSession from 'src/hoc/WithSession'

import styles from './WelcomeSayu.module.scss'

const WelcomeSayu = () => {
  const router = useRouter()
  const [session, loading] = useSession()

  return (
    <Flex direction="column">
      <header className={styles.header}>
        <div className={styles['logo-section']}>
          <img className={styles['heart-logo']} src="img/heart_logo.svg" />
          <img className={styles['sayu-logo']} src="img/sayu_logo.svg" />
        </div>
        <div className={styles['logout-button']}>
          <img
            src={(!loading && session && session.user.image) || ''}
            alt="Imagen de perfil"
          />
          <a
            href="api/auth/signout"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Salir
          </a>
        </div>
      </header>
      <Stack width="100%" marginTop={60} align="center">
        <Stack isInline>
          <Text fontWeight="bold" fontSize={['xl']}>
            Hola {!loading && session && session.user.name.split(' ')[0]}
          </Text>
          <Image src="img/waving_hand_emoji.svg" width="2em" />
        </Stack>

        <Text marginTop={5} fontSize={['sm']}>
          Utiliza esta herramienta para llevar un registro de los síntomas de tu
          hijo/hija.
        </Text>
        <Stack marginTop={70} />
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: 'darkGreen' }}
          onClick={() => {
            router.push('/face-scale-screen')
          }}
          label="Registrar síntomas"
        />
      </Stack>
    </Flex>
  )
}
export default withSession(WelcomeSayu, ['tutor'])
