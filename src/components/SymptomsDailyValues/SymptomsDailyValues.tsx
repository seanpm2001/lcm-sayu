import React from 'react'
import {
  Box,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import axios from 'axios'

import { Role } from 'src/model/Role'

import styles from './symptomsDailyValues.module.scss'
import { DateService } from '../../services/DateService'

type SymptomsLevel = {
  symptomTimeStamp: number
  painLevel: number
  tireLevel: number
  appetiteLevel: number
  nauseaLevel: number
  swallowLevel: number
  airLevel: number
  depositionLevel: boolean
  feverLevel: boolean
  rescueLevel: boolean
}

const SymptomsDailyValues = ({
  symptomTimeStamp,
  painLevel,
  tireLevel,
  appetiteLevel,
  nauseaLevel,
  swallowLevel,
  airLevel,
  depositionLevel,
  feverLevel,
  rescueLevel,
}: SymptomsLevel) => {
  const [session] = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const dateService = new DateService()
  const symptomDate = new Date(symptomTimeStamp)

  const symptomDay = dateService.formatDayAndNumberDate(symptomTimeStamp)
  const symptomHour = dateService.formatHourAndMinutes(symptomTimeStamp)
  const symptomMonth = dateService.getMonthName(symptomDate.getMonth())
  const symptomYear = symptomDate.getFullYear()

  return (
    <div
      className={`${styles['symptom-list']} ${
        rescueLevel && styles['with-rescue']
      }`}
    >
      <Text fontSize={'xs'} ml={1} lineHeight={'tall'}>
        {symptomHour}
      </Text>
      <Box ml={1}>
        <div className={`${styles['dolor-value']} ${styles['symptom-circle']}`}>
          {painLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['cansancio-value']} ${styles['symptom-circle']}`}
        >
          {tireLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['apetito-value']} ${styles['symptom-circle']}`}
        >
          {appetiteLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['nauseas-value']} ${styles['symptom-circle']}`}
        >
          {nauseaLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['tragar-value']} ${styles['symptom-circle']}`}
        >
          {swallowLevel}
        </div>
      </Box>
      <Box>
        <div className={`${styles['aire-value']} ${styles['symptom-circle']}`}>
          {airLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['deposicion-value']} ${styles['symptom-circle']}`}
        >
          {depositionLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['fiebre-value']} ${styles['symptom-circle']}`}
        >
          {feverLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      {session?.role === Role.CUIDADOR && (
        <Box>
          <button
            title={`Borrar registro ${symptomDay} ${symptomHour}`}
            onClick={onOpen}
          >
            <Icon name="delete" />
          </button>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Confirmas que deseas eliminar el registro de síntomas del día{' '}
            {symptomDay} de {symptomMonth} del {symptomYear} a las {symptomHour}
          </ModalBody>

          <ModalFooter>
            <button onClick={onClose}>Cerrar</button>
            <button
              onClick={() => {
                const year = symptomDate.getFullYear()
                const month = symptomDate.getMonth() + 1
                const day = symptomDate.getDate()
                const hour = symptomDate.getHours()
                const minute = symptomDate.getMinutes()
                const seconds = symptomDate.getSeconds()
                axios.delete(
                  `/api/remove-registries/${year}/${month}/${day}/${hour}/${minute}/${seconds}`
                )
                router.reload()
              }}
            >
              Eliminar
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SymptomsDailyValues
