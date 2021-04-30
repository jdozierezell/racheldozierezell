import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Slider from 'react-slick'
import Lightbox from 'react-image-lightbox'
import { getSrc, GatsbyImage } from 'gatsby-plugin-image'
import 'react-image-lightbox/style.css'
import Layout from '../components/layout'
import HeaderImage from '../components/header-image'
import styles from '../../theme'
import mq from '../helpers/media-queries'

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
	display: flex;
	flex-flow: row wrap;
	> * {
		width: 100%;
	}
`
const headerStyle = css`
	${mq[1]} {
		order: 2;
		margin-top: 8vh;
	}
`
const descriptionStyle = css`
	${mq[1]} {
		order: 3;
	}
`
const sliderStyle = css`
	${mq[1]} {
		order: 1;
		position: absolute;
		top: 50vh;
		left: 4rem;
		right: 4rem;
		width: calc(100vw - 8rem);
	}
	img {
		border: 4px solid ${styles.colors.pink};
		cursor: pointer;
	}
`
const prevArrow = css`
	width: 0;
	height: 0;
	border-top: 50px solid transparent;
	border-right: 50px solid ${styles.colors.white60};
	border-bottom: 50px solid transparent;
	left: -3rem;
	:before {
		display: none !important;
	}
	:hover {
		border-right: 50px solid ${styles.colors.white80};
	}
`
const nextArrow = css`
	width: 0;
	height: 0;
	border-top: 50px solid transparent;
	border-left: 50px solid ${styles.colors.white60};
	border-bottom: 50px solid transparent;
	right: -3rem;
	:before {
		display: none !important;
	}
	:hover {
		border-left: 50px solid ${styles.colors.white80};
	}
`
function PrevArrow(props) {
	const { className, onClick } = props
	return <div css={prevArrow} className={className} onClick={onClick} />
}
function NextArrow(props) {
	const { className, onClick } = props
	return <div css={nextArrow} className={className} onClick={onClick} />
}
const Work = ({ data }) => {
	const {
		title,
		description,
		mobileImage,
		desktopImage,
		coverPosition,
		thumb,
		full,
		seo,
	} = data.work
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 4,
		easing: 'ease-in-out',
		swipeToSlide: true,
		lazyLoad: true,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}
	const [current, setCurrent] = useState('')
	const [prev, setPrev] = useState('')
	const [next, setNext] = useState('')
	const thumbArray = []
	const imageArray = []
	thumb.forEach(image => {
		thumbArray.push(getSrc(image))
	})
	full.forEach(image => {
		imageArray.push(getSrc(image))
	})
	const handleImageClick = event => {
		if (window.innerWidth < 800) return
		const prevImageIndex = thumbArray.indexOf(event.target.src) - 1
		const currentImageIndex = thumbArray.indexOf(event.target.src)
		const nextImageIndex = thumbArray.indexOf(event.target.src) + 1
		setPrev(imageArray[prevImageIndex])
		setCurrent(imageArray[currentImageIndex])
		setNext(imageArray[nextImageIndex])
	}
	const handlePrevClick = () => {
		const temps = { prev, current, next }
		const newPrev = imageArray.indexOf(temps.prev) - 1
		setPrev(imageArray[newPrev])
		setCurrent(temps.prev)
		setNext(temps.current)
	}
	const handleNextClick = () => {
		const temps = { prev, current, next }
		const newNext = imageArray.indexOf(temps.next) + 1
		setPrev(temps.current)
		setCurrent(temps.next)
		setNext(imageArray[newNext])
	}
	return (
		<Layout
			css={css`
				color: white;
			`}
		>
			<Global
				styles={css`
					.slick-track {
						display: flex;
						align-items: center;
					}
				`}
			/>
			<HelmetDatoCms seo={seo} />
			<HeaderImage
				image={[mobileImage, desktopImage]}
				coverPosition={coverPosition}
			/>
			<div css={barStyle} />
			<article css={articleStyle}>
				<h2 css={headerStyle}>{title}</h2>
				<div
					css={descriptionStyle}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				<Slider css={sliderStyle} {...settings}>
					{thumb.map((image, index) => {
						return (
							<div key={index} onClick={handleImageClick}>
								<GatsbyImage
									css={css`
										margin: 1rem;
									`}
									image={image.gatsbyImageData}
									backgroundColor={styles.colors.gray}
								/>
							</div>
						)
					})}
				</Slider>
				{current && (
					<Lightbox
						mainSrc={current}
						onCloseRequest={() => setCurrent('')}
						prevSrc={prev}
						nextSrc={next}
						onMovePrevRequest={() => handlePrevClick()}
						onMoveNextRequest={() => handleNextClick()}
					/>
				)}
			</article>
		</Layout>
	)
}

export const query = graphql`
	query getWork($slug: String!) {
		work: datoCmsWork(slug: { eq: $slug }) {
			seo: seoMetaTags {
				tags
			}
			title
			slug
			description
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
			full: images {
				gatsbyImageData(width: 2160, placeholder: NONE)
			}
			thumb: images {
				gatsbyImageData(
					width: 400
					placeholder: NONE
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "500"
						h: "310"
						q: 75
					}
				)
			}
		}
	}
`

export default Work
