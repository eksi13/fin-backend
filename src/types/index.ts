export enum TransactionType {
    Ausgabe = 'Ausgabe',
    Einnahme = 'Einnahme',
    TransferPlus = 'TransferPlus',
    TransferMinus = 'TransferMinus'
}

export enum AccountType {
    Girokonto = 'Girokonto',
    Tagesgeld = 'Tagesgeld',
    Bargeld = 'Bargeld',
    Depot = 'Depot'
}

export enum Currency {
    EUR = 'EUR', 
    USD = 'USD'
}

// TODO create categories for ex. for transfers -> 999, ...