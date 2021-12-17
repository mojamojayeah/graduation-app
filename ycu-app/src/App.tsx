import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'

const App = () => {
  const [text, setText] = useState<string>('')
  const handleInputTextChange = useCallback((e) => {
    const inputValue = e.target.value
    setText(inputValue)
  }, [])
  const [theme, setTheme] = useState<string>('')
  const [resultTheme, setResultTheme] = useState<string[][] | null>(null)
  const [resultText, setResultText] = useState<string[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const handleInputThemeChange = useCallback((e) => {
    const inputValue = e.target.value
    setTheme(inputValue)
  }, [])
  const handleSendButton = useCallback(async () => {
    setLoading(false)
    try {
      const themeResponse = await axios.post(
        'http://127.0.0.1:5000/post/theme',
        {
          text: text,
          theme: theme,
        },
      )
      const gramResponse = await axios.post('http://127.0.0.1:5000/post/gram', {
        text: text,
      })
      setResultText(gramResponse.data.gramaformersentences)
      setResultTheme(themeResponse.data.theme)
      setLoading(true)
    } catch (e) {
      setLoading(true)
      console.error(e)
    }
  }, [text, theme])

  return (
    <Box bg="green.600" flex={1} h="full" minH="730px">
      <Stack p={10} spacing={8}>
        <Heading as="h2" isTruncated size="xl" textColor="white">
          英作文学習ツール
        </Heading>

        <Stack>
          <Textarea
            h="auto"
            onChange={handleInputTextChange}
            placeholder="英作文を記入してください"
            size="sm"
            textColor="white"
            value={text}
          />

          <Textarea
            onChange={handleInputThemeChange}
            placeholder="英作文のテーマを英単語１語で記入してください"
            size="sm"
            textColor="white"
            value={theme}
          />
        </Stack>

        <Stack>
          <Text mb="8px" textColor="white">
            自分の英文: {text}
          </Text>

          {resultText === null || resultText?.length === 0 ? null : (
            <Text mb="8px" textColor="white">
              解答例文:{resultText?.map((result) => result)}
            </Text>
          )}
        </Stack>

        <Stack>
          <Text mb="8px" textColor="white">
            今回のテーマ:
            <Link
              href={`https://ejje.weblio.jp/content/${theme}`}
              target="_blank"
            >
              {theme}
            </Link>
          </Text>

          {resultTheme === null || resultTheme?.length === 0
            ? null
            : resultTheme?.map((result) => (
                <HStack alignItems="center" key={result[0]}>
                  <Text mb="8px" pt={2} textColor="white">
                    テーマに関連した単語:
                    <Link
                      color="blue.200"
                      href={`https://ejje.weblio.jp/content/${result[0]}`}
                      target="_blank"
                    >
                      {result[0]}
                    </Link>
                  </Text>

                  <Text mb="8px" textColor="white">
                    意味:
                  </Text>

                  <Text mb="8px" textColor="white">
                    {result[2]}
                  </Text>
                </HStack>
              ))}
        </Stack>

        <Button
          colorScheme="yellow"
          isLoading={!loading}
          loadingText="数分かかる場合がございます。少々お待ちください"
          onClick={handleSendButton}
          size="lg"
        >
          送信
        </Button>
      </Stack>
    </Box>
  )
}

export default App
