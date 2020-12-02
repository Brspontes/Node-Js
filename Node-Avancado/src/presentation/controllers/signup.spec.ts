import { EmailValidator } from './../protocols/email-validator';
import { InvalidParamError, MissingParamError, ServerError } from '../errors/';
import { SignUpController } from "./signup"
import { AccountModel } from '../../domain/models/account';
import { AddAccount, AddAccountModel } from '../../domain/usercases/add-account';
import { resolve } from 'path';

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator,
    addAccountStub: AddAccount
}

const makeAddAcount = (): AddAccount => {
    class AddAcountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@email.com',
                password: 'valid_password'
            }
            return new Promise(resolve => resolve(fakeAccount)) 
        }
    }
    return new AddAcountStub()
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeEmailValidatorWithError = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            throw new Error()
        }
    }
    return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const addAccountStub = makeAddAcount()
    const sut = new SignUpController(emailValidatorStub, addAccountStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provide', async () => {
        const {
            sut
        } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })

    test('Should return 400 if no email is provide', async () => {
        const {
            sut
        } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provide', async () => {
        const {
            sut
        } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 400 if no password confirmation is provide', async () => {
        const {
            sut
        } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })

    test('Should return 400 if an invalid email is provided', async () => {
        const {
            sut,
            emailValidatorStub
        } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
    test('Should call EmailValidator with correct email', async () => {
        const {
            sut,
            emailValidatorStub
        } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
    })

    test('Should return 500 if EmailValidator throws', async () => {
        const emailValidatorStub = makeEmailValidatorWithError()
        const addAccountStub = makeAddAcount()
        const sut = new SignUpController(emailValidatorStub, addAccountStub)
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should return 400 if no password confimation fail', async () => {
        const {
            sut
        } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                passwordConfirmation: 'incorrect_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
    })

    test('Should call AddAcount with correct values', async () => {
        const {
            sut, addAccountStub
        } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password'
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { throw new Error() })
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should return 200 with correct values', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                name: 'valid_name',
                email: 'valid_email@mail.com',
                password: 'valid_password',
                passwordConfirmation: 'valid_password'
            }
        }
        const httResponse = await sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(200)
    })

})