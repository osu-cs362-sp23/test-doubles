/**
 * @jest-environment jsdom
 */

require("whatwg-fetch")
require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const rest = require("msw").rest
const setupServer = require("msw/node").setupServer

const initDomFromFiles = require("../utils/initDomFromFiles")

const fakeSearchResults = require("./fakeSearchResults.json")

const server = setupServer(
    rest.get(
        "https://api.github.com/search/repositories",
        function (req, res, ctx) {
            console.log("== Fake API called")
            return res(ctx.json(fakeSearchResults))
        }
    )
)

beforeAll(function () {
    server.listen()
})

afterAll(function () {
    server.close()
})

test("correctly renders GitHub search results", async function () {
    initDomFromFiles(
        __dirname + "/githubSearch.html",
        __dirname + "/githubSearch.js"
    )

    const queryInput = domTesting.getByPlaceholderText(
        document,
        "Search GitHub"
    )
    const searchButton = domTesting.getByRole(document, "button")

    const user = userEvent.setup()
    await user.type(queryInput, "jest")
    await user.click(searchButton)

    const results = await domTesting.findAllByRole(document, "listitem")
    // expect(results).not.toHaveLength(0)
    expect(results).toHaveLength(fakeSearchResults.items.length)
    expect(results[0]).toHaveTextContent(
        fakeSearchResults.items[0].full_name
    )
})
