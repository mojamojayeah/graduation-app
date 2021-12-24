import { HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { FixText } from './fixText'
import { UserText } from './userText'

type ResultTextViewProps = {
  resultText: string
  displayText: string
  resultWord: string[]
}

export const ResultTextView = ({
  resultText,
  displayText,
  resultWord,
}: ResultTextViewProps) => {
  return (
    <Stack spacing={-0.1}>
      <HStack>
        {/* <Text mb="8px" pt={2} textColor="white">
          自分の英文:
        </Text> */}

        <UserText
          notViewText={resultText}
          viewText={displayText}
          word={resultWord ?? []}
        />
      </HStack>

      <HStack>
        {/* <Text mb="8px" pt={2} textColor="white">
          解答例英文:
        </Text> */}

        <FixText
          notViewText={displayText}
          viewText={resultText}
          word={resultWord ?? []}
        />
      </HStack>
    </Stack>
  )
}
