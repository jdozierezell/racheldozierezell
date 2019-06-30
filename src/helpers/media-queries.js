const breakpoints = [500, 800, 1200, 1800]

const mq = breakpoints.map(bp => {
    return `@media (min-width: ${bp}px)`
})

export default mq
