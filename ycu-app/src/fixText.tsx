import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

interface FixTextProps {
  viewText: string
  notViewText: string
  word: string[]
}
export const FixText = ({ viewText, notViewText, word }: FixTextProps) => {
  const notColorWord = notViewText
    .replace(`\n`, '')
    .concat('', '.')
    .split(' ' || ' ')
  const viewTextList = viewText.split(' ')

  return (
    <HStack>
      {viewTextList.map((text) => (
        <Text
          bg={
            !notColorWord.includes(text) &&
            !word.includes(text.replace('.', ''))
              ? // userと解答の差
                'red'
              : notColorWord.includes(text) &&
                word.includes(text.replace('.', ''))
              ? // テーマのワードに合致しているもの
                'blue'
              : !notColorWord.includes(text) &&
                word.includes(text.replace('.', ''))
              ? // 両方
                'purple'
              : undefined
          }
          color="white"
          key={text}
        >
          {text}
        </Text>
      ))}
    </HStack>
  )
}
