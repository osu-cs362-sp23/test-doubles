const registerUser = require("./registerUser")
const Database = require("./database")

test("saves a user record in the datatbase", function () {
    const email = "hessro@oregonstate.edu"
    const password = "abc123ABC!!!"
    const spy = jest.spyOn(Database, "save")
    spy.mockImplementation(function () {
        console.log("== Stubbed Database.save() called...")
    })

    registerUser(email, password)

    expect(spy).toHaveBeenCalledTimes(1)

    // console.log("== spy.mock.calls:", spy.mock.calls)

    spy.mockRestore()
})

test("saves a user record in the datatbase", function () {
    const email = "hessro@oregonstate.edu"
    const password = "abc123ABC!!!"
    const spy = jest.spyOn(Database, "save")
    spy.mockImplementation(function () {
        console.log("== Stubbed Database.save() called...")
    })

    registerUser(email, password)

    const argument = spy.mock.lastCall[0]
    expect(argument).toMatchObject({
        password: expect.not.stringContaining(password)
    })

    spy.mockRestore()
})

test("returns null on database error", function () {
    const email = "hessro@oregonstate.edu"
    const password = "abc123ABC!!!"
    const spy = jest.spyOn(Database, "save")
    spy.mockImplementation(function () {
        console.log("== Stubbed Database.save() called...")
        throw Error()
    })

    const result = registerUser(email, password)
    expect(result).toBeNull()

    spy.mockRestore()
})
