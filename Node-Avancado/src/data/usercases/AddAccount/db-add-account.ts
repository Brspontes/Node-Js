import { AddAccountRepository } from './../../protocols/add-account-repository';
import { Encrypter } from '../../protocols/encrypter'
import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usercases/add-account'

export class DbAddAccount implements AddAccount{
    private readonly encrypter: Encrypter
    private readonly addAccountRepository: AddAccountRepository

    constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) { 
        this.encrypter = encrypter 
        this.addAccountRepository = addAccountRepository
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashed = await this.encrypter.encrypt(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashed }))
        return new Promise(resolve => resolve(account))
    }
}