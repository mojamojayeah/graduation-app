import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

interface FixTextProps {
  viewText: string
  notViewText: string
}
export const FixText = ({ viewText, notViewText }: FixTextProps) => {
  const notColorWord = notViewText
    .replace(`\n`, '')
    .concat('', '.')
    .split(' ' || ' ')
  const viewTextList = viewText.split(' ')

  return (
    <HStack>
      {viewTextList.map((word) => (
        <Text
          bg={notColorWord.includes(word) ? undefined : 'red'}
          color="white"
          key={word}
        >
          {word}
        </Text>
      ))}
    </HStack>
  )
}
