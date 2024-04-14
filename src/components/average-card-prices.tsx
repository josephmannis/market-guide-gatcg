import { Heading, HStack, Tag, Text, VStack } from '@chakra-ui/react';

export function AverageCardPrices() {
  return (
    <VStack border="1px" p={4} borderRadius="md" alignItems="flex-start" borderColor="rgba(255, 255, 255, 0.16)">
      <Heading mb={1} size="sm">
        Average Card Price:
      </Heading>
      <HStack flexWrap="wrap">
        <Tag color="black" bgColor="white">
          C: $1
        </Tag>
        <Tag color="black" bgColor="green.400">
          UC: $1
        </Tag>
        <Tag color="black" bgColor="cyan.400">
          R: $1
        </Tag>
        <Tag color="black" bgColor="pink.200">
          PR: $1
        </Tag>
        <Tag color="black" bgColor="purple.400">
          SR: $1
        </Tag>
        <Tag color="black" bgColor="yellow.300">
          UR: $1
        </Tag>
        <Tag borderWidth={2} borderColor="purple.400">
          CSR: $1
        </Tag>
        <Tag borderWidth={2} borderColor="yellow.300">
          CUR: $1
        </Tag>
        <Tag borderWidth={2} borderColor="pink.200">
          CPR: $1
        </Tag>
      </HStack>
    </VStack>
  );
}
