/**
 * Authenticates a user against DB.
 * 
 * @param {string} email The user email.
 * @param {string} password The user password.
 * 
 * @returns user | Error
 */
function authenticateUser(email, password) {
    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new Error('email is not valid')

    if (typeof password !== 'string') throw new Error('password is not a string')
    if (password.length < 8) throw new Error('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new Error('password has spaces')

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.email === email) {
            if (user.password === password)
                return user
            else
                throw new Error('wrong password')
        }
    }

    throw new Error('user not registered')
}