import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const siteTitle = 'Scrambled Words API'
const siteDescription = 'User contributed scramble words.'

function SEO ({ description, meta, title }) {
	const metaTitle = title ? `${title} • ${siteTitle}` : siteTitle
	const metaDesc = description || siteDescription

	return (
		<Helmet
			title={metaTitle}
			meta={[
				{
					name: 'description',
					content: metaDesc
				},
				{
					name: 'og:description',
					content: metaDesc
				},
				{
					name: 'twitter:title',
					content: metaTitle
				},
				{
					name: 'twitter:description',
					content: metaDesc
				}
			].concat(meta)}
		/>
	)
}

SEO.defaultProps = {
	meta: [],
	description: ''
}

SEO.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object)
}

export default SEO
