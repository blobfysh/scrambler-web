import React from 'react'
import SEO from '../components/SEO'
import { VStack, Text, Input, Heading } from '@chakra-ui/react'

function API () {
	return (
		<>
			<SEO
				title='API'
			/>
			<VStack pt='6' align='left' spacing='5' textStyle='paragraph'>
				<Heading textAlign='center' textStyle='h1' as='h1'>Using the API</Heading>
				<Text>You can use the API to retrieve approved scramble words for use in your applications. Just send a GET request to the following URL to retrieve a random word:</Text>
				<Input isReadOnly variant='filled' value='http://scrambledwords.xyz/api/random' />
				<Text>All responses are in JSON format and there is a ratelimit of 300 requests per minute. You can use the response headers to view the ratelimit.</Text>
			</VStack>
		</>
	)
}

export default API
