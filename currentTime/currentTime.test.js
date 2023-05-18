/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")

const initDomFromFiles = require("../utils/initDomFromFiles")

test("displays 'midnight' at 00:00", function () {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2023, 4, 17, 0, 0))

    initDomFromFiles(
        __dirname + "/currentTime.html",
        __dirname + "/currentTime.js"
    )

    expect(domTesting.queryByText(document, "midnight"))
        .toBeInTheDocument()

    jest.useRealTimers()
})
