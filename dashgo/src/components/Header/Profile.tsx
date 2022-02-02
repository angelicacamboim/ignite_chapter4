import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
	showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
	return (
		<Flex align="center">
			{showProfileData && (
				<Box mr="4" textAlign="right">
					<Text>Angelica bayer</Text>
					<Text color="gray.300" fontSize="small">
						angelicacamboim@gmail.com
					</Text>
				</Box>
			)}
			<Avatar size="md" name="Angelica bayer" />
		</Flex>
	)
}
