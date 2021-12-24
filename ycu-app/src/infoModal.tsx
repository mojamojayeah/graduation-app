import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type infoModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const InfoModal = ({ isOpen, onClose }: infoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent pb={2}>
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

            <Text fontSize="sm">それぞれの色は以下の状態を表しています。</Text>

            <HStack pt={2}>
              <Text bg="red" color="white" fontSize="xl">
                赤
              </Text>

              <Text fontSize="sm">
                あなたの英文、及び解答例文の差。何を間違えたのかもう一度確認しましょう。
              </Text>
            </HStack>

            <HStack pt={2}>
              <Text bg="blue" color="white" fontSize="xl">
                青
              </Text>

              <Text fontSize="sm">
                あなたの英文の中で今回のテーマに沿っていると考えられる単語。
              </Text>
            </HStack>

            <HStack pt={2}>
              <Text bg="purple" color="white" fontSize="xl">
                紫
              </Text>

              <Text fontSize="sm">
                修正された英文の中で今回のテーマに沿っていると考えられる単語。
              </Text>
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
