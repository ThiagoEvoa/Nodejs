function validateCnpj(cnpj) {

    while (cnpj.includes('.'))
        cnpj = cnpj.replace('.', '');

    cnpj = cnpj.replace('-', '');
    cnpj = cnpj.replace('/', '');

    var numbers, digits, sum, result, pos, cnpjSize, equalDigits;
    equalDigits = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
        return false;
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            equalDigits = 0;
            break;
        }
    if (!equalDigits) {
        cnpjSize = cnpj.length - 2
        numbers = cnpj.substring(0, cnpjSize);
        digits = cnpj.substring(cnpjSize);
        sum = 0;
        pos = cnpjSize - 7;
        for (i = cnpjSize; i >= 1; i--) {
            sum += numbers.charAt(cnpjSize - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(0))
            return false;
        cnpjSize = cnpjSize + 1;
        numbers = cnpj.substring(0, cnpjSize);
        sum = 0;
        pos = cnpjSize - 7;
        for (i = cnpjSize; i >= 1; i--) {
            sum += numbers.charAt(cnpjSize - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

module.exports = { validateCnpj };