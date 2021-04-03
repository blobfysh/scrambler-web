import React from 'react'
import SEO from '../../components/SEO'
import { Heading,
	Button,
	VStack,
	HStack,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Words () {
	return (
		<>
			<SEO />
			<VStack py='24' textAlign='center' spacing='10' textStyle='paragraph'>
				<Heading>Submitted Words</Heading>
				<HStack>
					<Button
						colorScheme='blue'
						size='lg'
						as={Link}
						to='/'
					>
						HEY
					</Button>
				</HStack>
			</VStack>
		</>
	)
}

export default Words
