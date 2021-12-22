import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

interface UserTextProps {
  viewText: string
  notViewText: string
}
export const UserText = ({ viewText, notViewText }: UserTextProps) => {
  const viewTextList = viewText
    .replace(`\n`, '')
    .concat('', '.')
    .split(' ' || ' ')
  const notColorWord = notViewText.split(' ')

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
