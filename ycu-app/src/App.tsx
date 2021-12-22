/* eslint-disable react/jsx-max-depth */
import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { FixText } from './fixText'
import { UserText } from './userText'

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>このサイトについて</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={-1}>
              <Text fontSize="sm">
                本サイトは学生の英作文学習効率を向上することを目的に作成されたアプリです。
              </Text>

              <Text fontSize="sm">
                一つ目の空欄に英作文を二つ目に英作文のテーマを記入してください。
              </Text>

              <Text fontSize="sm">
                送信ボタンを押ししばらくすると、英作文の解答例、及び今回のテーマに沿った他の単語が出力されます。
              </Text>

              <Text fontSize="sm">
                その単語を利用してもう一度英作文を書いてみるなどして利用してください。
              </Text>

              <Text fontSize="sm">
                また、各単語をクリックすると辞書に飛べるので語彙数を増やしましょう。
              </Text>

              <Text fontSize="sm">
                あなたが記入した英作文、及び解答例文の単語に色がついていることがあります。
              </Text>

              <Text fontSize="sm">
                それぞれの色は以下の状態を表しています。
              </Text>

              <HStack>
                <Text bg="red" color="white" fontSize="xl">
                  赤
                </Text>

                <Text fontSize="sm">
                  あなたの英文、及び解答例文の差。何を間違えたのかもう一度確認しましょう。
                </Text>
              </HStack>

              <HStack>
                <Text bg="blue" color="white" fontSize="xl">
                  青
                </Text>

                <Text fontSize="sm">
                  あなたの英文の中で今回のテーマに沿っていると考えられる単語。
                </Text>
              </HStack>

              <HStack>
                <Text bg="purple" color="white" fontSize="xl">
                  紫
                </Text>

                <Text fontSize="sm"> 赤、青両方を含む単語</Text>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

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
          {resultText === null || resultText?.length === 0
            ? null
            : resultText.map((result, index) => (
                <Stack key={result}>
                  <HStack>
                    <Text mb="8px" pt={2} textColor="white">
                      自分の英文:
                    </Text>

                    <UserText
                      notViewText={result}
                      viewText={displayText[index]}
                      word={resultWord ?? []}
                    />
                  </HStack>

                  <HStack>
                    <Text mb="8px" pt={2} textColor="white">
                      解答例英文:
                    </Text>

                    <FixText
                      notViewText={displayText[index]}
                      viewText={result}
                      word={resultWord ?? []}
                    />
                  </HStack>
                </Stack>
              ))}
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

          {resultSuggestTheme === null || resultSuggestTheme?.length === 0
            ? null
            : resultSuggestTheme?.map((result) => (
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
