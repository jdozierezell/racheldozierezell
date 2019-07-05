import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Slider from 'react-slick'
import Lightbox from 'react-image-lightbox'
import Image from 'gatsby-image'
import 'react-image-lightbox/style.css'
import Layout from '../components/layout'
import HeaderImage from '../components/header-image'
import styles from '../../theme'

const barStyle = css`
    height: 2rem;
    background: ${styles.colors.pink};
`
const articleStyle = css`
    margin: 3rem 2rem;
    line-height: 1.5;
`
const Work = ({ data }) => {
    const {
        title,
        description,
        mobileImage,
        desktopImage,
        images,
        seo,
    } = data.work
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        easing: 'ease-in-out',
        swipeToSlide: true,
        lazyLoad: true,
        responsive: [
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
    const imageArray = []
    images.forEach(image => {
        imageArray.push(image.fluid.src)
    })
    const handleImageClick = event => {
        if (window.innerWidth < 800) return
        const prevImageIndex = imageArray.indexOf(event.target.src) - 1
        const nextImageIndex = imageArray.indexOf(event.target.src) + 1
        setPrev(imageArray[prevImageIndex])
        setCurrent(event.target.src)
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
                image={[mobileImage[0], desktopImage[0]]}
                title={title}
            />
            <div css={barStyle} />
            <article css={articleStyle}>
                <h2>About {title}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} />
                <Slider {...settings}>
                    {images.map((image, index) => {
                        return (
                            <div key={index} onClick={handleImageClick}>
                                <Image
                                    css={css`
                                        margin: 1rem;
                                    `}
                                    fluid={image.fluid}
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
            mobileImage: images {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        w: "2160"
                        h: "1000"
                        fit: "crop"
                        crop: "faces"
                        q: 75
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
            desktopImage: images {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        w: "2160"
                        h: "1215"
                        fit: "crop"
                        crop: "faces"
                        q: 75
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
            images {
                fluid(maxWidth: 2160) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
        }
    }
`

export default Work
