const adminIds = [
    'bLIX6SkJwNgRCr9WCGQGUxJPESE3',
    'yyjKVWJzpoM0MgoBgtEGs0WF8HI3',
    'lZSeKlPmmmO4vZqpMSFb9xgUGcc2',
    'hMQaKHSEOcNocPw8dnpFeuJLMo92'
]

const isAdmin = (id: string) => adminIds.includes(id)

export default isAdmin;