import React, { useState } from 'react'
import Layout from '../components/layout'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { css } from '@emotion/react'
import mq from '../helpers/media-queries'
import HeaderImage from '../components/header-image'
import styles from '../../theme'

const barStyle = css`
	height: 2rem;
	background: ${styles.colors.pink};
	${mq[1]} {
		height: 4px;
	}
`
const articleStyle = css`
	margin: 3rem 2rem;
	line-height: 1.5;
	max-width: 800px;
	${mq[1]} {
		margin: 3rem auto;
		position: relative;
		top: -10rem;
		background: ${styles.colors.black};
		padding: 0.01px 2rem; // small top added to wrap p margins
	}
`
const formStyle = css`
	padding: 1rem;
	background: rgba(30, 30, 30, 1);
	${mq[1]} {
		border: none;
	}
	label,
	input,
	textarea {
		display: block;
	}
	input,
	input:focus,
	textarea,
	textarea:focus {
		outline: 3px solid rgba(30, 30, 30, 1);
	}
	input {
		width: calc(100% - 0.5rem);
		margin-bottom: 1rem;
	}
	textarea {
		width: calc(100% - 0.5rem);
		height: 16rem;
		margin-bottom: 1rem;
		resize: none;
	}
`
const submitStyle = css`
	width: inherit !important;
	background: transparent;
	border: 2px solid ${styles.colors.pink};
	color: white;
	padding: 1rem 2rem;
	margin-bottom: 0 !important;
	transition: color 0.2s ease-out, background 0.2s ease-out;
	cursor: pointer;
	:hover {
		color: rgba(30, 30, 30, 1);
		background: ${styles.colors.pink};
	}
	:disabled {
		color: lightgray;
		border-color: lightgray;
		:hover {
			color: white;
			background: transparent;
			cursor: not-allowed;
		}
	}
`
const Contact = () => {
	const data = useStaticQuery(query)
	const {
		contact: {
			seo,
			title,
			content,
			mobileImage,
			desktopImage,
			coverPosition,
		},
	} = data
	let [yourName, setYourName] = useState('')
	let [email, setEmail] = useState('')
	let [info, setInfo] = useState('')
	const handleChange = event => {
		if (event.target.name === 'yourName') {
			setYourName(event.target.value)
			console.log(yourName)
		} else if (event.target.name === '_replyto') {
			setEmail(event.target.value)
			console.log(email)
		} else if (event.target.name === 'info') {
			setInfo(event.target.value)
			console.log(info)
		}
	}
	return (
		<Layout>
			<HelmetDatoCms seo={seo.seoMetaTags} />
			<HeaderImage
				image={[mobileImage, desktopImage]}
				coverPosition={coverPosition}
				title={title}
			/>
			<div css={barStyle} />
			<article css={articleStyle}>
				{content && (
					<div dangerouslySetInnerHTML={{ __html: content }} />
				)}
				<form
					css={formStyle}
					action="https://formspree.io/jdozierezell@gmail.com"
					method="POST"
				>
					<label htmlFor="yourName">Your name *</label>
					<input
						type="text"
						name="yourName"
						required={true}
						onChange={handleChange}
					/>
					<label htmlFor="_replyto">Your email *</label>
					<input
						type="email"
						name="_replyto"
						required={true}
						onChange={handleChange}
					/>
					<label htmlFor="companyName">Company name</label>
					<input type="text" name="companyName" />
					<label htmlFor="info">Tell me more *</label>
					<textarea
						name={'info'}
						placeholder="Please provide additional information about your project
                    here."
						required={true}
						onChange={handleChange}
					/>
					<input
						css={submitStyle}
						type="submit"
						value={
							!yourName || !email || !info
								? 'Please complete required fields'
								: 'Submit'
						}
						disabled={!yourName || !email || !info}
					/>
				</form>
			</article>
		</Layout>
	)
}

export default Contact

const query = graphql`
	query {
		contact: datoCmsContact {
			seo: seoMetaTags {
				tags
			}
			title
			slug
			content
			mobileImage: coverImage {
				gatsbyImageData(
					width: 2160
					placeholder: NONE
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "2160"
						h: "1000"
						q: 75
					}
				)
			}
			desktopImage: coverImage {
				gatsbyImageData(
					width: 2160
					placeholder: NONE
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "2160"
						h: "1215"
						q: 75
					}
				)
			}
			coverPosition
		}
	}
`
