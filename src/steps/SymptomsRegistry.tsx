import React from 'react'
import { useRouter } from 'next/router'
import { Text, Stack, Box } from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { SymptomSlider } from 'src/components/SymptomSlider/SymptomSlider'
import { PainBox } from 'src/components/PainBox/PainBox'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { CustomButton } from 'src/components/CustomButton/CustomButton'
import { SymptomRadioButton } from 'src/components/SymptomRadioButton/SymptomRadioButton'

function SymptomsRegistry() {
  const { handleSubmit, control } = useForm()
  const onSubmit = (data: any) => console.warn(data)
  const router = useRouter()
  const painLevel = router.query['pain-level'] as string

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleHeader backArrowRoute="/face-scale-screen" closeRoute="/" />
        <PainBox painLevel={painLevel} />
        <Text fontSize="md" mb="8" mt="8">
          ¿Tienes otros síntomas? <br /> Regístralos considerando que 0 es
          ausencia del síntoma y 10 es la mayor intensidad de este.
        </Text>

        <Stack spacing={10}>
          <Box>
            <SymptomSlider symptomValue="Cansancio" control={control} />
          </Box>
          <Box>
            <SymptomSlider symptomValue="Náusea" control={control} />
          </Box>
          <Box>
            <SymptomSlider symptomValue="Apetito" control={control} />
          </Box>
          <Box>
            <SymptomSlider symptomValue="Falta de aire" control={control} />
          </Box>
          <Box>
            <SymptomSlider
              symptomValue="Dificultad para tragar"
              control={control}
            />
          </Box>
          <Box>
            <SymptomRadioButton symptomValue="Constipación" control={control} />
          </Box>
          <Box>
            <SymptomRadioButton symptomValue="Fiebre" control={control} />
          </Box>
        </Stack>

        <Stack marginTop={8} width="100%" align="center">
          <CustomButton
            backgroundColor="lightGreen"
            color="white"
            hover={{ backgroundColor: 'darkGreen' }}
            onClick={() => {
              //router.push('/successful-symptoms-registry')
            }}
            label="Registrar"
            type="submit"
          />
        </Stack>
        <Stack marginTop={2} width="100%" align="center">
          <CustomButton
            backgroundColor="white"
            color="lightGreen"
            borderColor="lightGreen"
            border="2px"
            hover={{ backgroundColor: 'darkGreen', color: 'white' }}
            onClick={() => {
              router.push('/failed-symptoms-registry')
            }}
            label="Cancelar"
          />
        </Stack>
      </form>
    </>
  )
}
export { SymptomsRegistry }
