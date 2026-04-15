/**
 * Compute reading time from markdown/MDX text
 * @param {string} text
 * @returns {number} minutes
 */
function computeReadTime(text = '') {
    const wordsPerMinute = 200
    const wordCount = text.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

module.exports = { computeReadTime }
