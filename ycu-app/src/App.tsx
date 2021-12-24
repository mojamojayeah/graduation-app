import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { InfoModal } from './infoModal'
import { ResultTextView } from './resultTextView'
import { SuggestionTheme } from './suggestionTheme'

const App = () => {
  const [text, setText] = useState<string>('')
  const displayText = text.split('.')

  const handleInputTextChange = useCallback((e) => {
    const inputValue = e.target.value
    setText(inputValue)
  }, [])

  const [theme, setTheme] = useState<string>('')
  const handleInputThemeChange = useCallback((e) => {
    const inputValue = e.target.value
    setTheme(inputValue)
  }, [])

  const [resultSuggestTheme, setResultSuggestTheme] = useState<
    string[][] | null
  >(null)

  const [resultText, setResultText] = useState<string[] | null>(null)
  const [resultWord, setResultWord] = useState<string[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const { isOpen, onOpen, onClose } = useDisclosure()

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
      setResultSuggestTheme(themeResponse.data.theme)
      setResultWord(themeResponse.data.word)
      setLoading(true)
    } catch (e) {
      setLoading(true)
      console.error(e)
    }
  }, [text, theme])

  return (
    <Box bg="green.600" flex={1} h="full" minH="730px">
      <InfoModal isOpen={isOpen} onClose={onClose} />

      <Stack p={10} spacing={8}>
        <HStack>
          <Heading as="h2" isTruncated size="xl" textColor="white">
            英作文学習ツール
          </Heading>

          <InfoOutlineIcon color="skyblue" h={6} onClick={onOpen} w={6} />
        </HStack>

        <Stack>
          <Textarea
            h="auto"
            minH="240px"
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

        <Button
          colorScheme="yellow"
          isLoading={!loading}
          loadingText="数分かかる場合がございます。少々お待ちください"
          onClick={handleSendButton}
          size="lg"
        >
          送信
        </Button>

        <Box borderStyle="dashed" borderWidth={1}>
          <Heading
            bg="green.600"
            isTruncated
            left={2}
            position="relative"
            size="md"
            textColor="white"
            top={-3}
            w="max"
          >
            結果 *上自分の解答 下解答例
          </Heading>

          <Stack m={4} spacing={10}>
            {resultText === null || resultText?.length === 0
              ? null
              : resultText.map((result, index) => (
                  <ResultTextView
                    displayText={displayText[index]}
                    key={result}
                    resultText={result}
                    resultWord={resultWord ?? []}
                  />
                ))}
          </Stack>
        </Box>

        <Stack>
          <Box borderStyle="dashed" borderWidth={1}>
            <Heading
              bg="green.600"
              isTruncated
              left={2}
              position="relative"
              size="md"
              textColor="white"
              top={-3}
              w="max"
            >
              関連ワード
            </Heading>

            <Text mb="8px" ml={4} textColor="white">
              今回のテーマ:
              <Link
                color="blue.200"
                href={`https://ejje.weblio.jp/content/${theme}`}
                ml={2}
                target="_blank"
              >
                {theme}
              </Link>
            </Text>

            <Stack m={4}>
              {resultSuggestTheme === null || resultSuggestTheme?.length === 0
                ? null
                : resultSuggestTheme?.map((result) => (
                    <SuggestionTheme
                      key={`${result[0]}${result[2]}}`}
                      meaning={result[2]}
                      theme={result[0]}
                    />
                  ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default App
