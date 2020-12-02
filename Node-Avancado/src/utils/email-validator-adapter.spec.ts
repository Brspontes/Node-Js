import { EmailValidatorAdapter } from "./email-validator"

describe('Email validator adapter', () => {
    test('Should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        const isvalid = sut.isValid('invalid_email@')
        expect(isvalid).toBe(false)
    })

    test('Should return true if validator returns true', () => {
        const sut = new EmailValidatorAdapter()
        const isvalid = sut.isValid('valid_email@mail.com')
        expect(isvalid).toBe(true)
    })
})