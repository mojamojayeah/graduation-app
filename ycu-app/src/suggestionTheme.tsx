import { HStack, Link, Text } from '@chakra-ui/react'
import React from 'react'

type SuggestionThemeProps = {
  theme: string
  meaning: string
}
export const SuggestionTheme = ({ theme, meaning }: SuggestionThemeProps) => {
  return (
    <HStack>
      <Text mb="8px" pt={2} textColor="white">
        <Link
          color="blue.200"
          href={`https://ejje.weblio.jp/content/${theme}`}
          target="_blank"
        >
          {theme}
        </Link>
      </Text>

      <Text mb="8px" textColor="white">
        意味:
      </Text>

      <Text mb="8px" textColor="white">
        {meaning}
      </Text>
    </HStack>
  )
}
