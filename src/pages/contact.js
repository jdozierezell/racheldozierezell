import React, { useState } from 'react'
import Layout from '../components/layout'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { css } from '@emotion/core'
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
const formStyle = css`
    border: 2px solid ${styles.colors.pink};
    padding: 1rem;
    margin: 2rem;
    label,
    input,
    textarea {
        display: block;
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
    width: calc(100% - 0.25rem) !important;
    background: transparent;
    border: 2px solid ${styles.colors.pink};
    color: white;
    padding: 1rem;
    border-radius: 2% / 8%;
    transition: color 0.2s ease-out, background 0.2s ease-out;
    cursor: pointer;
    :hover {
        color: black;
        background: ${styles.colors.pink};
    }
    :disabled {
        color: lightgray;
        border-color: lightgray;
    }
`
const Contact = () => {
    const data = useStaticQuery(query)
    const {
        contact: { seo, title, content, mobileImage, desktopImage },
    } = data
    let [yourName, setYourName] = useState('')
    let [email, setEmail] = useState('')
    const handleChange = event => {
        if (event.target.name === 'yourName') {
            setYourName(event.target.value)
            console.log(yourName)
        } else if (event.target.name === '_replyto') {
            setEmail(event.target.value)
            console.log(email)
        }
    }
    return (
        <Layout>
            <HelmetDatoCms seo={seo.seoMetaTags} />
            <HeaderImage image={[mobileImage, desktopImage]} title={title} />
            <div css={barStyle} />
            {content && (
                <article css={articleStyle}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
            )}
            <form
                css={formStyle}
                action="https://formspree.io/jdozierezell@gmail.com"
                method="POST"
            >
                <label htmlFor="yourName">Your Name *</label>
                <input
                    type="text"
                    name="yourName"
                    required={true}
                    onChange={handleChange}
                />
                <label htmlFor="_replyto">Your Email *</label>
                <input
                    type="email"
                    name="_replyto"
                    required={true}
                    onChange={handleChange}
                />
                <label htmlFor="companyName">Company Name</label>
                <input type="text" name="companyName" />
                <label htmlFor="info">Tell Me More</label>
                <textarea
                    name={'info'}
                    placeholder="Please provide additional information about your project
                    here."
                />
                <input
                    css={submitStyle}
                    type="submit"
                    value={
                        !yourName || !email
                            ? 'Please complete required fields'
                            : 'Submit'
                    }
                    disabled={!yourName || !email}
                />
            </form>
        </Layout>
    )
}

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
            desktopImage: coverImage {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        w: "2160"
                        h: "1215"
                        fit: "crop"
                        crop: "edges"
                        q: 75
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
        }
    }
`

export default Contact
